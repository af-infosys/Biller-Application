import React, { useEffect, useState } from "react";
import apiPath from "../isProduction";
import { useAuth } from "../config/AuthContext";

const WorkDetail = async () => {
  const [workSpot, setWorkSpot] = useState({});

  const { user } = useAuth();

  try {
    fetch(`${await apiPath()}/api/work/bill/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Assigned Work", data);
        setWorkSpot(data?.work);
      });
  } catch (err) {
    window.alert("Error Tracking Assigned Work!");
    console.log(err);
  }

  if (!workSpot) {
    return {
      notassigned: true,
    };
  }

  return {
    gaam: workSpot?.gaam || "",
    taluko: workSpot?.taluko || "",
    district: workSpot?.district || "",
  };
};

export default WorkDetail;
