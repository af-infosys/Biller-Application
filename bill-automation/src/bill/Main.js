import React, { useState, useEffect, useCallback } from "react";
import "./Main.css";
// import NewWorkPopup from "./Popup"; // Hiding as it seems unused in the final return
import BASE_URL from "../config";
import apiPath from "../isProduction";
import { useAuth } from "../config/AuthContext";

// Helper function to safely parse a value as a number (Kept as is)
const safeNumber = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
};

// Calculates the total due amount from the record's 'taxes' array (columns 19 to 30)
// Assuming 'taxes' is the array of amounts that need to be summed.
const calculateTotalDue = (taxesArray) => {
  if (!Array.isArray(taxesArray)) return 0;
  let totalDue = taxesArray.reduce((sum, val) => sum + safeNumber(val), 0);
  return totalDue;
};

const Main = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [societyNames, setSocietyNames] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State for search inputs
  // CONSOLIDATED SEARCH STATE
  const [generalSearch, setGeneralSearch] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");

  // State for responsive rendering
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const [workSpot, setWorkSpot] = useState({});
  const { user, logout } = useAuth();

  // --- Initial Data Fetching (Work Assignment) ---
  useEffect(() => {
    async function fetchWork() {
      if (!user?.id) return; // Wait for user to be available

      try {
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

        const data = await response.json();

        setWorkSpot(data?.work);
        // Once workSpot is set, fetchDataFromSheet will be called by its useEffect
      } catch (err) {
        window.alert("Error Tracking Assigned Work!");
        console.error(err);
      }
    }

    fetchWork();
  }, [user?.id]); // Dependency on user.id

  // --- Sheet Data Fetching ---
  const fetchDataFromSheet = useCallback(async (sheetId) => {
    setIsLoading(true);
    try {
      if (!sheetId) {
        setIsLoading(false);
        return;
      }

      const result = await fetch(`${await apiPath()}/api/bill-data/${sheetId}`);

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();
      const records = data?.data || [];

      // 1. Set all records
      setAllRecords(records);

      // 2. Extract and set society names (Skip header row, assuming header is the first element)
      const names = new Set();
      // Assuming 'society' property is correct for the society name
      records.forEach((item) => {
        if (item?.society) {
          names.add(item.society);
        }
      });
      setSocietyNames(Array.from(names).sort());

      // 3. Set filtered records to all records initially
      setFilteredRecords(records);
    } catch (error) {
      console.error("Error fetching data:", error);
      window.alert(
        "ડેટા લોડ કરવામાં ક્ષમતા નિષ્ફળ ગઈ. કૃપા કરીને ફરી પ્રયાસ કરો."
      );
      setAllRecords([]);
      setFilteredRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to call fetchDataFromSheet when workSpot changes
  useEffect(() => {
    if (workSpot?.id) {
      fetchDataFromSheet(workSpot.id);
    }
  }, [workSpot?.id, fetchDataFromSheet]);

  // --- Filtering Logic ---
  const handleSecureSearch = useCallback(() => {
    const searchInput = generalSearch.trim().toLowerCase();
    const societyFilter = selectedSociety.trim().toLowerCase();

    // Show all records if no general search criteria and no society filter
    if (!searchInput && !societyFilter) {
      setFilteredRecords(allRecords);
      return;
    }

    const filtered = allRecords.filter((item) => {
      // Normalize record fields for comparison
      const mId = item?.m_id?.toString() || "";
      const ownerName = item?.owner_name?.toLowerCase() || "";
      const mobile = item?.phone?.toString() || "";
      const society = item?.society?.toLowerCase() || "";

      // 1. Check for General Search Match (ID, Name, or Phone)
      let generalMatch = true;
      if (searchInput) {
        // Match if the search input is found in mId, ownerName, OR mobile number
        const matchesId = mId === searchInput; // Prefer exact ID match
        const matchesPhone = mobile.includes(searchInput); // Use includes for partial phone match

        // Use word-based/partial match for name
        let matchesName = false;
        const searchWords = searchInput.split(/\s+/).filter(Boolean);
        const ownerNameWords = ownerName.split(/\s+/).filter(Boolean);

        // Match if all search words are present in the owner name words
        matchesName = searchWords.every((word) =>
          ownerNameWords.includes(word)
        );

        // Fallback for full name search if word-based fails (for robustness)
        if (!matchesName) {
          matchesName = ownerName.includes(searchInput);
        }

        generalMatch = matchesId || matchesPhone || matchesName;
      }

      // 2. Check for Society Match (If a society is selected)
      const societyMatch = !societyFilter || society === societyFilter;

      return generalMatch && societyMatch;
    });

    setFilteredRecords(filtered);
  }, [allRecords, generalSearch, selectedSociety]);

  // --- Window Resize/Responsiveness Logic (Kept as is) ---
  const handleResize = useCallback(() => {
    const newIsMobileView = window.innerWidth <= 768;
    // Only update state if the view change is significant to trigger a re-render
    if (newIsMobileView !== isMobileView) {
      setIsMobileView(newIsMobileView);
    }
  }, [isMobileView]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // --- Rendering Components ---

  const renderNoResults = () => {
    // Show no results message only after initial load is complete and search returns empty
    if (!isLoading && allRecords.length > 0 && filteredRecords.length === 0) {
      return (
        <div className="results-container" style={{ display: "flex" }}>
          <div className="no-records-found">તમારું રેકોર્ડ મળ્યું નથી.</div>
        </div>
      );
    }
    return null;
  };

  const renderResults = () => {
    if (filteredRecords.length === 0) return null;

    // Filter to only show records where totalDue > 0
    const recordsToDisplay = filteredRecords.filter((item) => {
      const totalDue = calculateTotalDue(item?.taxes || []);
      return totalDue > 0;
    });

    // If after filtering due amount, nothing remains
    if (recordsToDisplay.length === 0) {
      return (
        <div className="results-container" style={{ display: "flex" }}>
          <div className="no-records-found">કોઈ બાકી બિલ મળ્યું નથી.</div>
        </div>
      );
    }

    if (isMobileView) {
      // Card View for Mobile
      return (
        <div className="results-container">
          {recordsToDisplay.map((item) => {
            const totalDue = calculateTotalDue(item?.taxes || []);

            // 1. Construct the message
            const billLink = `${window.location.origin}/g-bill/${workSpot?.id}/${item?.m_id}`; // Adjust based on your actual route structure
            const ownerName = item?.owner_name || "Dear Member";

            // Customize your message here. Using Gujarati as per the table headings.
            const whatsappMessage = `નમસ્કાર ${ownerName}, તમારા મિલકતનું બિલ નીચે આપેલ લિંક પર ઉપલબ્ધ છે.
    કુલ બાકી રકમ: ₹${totalDue.toFixed(2)}
    બિલ જોવા માટે ક્લિક કરો: ${billLink}
    
    આભાર.`;

            // 2. Encode the message for the URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // 3. Construct the WhatsApp URL
            // Use 'wa.me' for a direct link. Replace 'item?.phone' with the actual phone number.
            // Ensure 'item?.phone' includes the country code, but without '+' or '00'.
            const whatsappUrl = `https://wa.me/${item?.phone}?text=${encodedMessage}`;

            return (
              <div
                key={item?.m_id}
                className="result-card"
                style={{
                  background: `${item?.marked ? "lightgreen" : ""}`,
                }}
              >
                <div className="result-card-item">
                  <span className="result-card-label">ID:</span>

                  <span className="result-card-value">{item?.m_id}</span>
                </div>

                <div className="result-card-item">
                  <span className="result-card-label">માલિકનું નામ:</span>

                  <span className="result-card-value">{item?.owner_name}</span>
                </div>

                <div className="result-card-item">
                  <span className="result-card-label">સોસાયટી:</span>

                  <span className="result-card-value">{item?.society}</span>
                </div>

                <div className="result-card-item">
                  <span className="result-card-label">મોબાઈલ:</span>

                  <span className="result-card-value">{item?.phone}</span>
                </div>

                <div className="result-card-item">
                  <span className="result-card-label">કુલ બાકી:</span>

                  <span className="result-card-value">
                    ₹{totalDue.toFixed(2)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    maxWidth: "100%",
                    justifyContent: "center",
                  }}
                >
                  <a
                    href={`print/${item?.m_id}`}
                    style={{ maxWidth: "fit-content", marginBottom: "0" }}
                    className="action-button"
                  >
                    View
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button whatsapp-button" // New class for styling
                    style={{
                      backgroundColor: "#25D366", // WhatsApp Green
                      color: "white",
                      marginLeft: "8px",
                      padding: "6px 10px",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "4px",
                      textDecoration: "none",
                      maxWidth: "120px",
                      textAlign: "center",
                      marginBottom: "0",
                    }}
                  >
                    <i
                      className="fab fa-whatsapp"
                      style={{
                        marginRight: "5px",
                        marginLeft: "5px",
                        fontSize: "16px",
                      }}
                    ></i>
                    Send Bill
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      // Table View for Desktop
      return (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ક્રમ</th>
                <th>માલિકનું નામ</th>
                <th>સોસાયટી</th>
                <th>મોબાઈલ</th>
                <th>કુલ બાકી</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {recordsToDisplay.map((item) => {
                const totalDue = calculateTotalDue(item?.taxes || []);

                // 1. Construct the message
                const billLink = `${window.location.origin}/g-bill/${workSpot?.id}/${item?.m_id}`; // Adjust based on your actual route structure
                const ownerName = item?.owner_name || "Dear Member";

                // Customize your message here. Using Gujarati as per the table headings.
                const whatsappMessage = `નમસ્કાર ${ownerName}, તમારા મિલકતનું બિલ નીચે આપેલ લિંક પર ઉપલબ્ધ છે.
    કુલ બાકી રકમ: ₹${totalDue.toFixed(2)}
    બિલ જોવા માટે ક્લિક કરો: ${billLink}
    
    આભાર.`;

                // 2. Encode the message for the URL
                const encodedMessage = encodeURIComponent(whatsappMessage);

                // 3. Construct the WhatsApp URL
                // Use 'wa.me' for a direct link. Replace 'item?.phone' with the actual phone number.
                // Ensure 'item?.phone' includes the country code, but without '+' or '00'.
                const whatsappUrl = `https://wa.me/${item?.phone}?text=${encodedMessage}`;

                return (
                  <tr
                    key={item?.m_id}
                    style={{
                      background: `${item?.marked ? "lightgreen" : ""}`,
                    }}
                  >
                    <td>{item?.m_id}</td>
                    <td>{item?.owner_name}</td>
                    <td>{item?.society}</td>
                    <td>{item?.phone}</td>
                    <td>₹{totalDue.toFixed(2)}</td>
                    <td>
                      <a href={`print/${item?.m_id}`} className="action-button">
                        View
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button whatsapp-button" // New class for styling
                        style={{
                          backgroundColor: "#25D366", // WhatsApp Green
                          color: "white",
                          marginLeft: "8px",
                          padding: "6px 10px",
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "4px",
                          textDecoration: "none",
                        }}
                      >
                        <i
                          className="fab fa-whatsapp"
                          style={{ marginRight: "5px", fontSize: "16px" }}
                        ></i>
                        Send Bill
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  };

  if (workSpot?.notassigned) {
    return (
      <div>
        <h1>Work Not Assigned Yet!</h1>
      </div>
    );
  }

  // Calculate progress status (assuming item.is_paid or similar is the flag for 'નીકળેલ')
  // I will use item.marked as a proxy for 'નીકળેલ' based on your previous logic
  const paidCount = allRecords.filter((item) => item.marked).length;
  const totalCount = allRecords.length;
  const dueCount = totalCount - paidCount;

  return (
    <div>
      {/* Loading Overlay controlled by state */}
      <div className={`loading-overlay ${isLoading ? "visible" : "hidden"}`}>
        <div className="spinner"></div>
      </div>

      {/* <NewWorkPopup /> */}
      {/* <button onClick={fetchDataFromPortal}>Fetch Data from Portal</button> */}

      <div className="container">
        <header className="header">
          <h1 style={{ marginTop: "1rem" }}>
            મંગણાં નું બીલ -{" "}
            <span style={{ whiteSpace: "nowrap" }}>2025-2026</span>
          </h1>
          <div className="location-info" style={{ marginTop: "0rem" }}>
            <span>
              ગામ : <span>{workSpot?.gaam}</span>
            </span>
            <span>
              તાલકો : <span>{workSpot?.taluko}</span>
            </span>
            <span>
              જીલ્લો : <span>{workSpot?.district}</span>
            </span>
          </div>
          <h3 className="sub-header-title">A.F. Infosys (Biller Panel)</h3>
        </header>

        {/* Logout Button */}
        <div className="logout-button">
          <button onClick={logout} style={{ background: "red" }}>
            Logout
          </button>
        </div>
        <br />

        <div className="panel secure-search">
          <p>
            <b style={{ fontWeight: "600" }}>ક્રમ, માલિકનું નામ,</b> અથવા{" "}
            <b style={{ fontWeight: "600" }}>મોબાઈલ નં.</b> દાખલ કરો (બધા
            રેકોર્ડ જોવા માટે ખાલી છોડો), અને જરૂર હોય તો{" "}
            <b style={{ fontWeight: "600" }}>સોસાયટી</b> પસંદ કરો.
          </p>
          <div className="filter-section">
            {/* UNIFIED INPUT FIELD */}
            <div className="filter-input-group">
              <input
                type="text"
                id="generalSearch"
                placeholder="ID, નામ, અથવા મોબાઈલ નં. શોધો..."
                className="filter-input large-input"
                value={generalSearch}
                onChange={(e) => setGeneralSearch(e.target.value)}
              />
            </div>
            {/* END UNIFIED INPUT FIELD */}

            <div className="filter-dropdown-group">
              <select
                id="societyFilter"
                className="filter-dropdown"
                value={selectedSociety}
                onChange={(e) => setSelectedSociety(e.target.value)}
              >
                <option value="">(Optional) સોસાયટી પસંદ કરો</option>
                {/* Dynamically populate options from state */}
                {societyNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSecureSearch}
              className="action-button"
              disabled={isLoading}
              style={{ display: "flex" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              બિલ શોધો
            </button>
          </div>

          <div className="progress">
            <b
              style={{
                color: "darkgreen",
                fontWight: "900",
                whiteSpace: "nowrap",
              }}
            >
              પ્રિન્ટ નીકળેલ {paidCount}
            </b>{" "}
            <b style={{ marginLeft: "1rem", whiteSpace: "nowrap" }}>
              {" "}
              + બાકી પ્રિન્ટ {dueCount}{" "}
            </b>{" "}
            = <b style={{ whiteSpace: "nowrap" }}>કુલ એન્ટ્રી {totalCount}</b>
          </div>
        </div>

        {/* Display results */}
        {isLoading && allRecords.length === 0 ? (
          <div className="no-records-found">ડેટા લોડ થઈ રહ્યો છે...</div>
        ) : (
          <>
            {renderNoResults()}
            {renderResults()}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
