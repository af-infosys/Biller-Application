(function () {
  window.BindDataTable = () => {
    var nMilkatNos = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtnMilkatNo"
    );
    var cOwnerName = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtcOwnerName"
    );
    var cKabjedar = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtcKabjedar"
    );
    var cSocietyName = document.getElementById(
      "ctl00_ContentPlaceHolder1_DDLSociety"
    );
    var cHouseNo = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtHouseNo"
    );
    var nOldMilkatNos = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtOldMilkatnos"
    );
    var nPageNo = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtnPageNo"
    );
    var txtnMilkatNoTo = document.getElementById(
      "ctl00_ContentPlaceHolder1_txtnMilkatNoTo"
    );

    $("input.tableflat").iCheck({
      checkboxClass: "icheckbox_flat-green",
      radioClass: "iradio_flat-green",
    });

    var asInitVals = new Array();
    var oTable = $("#datatable").DataTable({
      //"info": false,
      //"bPaginate": false,
      bSort: false,
      bFilter: false,
      bRetrive: true,
      bAutoWidth: true,
      bDestroy: true,
      columns: [
        { data: "cmilkatnos" },
        { data: "chouseownersname" },
        { data: "chousekabjedarname" },
        { data: "chousekeepersname" },
        { data: "SocietyName" },
        { data: "chouseno" },
        { data: "cBlockNo" },
        { data: "nhousevalue" },
        { data: "cDescription" },
        { data: "SurveyNo" },
        { data: "editP" },
        { data: "deleteP" },
      ],
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        }, //disables sorting for column one
      ],
      bServerSide: true,
      sAjaxSource: "MilkatMaster.asmx/ListMasterMilkatPV",
      fnServerParams: function myfunction(aoData) {
        console.log("!!!aoData: ", aoData);

        aoData.push({ name: "iSortCol_0", value: "0" });
        aoData.push({ name: "sSortDir_0", value: "asc" });
        aoData.push({ name: "sSearch1", value: nMilkatNos.value });
        aoData.push({ name: "sSearch2", value: cOwnerName.value });
        aoData.push({ name: "sSearch3", value: cKabjedar.value });
        aoData.push({ name: "sSearch4", value: cSocietyName.value });
        aoData.push({ name: "sSearch5", value: cHouseNo.value });
        aoData.push({ name: "sSearch6", value: nOldMilkatNos.value });
        aoData.push({ name: "sSearch7", value: nPageNo.value });
        aoData.push({ name: "sSearch8", value: txtnMilkatNoTo.value });
      },
      sServerMethod: "post",
      //"sDom": '<"top"fp<"clear">>rt<"bottom"i<"clear">>',
      sPaginationType: "full_numbers",
      iDisplayLength: 100000,
    });

    window.__MILKAT_BUFFER__ = [];
    window.__MILKAT_DONE__ = false;

    oTable.on("xhr.dt", async function (e, settings, json, xhr) {
      try {
        const rows =
          json?.aaData?.sort(
            (a, b) => Number(a.cMilkatNos) - Number(b.cMilkatNos)
          ) || [];

        console.log("Captured DataTable Response:", rows);

        if (rows.length > 0) {
          for (let index = 0; index < rows.length; index++) {
            const property = rows[index];

            // Extract ID from HTML
            const match = property?.editP?.match(/ID=([^&"]+)/);
            const id = match ? match[1] : null;

            if (!id) {
              console.log("No ID found at row", index);
              continue;
            }

            console.log("Extracted ID:", id);

            // Fetch Milkat Details
            const res = await fetch("MilkatMaster.asmx/SearchMilkatMaster", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({ NID: id }),
            });

            if (!res.ok) {
              console.error(
                "MilkatMaster fetch failed at index:",
                data.d?.cMilkatNos
              );
              continue;
            }

            const data = await res.json();

            if (data?.d) {
              console.log("Property ", data.d?.cMilkatNos, "ka data:", data.d);
              window.__MILKAT_BUFFER__.push(data.d);
            }

            if (rows.length - 1 === index) {
              window.__MILKAT_DONE__ = true;
            }

            // const storeRes = await fetch(`${server_url}/store-data`, {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ record: data.d }),
            // });
            // if (storeRes.status === 500) {
            //   console.error("store-data failed:", storeRes);

            //   console.error("Error:", storeRes);
            //   console.log("...Trying Again for ", data.d?.cMilkatNos);

            //   // wait for 30 second before retrying
            //   await new Promise((resolve) => setTimeout(resolve, 15000));

            //   let again = await fetch(`${server_url}/store-data`, {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ record: data.d }),
            //   });

            //   if (again) {
            //     console.log("New Request:", again?.status);

            //     if (again?.status === 500) {
            //       await new Promise((resolve) => setTimeout(resolve, 5000));
            //       let again2 = await fetch(`${server_url}/store-data`, {
            //         method: "POST",
            //         headers: {
            //           "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify({ record: data.d }),
            //       });

            //       if (again2) {
            //         console.log("New Request:", again2?.status);
            //       }
            //     }
            //   }
            // }
            // if (storeRes.status === 200) {
            //   console.log("store-data success:", storeRes);
            // } else {
            //   console.log("store-data failed: Another Error :", storeRes);
            // }
          }

          console.log("Custom!! All Data forwarded successfully.");
        }
      } catch (err) {
        console.log("Custom!! Failed to forward data:", err);
      }
    });

    // This function runs inside the browser and collects all rows
    // window.collectMilkatData = function () {
    //   try {
    //     const table = document.querySelector("#ContentPlaceHolder1_gvMilkatPV");
    //     if (!table) return [];

    //     const rows = Array.from(table.querySelectorAll("tr"));
    //     const headers = Array.from(rows.shift().querySelectorAll("th")).map(
    //       (h) => h.innerText.trim()
    //     );

    //     const finalData = rows.map((row) => {
    //       const cells = Array.from(row.querySelectorAll("td"));
    //       const obj = {};
    //       cells.forEach((cell, i) => {
    //         obj[headers[i] || `col_${i}`] = cell.innerText.trim();
    //       });
    //       return obj;
    //     });

    //     console.log("Collected rows:", finalData.length);
    //     return finalData;
    //   } catch (e) {
    //     console.log("Error during data collection:", e);
    //     return [];
    //   }
    // };

    if (
      document.getElementById("ctl00_ContentPlaceHolder1_HFEditUserRights")
        .value != "1"
    ) {
      oTable.column(10).visible(false);
    }
    if (
      document.getElementById("ctl00_ContentPlaceHolder1_HFDeleteUserRights")
        .value != "1"
    ) {
      oTable.column(11).visible(false);
    }

    $("tfoot input").keyup(function () {
      /* Filter on the column based on the index of this element's parent <th> */
      oTable.fnFilter(this.value, $("tfoot th").index($(this).parent()));
    });
    $("tfoot input").each(function (i) {
      asInitVals[i] = this.value;
    });
    $("tfoot input").focus(function () {
      if (this.className == "search_init") {
        this.className = "";
        this.value = "";
      }
    });
    $("tfoot input").blur(function (i) {
      if (this.value == "") {
        this.className = "search_init";
        this.value = asInitVals[$("tfoot input").index(this)];
      }
    });

    $("input.Gujarati").each(function () {
      $(this).css("font-family", $.cookie("FontStyle"));
    });
  };
})();
