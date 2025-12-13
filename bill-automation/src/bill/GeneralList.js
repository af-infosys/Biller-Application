import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiPath from "../isProduction";
// Note: आपको 'Bill.css' की आवश्यकता होगी, लेकिन मैंने इसे comments में रखा है।

// API Call Mock/Placeholder (इसे आपके वास्तविक API endpoint से बदलें)
const fetchPropertyData = async (sheetId, searchData) => {
  const response = await fetch(
    `${await apiPath()}/api/bill-data/public/${sheetId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    }
  );

  if (!response.ok) {
    throw new Error("Server error");
  }

  return response.json();
};

const GeneralList = () => {
  const { sheetId } = useParams();
  const navigation = useNavigate();

  const [propertyData, setPropertyData] = useState(null); // Single property object
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchSociety, setSearchSociety] = useState(""); // Corrected name for consistency
  const [message, setMessage] = useState(
    "કૃપા કરીને તમારી પ્રોપર્ટી શોધવા માટે વિગતો દાખલ કરો."
  );
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const [societyNames, setSocietyNames] = useState(["Loading..."]);
  const [workSpot, setWorkSpot] = useState({});

  // New fetch function for society list
  const fetchSocietyList = async () => {
    // Note: API endpoint को अपने real endpoint से बदलें
    const apiUrl = `${await apiPath()}/api/bill-data/society/${sheetId}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch society list");

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setSocietyNames(result.data);
      } else {
        console.error("API returned success: false or invalid data format.");
      }
    } catch (error) {
      console.error("Error fetching society list:", error);
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

  // --- useEffect Hook to fetch society list on component mount ---
  useEffect(() => {
    // sheetId के उपलब्ध होने पर ही fetch करें
    if (sheetId) {
      fetchSocietyList();
      fetchBillWorkDetails();
    }
  }, [sheetId]);

  const handleSecureSearch = async () => {
    const nameInput = searchName.trim();
    const mobileInput = searchMobile.trim();
    const societyInput = searchSociety.trim();

    // Reset previous state
    setPropertyData(null);
    setMessage("");

    // Basic Validation
    if (!nameInput && !mobileInput && !societyInput) {
      setMessage(
        "કૃપા કરીને તમારી પ્રોપર્ટી શોધવા માટે નામ, ફોન નં. અથવા સોસાયટીમાં થી કોઈ એક વિગત દાખલ કરો."
      );
      return;
    }

    if (mobileInput && mobileInput.length !== 10) {
      setMessage("મોબાઇલ નંબર 10 અંકનો હોવો જોઈએ.");
      return;
    }

    // Name validation is flexible, backend will handle strictness.

    setIsLoading(true);
    try {
      const searchPayload = {
        owner_name: nameInput || undefined, // Send undefined if empty
        phone: mobileInput || undefined,
        society: societyInput || undefined,
      };

      const result = await fetchPropertyData(sheetId, searchPayload);

      setMessage(result.message);

      if (result.success) {
        // Backend sends the single object if success is true
        setPropertyData(result.data);
      } else {
        setPropertyData(null); // Ensure no data is displayed on failure
      }
    } catch (error) {
      console.error("Search Error:", error);
      setMessage("ડેટા લાવતી વખતે ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.");
      setPropertyData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Window Resize/Responsiveness Logic ---

  const handleResize = useCallback(() => {
    setIsMobileView(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const safeNumber = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  const calculateTotalDue = (taxesArray) => {
    if (!Array.isArray(taxesArray)) return 0;
    let totalDue = taxesArray.reduce((sum, val) => sum + safeNumber(val), 0);
    return totalDue;
  };

  const renderPropertyDetails = () => {
    if (!propertyData) return null;

    const {
      m_id,
      owner_name,
      society,
      phone,
      taxes,
      house_id,
      description,
      price, // Base property price/value
    } = propertyData;

    const totalTaxDue = calculateTotalDue(taxes);

    return (
      <div className="property-details-panel">
        <h2>તમારી પ્રોપર્ટીની વિગતો</h2>
        {/* WARNING MESSAGE */}
        {/* <p className="privacy-warning">
          ⚠️ *ચેતવણી:* આ માત્ર તમારી પોતાની પ્રોપર્ટીનો ડેટા છે. 
        </p> */}

        <div className="details-grid">
          <div className="detail-item">
            <span className="label">માલિકનું નામ:</span>
            <span className="value">{owner_name}</span>
          </div>
          <div className="detail-item">
            <span className="label">સોસાયટી:</span>
            <span className="value">{society}</span>
          </div>
          {/* <div className="detail-item">
            <span className="label">હાઉસ ID / નંબર:</span>
            <span className="value">{house_id}</span>
          </div> */}
          <div className="detail-item">
            <span className="label">ફોન નં:</span>
            <span className="value">{phone}</span>
          </div>
          <div className="detail-item full-width">
            <span className="label">વર્ણન:</span>
            <span className="value">{description}</span>
          </div>
          <div className="detail-item highlight">
            <span className="label">કુલ ટેક્સ બાકી:</span>
            <span className="value">₹{totalTaxDue.toFixed(2)}</span>
          </div>
          <div className="detail-item">
            <span className="label">આકારણી મૂલ્ય:</span>
            <span className="value">₹{price.toFixed(2)}</span>
          </div>
        </div>

        {/* Tax Details Table */}
        {taxes?.length > 0 && (
          <>
            <h3>ટેક્સ વિગતો</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ટેક્સનું નામ</th>
                    <th>બાકી રકમ</th>
                  </tr>
                </thead>
                <tbody>
                  {taxes.map((tax, index) => (
                    <tr key={index}>
                      <td>{tax.name || `Tax Item ${index + 1}`}</td>
                      <td>₹{parseFloat(tax.price || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Action Button */}
        <button
          className="action-button primary-action"
          onClick={() => {
            navigation(`/g-bill/${sheetId}/${m_id}`);
          }}
        >
          બિલ ડાઉનલોડ કરો
        </button>
      </div>
    );
  };

  // --- Main Render ---

  return (
    <div className="general-list-app">
      {/* Basic Styles for clarity (You should move this to a CSS file) */}
      <style>{`
        .general-list-app { font-family: Arial, sans-serif; padding: 20px; max-width: 900px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 0px; border-bottom: 2px solid #ccc; padding-bottom: 15px; }
        .header h1, .header h3 { color: #333; }
        .panel { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .filter-section { display: flex; gap: 15px; flex-wrap: wrap; align-items: flex-end; }
        .filter-input-group, .filter-dropdown-group { flex: 1; min-width: 200px; }
        .filter-input, .filter-dropdown { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .action-button { padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s; }
        .action-button:hover:not(:disabled) { background-color: #0056b3; }
        .action-button:disabled { background-color: #a0a0a0; cursor: not-allowed; }
        .message-box { padding: 15px; border-radius: 4px; margin-bottom: 20px; font-weight: bold; }
        .message-success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .message-error, .privacy-warning { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .loading-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.8); display: none; justify-content: center; align-items: center; z-index: 1000; }
        .loading-overlay.visible { display: flex; }
        .spinner { border: 4px solid rgba(0,0,0,0.1); border-top: 4px solid #007bff; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .property-details-panel { background: #e9f5ff; padding: 25px; border-radius: 10px; border: 1px solid #007bff; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .detail-item { padding: 10px; border-bottom: 1px dashed #ccc; }
        .detail-item .label { font-weight: bold; display: block; color: #555; }
        .detail-item .value { display: block; font-size: 1.1em; color: #000; }
        .detail-item.full-width { grid-column: 1 / -1; }
        .detail-item.highlight { background-color: #d3eaff; border-radius: 4px; border-bottom: none; }
        .data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .data-table th, .data-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .data-table th { background-color: #f2f2f2; }
        .primary-action { display: block; width: 100%; margin-top: 20px; font-size: 1.1em; }

        @media (max-width: 768px) {
            .filter-section { display: block; }
            .filter-input-group, .filter-dropdown-group { min-width: 100%; margin-bottom: 10px; }
            .details-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Loading Overlay */}
      <div className={`loading-overlay ${isLoading ? "visible" : "hidden"}`}>
        <div className="spinner"></div>
      </div>

      <div className="container">
        <header className="header">
          <h1>A.F. Infosys</h1>
          <h2>મિલ્ક્ત આકારણીની યાદી</h2>
          <h3>
            <b style={{ whiteSpace: "nowrap" }}>ગામ : {workSpot?.gaam}</b>{" "}
            <b style={{ whiteSpace: "nowrap" }}>તાલુકો : {workSpot?.taluko}</b>{" "}
            <b style={{ whiteSpace: "nowrap" }}>
              જીલ્લો : {workSpot?.district}
            </b>
          </h3>
        </header>

        <div className="panel secure-search">
          <h2>તમારી પ્રોપર્ટી શોધો</h2>
          <div className="filter-section">
            <div className="filter-input-group">
              <label htmlFor="searchName">માલિકનું નામ</label>
              <input
                type="text"
                id="searchName"
                placeholder="માલિકનું નામ..."
                className="filter-input"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="filter-input-group">
              <label htmlFor="searchMobile">મોબાઈલ નં. (10 અંક)</label>
              <input
                type="text"
                id="searchMobile"
                placeholder="મોબાઈલ નં..."
                className="filter-input"
                maxLength="10"
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
              />
            </div>
            <div className="filter-dropdown-group">
              <label htmlFor="societyFilter">સોસાયટી પસંદ કરો (વૈકલ્પિક)</label>
              <select
                id="societyFilter"
                className="filter-dropdown"
                value={searchSociety}
                onChange={(e) => setSearchSociety(e.target.value)}
              >
                <option value="">બધી સોસાયટીઓ</option>
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
              પ્રોપર્ટી શોધો
            </button>
          </div>
        </div>

        {/* Message Box */}
        {message && (
          <div
            className={`message-box ${
              propertyData ? "message-success" : "message-error"
            }`}
          >
            {message}
          </div>
        )}

        {/* Display Property Details */}
        {renderPropertyDetails()}
      </div>
    </div>
  );
};

export default GeneralList;
