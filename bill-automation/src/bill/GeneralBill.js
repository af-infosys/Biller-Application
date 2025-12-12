import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import generatePDF from "react-to-pdf";
import "./Bill.css";
import numberToGujaratiWords from "../bill/NumberToGujarati";
import apiPath from "../isProduction";

// --- Configuration ---
const PAYEE_UPI_ID = "kiritporiya25-2@oksbi";
const PAYEE_NAME = "Meghraj Gram Panchayat";
const STATIC_DATA = {
  village: "MEGHARAJ",
  taluka: "MEGHARAJ",
  district: "ARAVALLI",
};

const safeNumber = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
};

// --- The Main React Component ---
const GeneralBill = () => {
  const [recordData, setRecordData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);

  // Refs for PDF generation and QR Code container
  const pdfContentRef = useRef(null);
  const qrCodeRef = useRef(null);

  const taxFields = [
    { id: "houseTax", name: "ઘરવેરો" },
    { id: "saPaTax", name: "સા.પાણી વેરો" },
    { id: "specialWaterTax", name: "ખા.પાણી વેરો" },
    { id: "cleaningTax", name: "સફાઈ વેરો" },
    { id: "sewerTax", name: "ગટર વેરો" },
    { id: "lightTax", name: "લાઈટવેરો" },
    { id: "advance", name: "એડવાન્સ" },
    { id: "noticeFee", name: "નોટીસ" },
    { id: "otherTax", name: "અન્ય" },
    { id: "otherTax2", name: "અન્ય૨" },
    { id: "otherTax3", name: "અન્ય૩" },
    { id: "otherTax4", name: "અન્ય૪" },
    { id: "otherTax5", name: "અન્ય૫" },
  ];

  // --- Data Fetching Logic (useEffect) ---
  const { id, sheetId } = useParams();
  const [workSpot, setWorkSpot] = useState({});

  const fetchDataFromSheetMain = async () => {
    try {
      //   if (!user?.id) return;

      //   const response = await fetch(
      //     `${await apiPath()}/api/work/bill/${user.id}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     }
      //   );

      //   const data2 = await response.json();

      //   setWorkSpot(data2?.work);

      //   const sheetId = data2?.work?.id;

      //   if (!sheetId) {
      //     return;
      //   }

      if (!id || !sheetId) {
        window.alert("Error Tracking Your Bill!");
        return;
      }

      const result = await fetch(
        `${await apiPath()}/api/bill-data/${sheetId}/${id}`
      );

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();

      setRecordData(data?.record);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromSheetMain();
  }, []);

  const calculateTotalDue = (taxesArray) => {
    if (!Array.isArray(taxesArray)) return 0;
    let totalDue = taxesArray.reduce((sum, val) => sum + safeNumber(val), 0);
    return totalDue;
  };

  const downloadPDF = async () => {
    if (!pdfContentRef.current) {
      alert("PDF container not found.");
      return;
    }

    const options = {
      filename: `Receipt_${recordData?.m_id}.pdf`,
      page: {
        margin: 3,
        format: [195, 450],
        orientation: "portrait",
      },
      canvas: {
        scale: 8,
        useCORS: true,
      },
    };

    await generatePDF(pdfContentRef, options);
  };

  // --- Conditional Rendering for Loading/Error ---
  if (loadingError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "red" }}>Error Loading Receipt</h1>
        <p>{loadingError}</p>
        <p>Please check the URL for a valid `id`.</p>
        <Link
          to="/"
          className="back-button"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          ⬅️ Go Back
        </Link>
      </div>
    );
  }

  if (!recordData) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Loading Bill Data...</h1>
      </div>
    );
  }

  const taxes = recordData?.taxes;

  const totalDue = calculateTotalDue(recordData?.taxes);

  return (
    <div>
      <div className="action-buttons">
        <button id="download-btn" type="button" onClick={downloadPDF}>
          📄 Download Bill PDF
        </button>
      </div>

      <div id="pdf-content" className="pdf-container" ref={pdfContentRef}>
        <table>
          <tr style={{ position: "relative" }}>
            <th colspan="6" className="bold">
              <span className="bold village-name">{STATIC_DATA.village}</span>{" "}
              ગ્રામપંચાયત <br />
              <p style={{ fontSize: "1.5rem" }}>
                મુ.<span className="bold">{STATIC_DATA.village}</span> તા.
                <span className="bold">{STATIC_DATA.taluka}</span> જિ.
                <span className="bold">{STATIC_DATA.district}</span>
              </p>
              <h2>મંગણાં નું બીલ</h2>
              <p style={{ fontSize: "1.5rem" }}>
                (ગ્રામ પંચાયત એક્ટની કલમ ૨૧૫(૧) મુજબ) <br /> આ બિલની રકમ ૧૫ દિવસ
                માં અચૂક જમા કરાવવી
              </p>
              <h3
                style={{
                  position: "absolute",
                  top: ".3rem",
                  right: ".3rem",
                  fontSize: "1.3rem",
                }}
              >
                *ગ્રાહક કોપી*
              </h3>
            </th>
          </tr>

          <tr>
            <td className="left" colspan="6">
              <span>શ્રીમાન /શ્રીમતી :</span>
              <span className="bold">{recordData?.owner_name}</span>
            </td>
          </tr>
          <tr>
            <td className="left" colspan="6">
              <span>કબ્જેદાર :</span>
              <span className="bold">{recordData?.other_name}</span>
            </td>
          </tr>
          <tr>
            <td className="left" colspan="6">
              <span>સરનામું :</span>
              <span className="bold">{recordData?.society}</span>
            </td>
          </tr>

          <tr>
            <th className="bold weak center">મિલકત નંબર</th>
            <th className="bold weak center">જૂનો મિલકત નં.</th>
            <th className="bold weak center">બિલ નંબર</th>
            <th className="bold weak center">બિલની તારીખ</th>
            <th className="bold weak center">છેલ્લી તારીખ</th>
            <th className="bold weak center">મુદત વર્ષ </th>
          </tr>
          <tr>
            <td className="center" style={{ whiteSpace: "nowrap" }}>
              {recordData?.m_id || ""}
            </td>
            <td className="center" style={{ whiteSpace: "nowrap" }}>
              {recordData?.old_id || ""}
            </td>
            <td className="center" style={{ whiteSpace: "nowrap" }}>
              {recordData?.bill_no || ""}
            </td>
            <td className="center" style={{ whiteSpace: "nowrap" }}>
              {recordData?.bill_date || ""}
            </td>
            <td className="center" style={{ whiteSpace: "nowrap" }}>
              {recordData?.due_date || ""}
            </td>
            <td className="center" style={{ whiteSpace: "nowrap" }}>
              {recordData?.year || ""}
            </td>
          </tr>
        </table>

        <table>
          <tr className="background">
            <th
              rowspan="2"
              className="background"
              style={{ fontSize: "1.4rem" }}
            >
              વેરા કે બીજી લેણી રકમ ની વિગત
            </th>
            <th colspan="4" style={{ fontSize: "1.4rem" }}>
              વેરાની સંપૂર્ણ વિગત નીચે પ્રમાણે છે.
            </th>
            <th rowSpan="2" style={{ fontSize: "1.4rem" }}>
              મંગણાંની રકમ ભરવામાં કસર કરતાં હોય તે વિગત
            </th>
          </tr>

          <tr>
            <th className="background" style={{ fontSize: "1.4rem" }}>
              વેરાનો દર
            </th>
            <th className="background" style={{ fontSize: "1.4rem" }}>
              ચા.બાકી
            </th>
            <th className="background" style={{ fontSize: "1.4rem" }}>
              પા.બાકી
            </th>
            <th className="background" style={{ fontSize: "1.4rem" }}>
              કુલ
            </th>
          </tr>

          {taxFields.map((field, index) => {
            const startIndex = index * 2;
            const left = Number(taxes[startIndex] || 0);
            const right = Number(taxes[startIndex + 1] || 0);

            return (
              <tr key={field.id} className="right">
                <td>{field.name}</td>
                <td></td>
                <td>{left.toFixed(2)}</td>
                <td>{right.toFixed(2)}</td>
                <td>{(left + right).toFixed(2)}</td>
                <td></td>
              </tr>
            );
          })}

          <tr className="background">
            <th className="bold">કુલ</th>
            <td></td>
            <th className="bold right">
              {Number(taxes[0]) +
                Number(taxes[2]) +
                Number(taxes[4]) +
                Number(taxes[6]) +
                Number(taxes[8]) +
                Number(taxes[10]) +
                Number(taxes[12]) +
                Number(taxes[14]) +
                Number(taxes[16]) +
                Number(taxes[18]) +
                Number(taxes[20]) +
                Number(taxes[22]) +
                Number(taxes[24])}
            </th>
            <th className="bold right">
              {Number(taxes[1]) +
                Number(taxes[3]) +
                Number(taxes[5]) +
                Number(taxes[7]) +
                Number(taxes[9]) +
                Number(taxes[11]) +
                Number(taxes[13]) +
                Number(taxes[15]) +
                Number(taxes[17]) +
                Number(taxes[19]) +
                Number(taxes[21]) +
                Number(taxes[23]) +
                Number(taxes[25])}
            </th>
            <th className="bold right">{totalDue}</th>
            <td></td>
          </tr>

          <tr>
            <td colspan="6">
              કુલ રૂપિયા શબ્દોમાં :{" "}
              <span className="bold">{numberToGujaratiWords(totalDue)}</span>
            </td>
          </tr>
        </table>

        <div
          style={{
            border: "2px solid black",
            padding: "10px",
            fontFamily: "'Noto Sans Gujarati', 'Shruti', sans-serif",
            fontSize: "18px",
            lineHeight: 1.8,
          }}
        >
          ઉપરની જણાવેલ રકમ તમારી પાસે પંચાયતની લેણી નીકળે છે અને તેથી તમને જાણ
          કરવાની કે જે લેણી રકમ નીકળે છે તે રકમ બિલ મળેથી દિવસ પંદર ની અંદર
          પંચાયતની ઓફિસે આવી ભરી જવી.
          <br />
          જો ઉપર જણાવેલ રકમ પંચાયતને જણાવેલ મુદતમાં ભરપાઈ કરશો નહિ તો વસુલાતની
          માંગણી માટેની નોટિસ પંચાયતના એક્ટ ૧૯૯૩ ની કલમ ૨૧૫(૧) મુજબ તમારી ઉપર
          બજાવવામાં આવશે અને જે ઉપરથી તમે પંચાયતને ઉપરની રકમ ભરી ન જવા બદલ
          જવાબદાર ગણાશે તે જાણશો.
          <br />
        </div>

        <table>
          <tr>
            <td>
              <p style={{ whiteSpace: "nowrap", fontSize: "1.55rem" }}>
                સ્થળ :
                <span className="bold village-name">{STATIC_DATA.village}</span>{" "}
                ગ્રામપંચાયત
              </p>

              <hr />
              <p style={{ fontSize: "1rem", margin: "5px" }}>
                by- A.F. Infosys - 93764 43146
              </p>
            </td>

            <td style={{ fontSize: "1.6rem" }}>
              સરપંચ
              <br />
              <p style={{ whiteSpace: "nowrap" }}>
                <span className="bold village-name">{STATIC_DATA.village}</span>{" "}
                ગ્રામપંચાયત
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default GeneralBill;
