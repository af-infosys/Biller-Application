import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import generatePDF from "react-to-pdf";
import "./Bill.css";
import apiPath from "../isProduction";
import RenderBill from "./RenderBill";

// --- The Main React Component ---
const GeneralBill = () => {
  const [recordData, setRecordData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);

  // Refs for PDF generation and QR Code container
  const pdfContentRef = useRef(null);

  // --- Data Fetching Logic (useEffect) ---
  const { id, sheetId } = useParams();
  const [workSpot, setWorkSpot] = useState({});

  const fetchDataFromSheetMain = async () => {
    try {
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
      window.alert("Error Tracking Your Bill!");
    }
  };

  const fetchBillWorkDetails = async () => {
    try {
      const response = await fetch(
        `${await apiPath()}/api/work/bill-details/${sheetId}`
      );

      const data = await response.json();

      setWorkSpot(data?.work);
    } catch (err) {
      window.alert("Error Tracking Bill Details!");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDataFromSheetMain();
    fetchBillWorkDetails();
  }, []);

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

  return (
    <div>
      <div className="action-buttons">
        <button id="download-btn" type="button" onClick={downloadPDF}>
          📄 Download Bill PDF
        </button>
      </div>

      <div
        id="pdf-content"
        className="pdf-container"
        ref={pdfContentRef}
        style={{ width: "700px" }}
      >
        <RenderBill workSpot={workSpot} recordData={recordData} />
      </div>
    </div>
  );
};

export default GeneralBill;
