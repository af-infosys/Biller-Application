const express = require("express");
const puppeteer = require("puppeteer-core");
// const puppeteer = require("puppeteer");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const PORT = 5000;

const executablePath = "/usr/bin/google-chrome";

const apiPath = "https://a-f-infosys-smart-management-plxw.onrender.com";
// const apiPath = "http://localhost:4000";

app.get("/", (req, res) => {
  res.send("Hello World <a href='/fetch-data'>Get Logged In</a>");
});

// ✅ Helper to get option value by its visible text
async function getOptionValueByText(page, selectName, visibleText) {
  const optionValue = await page.evaluate(
    (selectName, visibleText) => {
      const select = document.querySelector(`select[name="${selectName}"]`);
      if (!select) return null;

      const option = Array.from(select.options).find(
        (opt) => opt.textContent.trim() === visibleText
      );
      return option ? option.value : null;
    },
    selectName,
    visibleText
  );

  console.log(
    `🎯 Found value for "${visibleText}" in ${selectName}:`,
    optionValue
  );
  return optionValue;
}

// 📌 GET Title API
app.post("/fetch-data", async (req, res) => {
  const { login_id, password } = req.body;

  if (!login_id || !password) {
    return res.status(400).json({ error: "Missing login_id or password" });
  }

  // const login_id = "23994";
  // password = "Paty@2026";

  const workId = login_id;

  console.log(
    "Chromium path:",
    process.env.PRODUCTION == "true"
      ? puppeteer.executablePath()
      : "==== not Chrome Path ===="
  );

  try {
    const browser = await puppeteer.launch({
      executablePath:
        process.env.PRODUCTION == "true"
          ? puppeteer.executablePath()
          : executablePath,
      headless: process.env.PRODUCTION == "true" ? true : false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    console.log("Opening page...");
    await page.goto("https://gramsuvidha.gujarat.gov.in", {
      waitUntil: "domcontentloaded",
    });
    console.log("Opened!");

    // 🧾 Fill Login ID
    await page.type('input[name="txtSiteID"]', login_id);
    await page.evaluate(() => {
      const ddlModule = document.querySelector('input[name="txtSiteID"]');
      if (ddlModule) {
        ddlModule.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
    await new Promise((res) => setTimeout(res, 1500)); // trigger AJAX loading of dropdowns

    // 🕐 Wait until options are loaded
    // ⏳ Wait until both DDLModule and DDLUser dropdowns are populated
    let dropdownsReady = false;

    while (!dropdownsReady) {
      await Promise.all([page.click('select[name="DDLModule"]')]);
      dropdownsReady = await page.evaluate(() => {
        const moduleSelect = document.querySelector('select[name="DDLModule"]');

        const userSelect = document.querySelector('select[name="DDLUser"]');

        return (
          moduleSelect &&
          userSelect &&
          moduleSelect.options.length > 1 &&
          userSelect.options.length > 1
        );
      });

      if (!dropdownsReady) {
        console.log("⏳ Waiting for dropdowns to populate...");
        await new Promise((res) => setTimeout(res, 500));
      }
    }

    if (!dropdownsReady) {
      throw new Error("❌ Dropdowns not loaded even after waiting.");
    }

    const moduleValue = await getOptionValueByText(
      page,
      "DDLModule",
      "પંચાયત વેરો"
    );
    const userValue = await getOptionValueByText(page, "DDLUser", "તલાટી");

    if (!moduleValue || !userValue) {
      throw new Error("❌ Could not find required dropdown values");
    }

    await page.evaluate((value) => {
      const select = document.querySelector('select[name="DDLModule"]');
      // if (select) {
      select.value = value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }, moduleValue);

    // extract the value from  id="txtDistrict"
    const districtValue = await page.$eval("#txtDistrict", (el) => el.value);
    console.log("📌 District:", districtValue);
    const talukaValue = await page.$eval("#txtTaluka", (el) => el.value);
    console.log("📌 Taluka:", talukaValue);
    const villageValue = await page.$eval("#txtPanchayat", (el) => el.value);
    console.log("📌 Village:", villageValue);

    try {
      fetch(`${apiPath}/api/bill-data/update/${login_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          district: districtValue,
          taluka: talukaValue,
          village: villageValue,
        }),
      });
    } catch (err) {
      console.log("❌ Error Updating Info:", err);
    }

    await Promise.all([page.click('select[name="DDLUser"]')]);
    await page.evaluate((userValue) => {
      const select = document.querySelector('select[name="DDLUser"]');
      const option = Array.from(select.options).find(
        (opt) => opt.value === userValue
      );

      if (option) {
        option.selected = true;
        select.value = option.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));

        // 🔁 Trigger postback manually, same as onchange="setTimeout('__doPostBack(...')"
        setTimeout(() => {
          const eventTarget = document.getElementById("__EVENTTARGET");
          const eventArgument = document.getElementById("__EVENTARGUMENT");
          if (eventTarget && eventArgument) {
            eventTarget.value = "DDLUser";
            eventArgument.value = "";

            document.forms["form1"].submit();
          }
        }, 0);
      }
    }, userValue);

    await new Promise((res) => setTimeout(res, 1500));

    let year;
    do {
      try {
        year = await page.$eval("#DDLYear", (el) => el.value);
        console.log("📅 Year:", year);

        await new Promise((res) => setTimeout(res, 1000));
      } catch (err) {}
    } while (!year);

    // 🧾 Fill password
    await page.type('input[name="TxtPassword"]', password);

    // Wait for captcha value (sometimes pre-filled)
    let captchaValue;
    do {
      try {
        captchaValue = await page.$eval('input[name="txtCaptcha"]', (el) =>
          el.value.trim()
        );
        console.log("waiting for captcha...");
      } catch (e) {
        console.log("cannot find captcha value");
      }
      await new Promise((res) => setTimeout(res, 2000));
    } while (!captchaValue);

    // Set captcha confirm
    await page.type(
      'input[name="txtCompare"]',
      captchaValue.replace(/\s+/g, "")
    );

    // Submit form
    await new Promise((res) => setTimeout(res, 2000));

    await page.evaluate(() => {
      window.validate = () => true;
    });
    console.log("🚨 validate() function overridden to always return true.");

    await Promise.all([
      page.click('input[name="BtnLogin"]'),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    const currentURL = page.url();

    if (currentURL.includes("DashBoardPV.aspx")) {
      console.log("✅ Login successful. Redirecting...");

      const milkatPageURL =
        "https://gramsuvidha.gujarat.gov.in/PanchayatVero/ListMasterMilkatPV.aspx";

      const page = await browser.newPage();
      console.log("Openning Milkat Master", milkatPageURL);

      await page.goto(milkatPageURL, {
        waitUntil: "domcontentloaded",
      });

      const server_url =
        process.env.PRODUCTION == "true"
          ? "https://automation.com"
          : "http://localhost:5000";

      await page.evaluate(async (url) => {
        localStorage.setItem("server_url", url);
      }, server_url);

      await page.evaluate((workId) => {
        localStorage.setItem("workId", workId);
      }, workId);
      await page.evaluate(() => {
        window.__MILKAT_BUFFER__ = [];
      });
      await page.addScriptTag({ path: "./override/override_bindDataTable.js" });

      // Starting Id
      await page.type(
        'input[name="ctl00$ContentPlaceHolder1$txtnMilkatNo"]',
        "1"
      );
      // Ending ID / Total Milkat
      await page.type(
        'input[name="ctl00$ContentPlaceHolder1$txtnMilkatNoTo"]',
        "100000"
      );
      // Find Button
      await Promise.all([
        page.click('input[name="ctl00$ContentPlaceHolder1$BtnSave"]'),
      ]);

      console.log("⏳ Waiting for all Milkat data to be collected...");

      let isDone = false;

      while (!isDone) {
        try {
          isDone = await page.evaluate(() => {
            return window.__MILKAT_DONE__ === true;
          });

          if (!isDone) {
            await new Promise((res) => setTimeout(res, 1000)); // 1 sec poll
          }
        } catch (err) {
          console.log("Polling error, retrying...");
          await new Promise((res) => setTimeout(res, 1000));
        }
      }

      await new Promise((res) => setTimeout(res, 3000));

      // extract ALL data at once
      const allData = await page.evaluate(() => {
        return window.__MILKAT_BUFFER__;
      });

      console.log("🔥 Total records collected:", allData.length);
      const response = await storeData(allData, workId);

      if (response) {
        if (response?.success) {
          console.log("✅ Data Stored to Google Sheet Successfully!");
        } else {
          console.log("❌ Data Not Stored to Google Sheet Successfully!");
        }
      }

      console.log("✅ ==== Automation Completed ==== ✅");

      return res.json({
        success: true,
        message: "Logged in successfully and Data Extracted!.",
      });
    } else {
      return res.status(400).json({ error: "Login failed." });
    }
  } catch (err) {
    console.log("❌ Automation failed:", err);
    return res.status(500).json({ error: `Internal error. \n ${err}` });
  }
});

const GoogleSheetService = require("./config/CRUD.js");
const sheet = new GoogleSheetService();

app.post("/new-work", async (req, res) => {
  const data = req.body;
  console.log("Received data from new Work:", data);

  try {
    console.log("trying to Insert the Values to the DATABASE");

    const sheetId = process.env.WORK_SHEET_ID;

    await sheet.createNewTab(sheetId, data.id);

    const response = await sheet.insert(sheetId, "GramSuvidha", [
      data.id,
      data.password,
      data.gaam || "",
      data.taluko || "",
      data.district || "",
    ]);

    if (response?.status === 200) {
      console.log("New Gaam Added Successfully", data.gaam);
      return res.status(200).json({
        ok: true,
        success: true,
        newSheetID: data.id,
        message: "New Gaam Added Successfully.",
      });
    } else {
      console.log("Error Inserting Properties:", response);
      return res.status(500).json({
        success: false,
        message: "Error Inserting Properties. Google Sheets ka Error",
      });
    }
  } catch (error) {
    console.log("Error Adding new Gaam:", error);
    return res.status(500).json({
      success: false,
      message: "Error Adding new Gaam",
    });
  }
});

async function storeData(records, id) {
  if (!Array.isArray(records) || records.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No records received",
    });
  }

  const sheetId = process.env.WORK_SHEET_ID;

  try {
    const rows = records.map((record) => {
      // 🏷 category
      let category = "";
      switch (record?.NTypeOfBuilding) {
        case "18":
          category = "બિન રહેઠાણ";
          break;
        case "23":
          category = "કોમન પ્લોટ";
          break;
        case "22":
          category = "પ્લોટ";
          break;
        case "17":
          category = "રહેઠાણ";
          break;
        case "20056":
          category = "સરકારી મિલ્કત";
          break;
      }

      // 🚰 pipeline
      let pipeLine = "";
      switch (record?.nPipeLineID) {
        case "52":
          pipeLine = "૧ લાઇન";
          break;
        case "51":
          pipeLine = "૧/૨ લાઇન";
          break;
        case "53":
          pipeLine = "૩/૪ લાઇન";
          break;
        case "50":
          pipeLine = "નથી";
          break;
      }

      return [
        record?.cMilkatNos || "",
        record?.CHouseOwnersName || "",
        record?.cHouseKabjedarName || "",
        record?.CHouseNo || "",
        record?.cSocietyName || "",
        record?.cMobileNo || "",
        category,
        record?.CDescription || "",
        record?.NHouseValue || "",
        record?.nBillNo || "",
        record?.TaxAmounts ? JSON.stringify(record.TaxAmounts.split("¶")) : "",
        pipeLine,
      ];
    });

    console.log("📦 Total rows prepared:", rows.length);

    const response = await sheet.insertBulk(sheetId, id, rows);

    return {
      success: true,
      inserted: rows.length,
    };
  } catch (err) {
    console.error("❌ Bulk insert failed:", err);
    return {
      success: false,
      message: "Bulk insert failed",
    };
  }
}

app.post("/store-data", async (req, res) => {
  console.log("End Point '/store-data' is Called!");

  const data = req.body;
  console.log("Received data from client:", data?.record);

  // const sheetId = "1lJ6pxYikIq5sG4OQwuzIodO4uVt-xo9XeK4iD2Ibj8o";
  const sheetId = process.env.WORK_SHEET_ID;

  let category = "";
  switch (data?.record?.NTypeOfBuilding || 0) {
    case "0":
      category = "";
      break;

    case "18":
      category = "બિન રહેઠાણ";
      break;

    case "23":
      category = "કોમન પ્લોટ";
      break;

    case "22":
      category = "પ્લોટ";
      break;

    case "17":
      category = "રહેઠાણ";
      break;

    case "20056":
      category = "સરકારી મિલ્કત";
      break;

    default:
      category = "";
      break;
  }

  let pipeLine = "";
  switch (data?.record?.nPipeLineID || 0) {
    case "0":
      pipeLine = "";
      break;

    case "52":
      pipeLine = "૧ લાઇન";
      break;

    case "51":
      pipeLine = "૧/૨ લાઇન";
      break;

    case "53":
      pipeLine = "૩/૪ લાઇન";
      break;

    case "50":
      pipeLine = "નથી";
      break;

    default:
      pipeLine = "";
      break;
  }

  try {
    console.log("trying to Insert the Values to the DATABASE");

    const response = await sheet.insert(sheetId, "23994", [
      data?.record?.cMilkatNos || "",
      data?.record?.CHouseOwnersName || "",
      data?.record?.cHouseKabjedarName || "",
      data?.record?.CHouseNo || "",
      data?.record?.cSocietyName || "",
      data?.record?.cMobileNo || "",
      category,
      data?.record?.CDescription || "",
      data?.record?.NHouseValue || "",

      data?.record?.nBillNo || "",

      JSON.stringify(data?.record?.TaxAmounts.split("¶")) || [],
      pipeLine,
    ]);

    if (response?.status === 200) {
      console.log("Data Inserted Successfully", data?.record?.cMilkatNos);
      return res
        .status(200)
        .json({ success: true, message: "Data stored successfully." });
    } else {
      console.log("Error Inserting Properties:", response);
      return res.status(500).json({
        success: false,
        message: "Error Inserting Properties. Google Sheets ka Error",
      });
    }
  } catch (error) {
    console.log("Error Inserting Properties:", error);
    return res.status(500).json({
      success: false,
      message: "Error Inserting Properties. Paremeteers ka Error",
    });
  }
});

const response_data = {
  __type: "MilkatMaster+MilkatMasterClass",
  cType: false,
  cMsg: null,
  Msg: null,
  Query: null,
  NID: "5E230466-C4F6-4259-B54B-F67DCE04C10B",
  cMilkatNos: "3.0",
  CHouseOwnersName: "ગોબરભાઈ ઘુસાભાઈ નાકરાણી",
  CHouseKeepersName: "2019-20",
  cHouseKabjedarName: "",
  NSocietyId: "13BBB413-F187-4914-8DD8-CA5EBEC4E94A",
  cWardName: "",
  CHouseNo: "3",
  nLoan: "0",
  NTypeOfBuilding: "17",
  NHouseValue: "10000",
  nHouseArea: "0",
  nPipeLineID: "52",
  CDescription: "પાકા સ્‍લેબવાળા રૂમ-1, રસોડુ, બાથરૂમ, ઢોરનું ઢાળીયુ",
  TaxAmounts:
    "50.00¶0.00¶0.00¶0.00¶400.00¶0.00¶10.00¶0.00¶50.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶0.00¶",
  cNarration: "",
  SocietyName: null,
  nBillNo: "4",
  nBillDate: null,
  TaxIndex: null,
  nMilkatID: null,
  nReceiptID: null,
  nTaxID: null,
  nPaidRs: null,
  nNetTaxPaid: null,
  nBalancePaid: null,
  cBojoRemarks: "",
  dTharavDate: "",
  cTharavNo: "",
  cBlockNo: "",
  cPancardNo: "",
  cAadharcardNo: "pvbodlB08cE=",
  cRationcardNo: "",
  cMobileNo: "",
  cCount: null,
  cSocietyName: "રામ શેરી",
  cSurveyType: "0",
  cSurveyNo: "",
  nSurveyNo: "",
  cCitySurveyNo: "",
  cCityOffice: "0",
  cCityWard: "null",
  cCitySheetNo: "",
  cSurveyPanchayat: "F6122DF4-2F4B-412E-B2E9-E8E0B085B1F5",
};

// app.get("/data/:sheetId", async (req, res) => {
//   try {
//     const { sheetId } = req.params;
//     const dataId = process.env.WORK_SHEET_ID;

//     const data = await sheet.read(dataId, sheetId);

//     // Record to Object key
//     const propertyDetails = data
//       .filter((item) => item.length > 0)
//       .map((arr) => {
//         return {
//           m_id: arr[0],
//           owner_name: arr[1],
//           house_id: arr[2],
//           year: arr[3],
//           society: arr[4],
//           phone: "",
//           category: arr[5],
//           description: arr[6],
//           price: Number(arr[7]),
//           taxes: JSON.parse(arr[8]),
//           tab_connection: arr[9],
//           marked: arr[10],
//         };
//       });

//     return res.json({ success: true, data: propertyDetails });
//   } catch (err) {
//     console.log("Error Reading Data:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Error Reading Data",
//     });
//   }
// });

// app.get("/data/:sheetId/:id", async (req, res) => {
//   try {
//     const { sheetId, id: mId } = req.params;
//     const dataId = process.env.WORK_SHEET_ID;

//     const data = await sheet.read(dataId, sheetId);
//     const record = data.find((record) => Number(record[0]) === Number(mId));

//     const propertyDetail = {
//       m_id: record[0],
//       owner_name: record[1],
//       house_id: record[2],
//       year: record[3],
//       society: record[4],
//       phone: "",
//       category: record[5],
//       description: record[6],
//       price: Number(record[7]),
//       taxes: JSON.parse(record[8]),
//       tab_connection: record[9],
//       marked: record[10],
//     };

//     return res.status(200).json({ success: true, record: propertyDetail });
//   } catch (err) {
//     console.log("Error Reading Record:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Error Reading Record",
//     });
//   }
// });

// app.put("/data/:sheetId/:id", async (req, res) => {
//   try {
//     const { sheetId, id: mId } = req.params;

//     console.log("hello");
//     const dataId = process.env.WORK_SHEET_ID;

//     let updatedIndex = -1;

//     const data = await sheet.read(dataId, sheetId);

//     const record = data.find((record, index) => {
//       if (Number(record[0]) === Number(mId)) {
//         updatedIndex = index + 1;
//         return true;
//       }
//       return false;
//     });

//     if (!record || updatedIndex === -1) {
//       return res.status(404).json({ message: "Record not found" });
//     }

//     record[10] = true;

//     // ✅ real sheet row number
//     const sheetRowIndex = updatedIndex;

//     await sheet.update(dataId, sheetId, sheetRowIndex, record);

//     console.log("Updated Successfully");

//     return res.status(200).json(record);
//   } catch (err) {
//     console.log("Error Updating Record:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Error Updating Record",
//     });
//   }
// });

// app.get("/data/:sheetId/:mId", async (req, res) => {
//   const { sheetId, mId } = req.params;
//   const dataId = process.env.WORK_SHEET_ID;

//   const data = await sheet.read(dataId, sheetId);
//   console.log("Data Read Successfully", data);

//   data.forEach((row) => {
//     if (Number(row[0]) == Number(mId)) {
//       console.log("Matched Record with ID:", mId, ":", row);
//       return res.json(row);
//     }
//   });
// });

// 📌 GET Title API
// app.get("/get-receipt", async (req, res) => {
//   try {
//     const browser = await puppeteer.launch({
//       executablePath:
//         process.env.PRODUCTION == "true"
//           ? puppeteer.executablePath()
//           : executablePath,
//       headless: process.env.PRODUCTION == "true" ? true : false,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });

//     const recieptPageURL =
//       "https://gramsuvidha.gujarat.gov.in/PanchayatVero/TranTaxReceiptPV.aspx";

//     const page = await browser.newPage();
//     console.log("Openning URL", recieptPageURL);

//     await page.goto(recieptPageURL, {
//       waitUntil: "domcontentloaded",
//     });

//     const milkat_id = "1.0";

//     await page.evaluate(() => {
//       window.SearchMilkatMaster(milkat_id);
//     });
//     console.log("🚨 Searched for :", milkat_id);

//     await Promise.all([page.click("input#btnSearch1")]);

//     await new Promise((res) => setTimeout(res, 1000));

//     // Search for Milkat by ID
//     await page.type(
//       'input[name="ctl00$ContentPlaceHolder1$txtSearch"]',
//       milkat_id
//     );
//   } catch (err) {
//     console.log("❌ Automation failed:", err);
//     return res.status(500).json({ error: `Internal error. \n ${err}` });
//   }
// });

app.listen(PORT, () => {
  console.log(
    `🚀 Server running at ${process.env.PRODUCTION} ${
      process.env.PRODUCTION == "true"
        ? "https://web-automation-oqmy.onrender.com"
        : `http://localhost:${PORT}`
    }`
  );
});

// 		<option selected="selected" value="220E8302-1B69-4D00-8A4F-BEF8224D305D">તલાટી</option>
