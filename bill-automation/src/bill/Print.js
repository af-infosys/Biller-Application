import React, { useEffect, useState } from "react";
import RenderBill from "./RenderBill";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../config/AuthContext";
import apiPath from "../isProduction";

import "./Bill.scss";

const Print = () => {
  const [recordData, setRecordData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);

  const { id } = useParams();

  const { user } = useAuth();
  const [workSpot, setWorkSpot] = useState({});

  const fetchDataFromSheetMain = async () => {
    try {
      if (!user?.id) return;

      const response = await fetch(
        `${await apiPath()}/api/work/bill/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data2 = await response.json();

      setWorkSpot(data2?.work);

      const sheetId = data2?.work?.id;

      if (!sheetId) {
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
      updateMark();
    } catch (error) {
      console.error("Error fetching data:", error);
      window.alert("Error Tracking Your Bill!");
    }
  };

  const updateMark = async () => {
    try {
      const sheetId = workSpot?.id;

      if (!sheetId) {
        return;
      }

      const result = await fetch(
        `${await apiPath()}/api/bill-data/${sheetId}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromSheetMain();
  }, []);

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
    <div
      id="pdf-content"
      className="pdf-container"
      style={{ width: "700px", padding: 0 }}
    >
      <RenderBill workSpot={workSpot} recordData={recordData} />
    </div>
  );
};

export default Print;
