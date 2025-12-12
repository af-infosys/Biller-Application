import React, { useState, useEffect, useRef, useCallback } from "react";
// import "./Bill.css";

// Helper function to safely parse a value as a number
const safeNumber = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
};

// Calculates the total due amount from the record row (columns 19 to 30)
const calculateTotalDue = (row) => {
  let totalDue = 0;
  // Columns 19 to 30 (12 columns)
  for (let i = 19; i <= 30; i++) {
    totalDue += safeNumber(row[i]);
  }
  return totalDue;
};

const GeneralList = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [societyNames, setSocietyNames] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState(null); // null means no search yet, [] means search done but no results
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // --- Data Fetching and Initialization ---

  const fetchDataFromSheet = async (sheetId) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    const res = await fetch(url);
    const text = await res.text();
    // The sheet response format requires slicing
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows.map((row) =>
      row.c.map((cell) => (cell ? cell.v : ""))
    );
    // Attach originalIndex for record identification and filtering
    return rows.map((r, i) => ({ record: r, originalIndex: i }));
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const records = await fetchDataFromSheet(
          "1_bs5IQ0kDT_xVLwJdihe17yuyY_UfJRKCtwoGvO7T5Y"
        );
        setAllRecords(records);

        // Populate society names (skip header row at index 0)
        const names = new Set();
        for (let i = 1; i < records.length; i++) {
          if (records[i].record[4]) names.add(records[i].record[4]);
        }
        setSocietyNames(Array.from(names).sort()); // Sort for better UX
      } catch (err) {
        alert("ડેટા લોડ કરવામાં ક્ષમતા નિષ્ફળ ગઈ. કૃપા કરીને ફરી પ્રયાસ કરો.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // --- Filtering Logic ---

  const handleSecureSearch = () => {
    const nameInput = searchName.trim().toLowerCase();
    const mobileInput = searchMobile.trim();
    const societyFilter = selectedSociety.trim().toLowerCase();

    // Validation
    if (!nameInput && !mobileInput) {
      alert("માલિકનું નામ અથવા મોબાઈલ નં. દાખલ કરો.");
      return;
    }
    if (nameInput && nameInput.length < 3) {
      alert("માલિકનું નામ ઓછામાં ઓછા 3 અક્ષરનું હોવું જોઈએ.");
      return;
    }
    if (mobileInput && mobileInput.length !== 10) {
      alert("મોબાઈલ નંબર 10 અંકનો હોવો જોઈએ.");
      return;
    }

    const filtered = allRecords.filter((item) => {
      if (item.originalIndex === 0) return false; // Skip header row

      const row = item.record;
      const ownerName = row[1]?.toLowerCase() || "";
      const mobile = row[17]?.toString() || "";
      const society = row[4]?.toLowerCase() || "";

      let nameMatch = false;
      if (nameInput) {
        // First, try exact match for the whole name string
        if (ownerName === nameInput) {
          nameMatch = true;
        } else {
          // Fallback to flexible word-based match
          const searchWords = nameInput.split(/\s+/).filter(Boolean);
          const ownerNameWords = ownerName.split(/\s+/).filter(Boolean);
          // All search words must be present in the owner name words
          nameMatch = searchWords.every((word) =>
            ownerNameWords.includes(word)
          );
        }
      }

      const mobileMatch = mobileInput && mobile.includes(mobileInput);
      const societyMatch = !societyFilter || society === societyFilter;

      return (nameMatch || mobileMatch) && societyMatch;
    });

    setFilteredRecords(filtered);
  };

  // --- Window Resize/Responsiveness Logic ---

  const handleResize = useCallback(() => {
    setIsMobileView(window.innerWidth <= 768);
    // Note: React will automatically re-render the results when isMobileView changes
    // which effectively handles the original requirement of re-rendering on resize.
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // --- Rendering Components ---

  const renderNoResults = () => {
    if (filteredRecords === null) return null;
    if (filteredRecords.length === 0) {
      return <div className="no-records-found">તમારું રેકોર્ડ મળ્યું નથી.</div>;
    }
    return null;
  };

  const renderResults = () => {
    if (!filteredRecords || filteredRecords.length === 0) return null;

    if (isMobileView) {
      // Card View for Mobile
      return (
        <div className="results-container">
          {filteredRecords.map((item) => {
            const row = item.record;
            const totalDue = calculateTotalDue(row);
            return (
              <div key={item.originalIndex} className="result-card">
                <div className="result-card-item">
                  <span className="result-card-label">માલિકનું નામ:</span>
                  <span className="result-card-value">{row[1]}</span>
                </div>
                <div className="result-card-item">
                  <span className="result-card-label">સોસાયટી:</span>
                  <span className="result-card-value">{row[4]}</span>
                </div>
                <div className="result-card-item">
                  <span className="result-card-label">મોબાઈલ:</span>
                  <span className="result-card-value">{row[17]}</span>
                </div>
                <div className="result-card-item">
                  <span className="result-card-label">કુલ બાકી:</span>
                  <span className="result-card-value">
                    ₹{totalDue.toFixed(2)}
                  </span>
                </div>
                <a
                  href="#"
                  style={{ maxWidth: "fit-content" }}
                  className="action-button"
                >
                  Pay
                </a>
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
                <th>માલિકનું નામ</th>
                <th>સોસાયટી</th>
                <th>મોબાઈલ</th>
                <th>કુલ બાકી</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item) => {
                const row = item.record;
                const totalDue = calculateTotalDue(row);
                return (
                  <tr key={item.originalIndex}>
                    <td>{row[1]}</td>
                    <td>{row[4]}</td>
                    <td>{row[17]}</td>
                    <td>₹{totalDue.toFixed(2)}</td>
                    <td>
                      <a href="#" className="action-button">
                        Pay
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

  return (
    <div>
      {/* Loading Overlay controlled by state */}
      <div className={`loading-overlay ${isLoading ? "visible" : "hidden"}`}>
        <div className="spinner"></div>
      </div>

      <div className="container">
        <header className="header">
          <h1>A.F. Infosys</h1>
          <h1>
            મિલ્ક્ત આકારણીની યાદી - વર્ષ : <span>2025-2026</span>
          </h1>
          <h3>
            ગામ : <span>MEGHARAJ</span>
            <br />
            તાલકો : <span>MEGHARAJ</span>
            <br />
            જીલ્લો : <span>ARAVALLI</span>
          </h3>
        </header>

        <div className="panel secure-search">
          <h2>તમારું બિલ શોધો</h2>
          <p>
            માલિકનું નામ અથવા મોબાઈલ નં. દાખલ કરો (બેમાંથી એક ફરજિયાત), અને જરૂર
            હોય તો સોસાયટી પસંદ કરો.
          </p>
          <div className="filter-section">
            <div className="filter-input-group">
              <input
                type="text"
                id="searchName"
                placeholder="માલિકનું નામ..."
                className="filter-input"
                minLength="3"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="filter-input-group">
              <input
                type="text"
                id="searchMobile"
                placeholder="મોબાઈલ નં..."
                className="filter-input"
                minLength="10"
                maxLength="10"
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
              />
            </div>
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
            >
              બિલ શોધો
            </button>
          </div>
        </div>

        {renderNoResults()}
        {renderResults()}
      </div>
    </div>
  );
};

export default GeneralList;
