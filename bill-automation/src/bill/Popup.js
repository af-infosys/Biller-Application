import { useState } from "react";
import "./popup.css";

export default function NewWorkPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id: "",
    password: "",
    gaam: "",
    taluko: "",
    jillo: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitWork = async () => {
    setResult("Creating new work...");

    try {
      localStorage.setItem("id", form.id);
      localStorage.setItem("password", form.password);

      const res = await fetch("http://localhost:5000/new-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setResult(data.error || "Failed");
        return;
      }

      setResult("✅ Sheet Created: " + data.newSheetID);
    } catch (err) {
      setResult("❌ Server not reachable");
    }
  };

  return (
    <>
      {/* SINGLE BUTTON */}
      <button className="main-btn" onClick={() => setOpen(true)}>
        Add New Work
      </button>

      {/* POPUP */}
      {open && (
        <div className="overlay">
          <div className="popup">
            <h2>New GramSuvidha Work</h2>

            <input name="id" placeholder="Login ID" onChange={handleChange} />
            <input
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input name="gaam" placeholder="Gaam" onChange={handleChange} />
            <input name="taluko" placeholder="Taluko" onChange={handleChange} />
            <input name="jillo" placeholder="Jillo" onChange={handleChange} />

            <button className="submit-btn" onClick={submitWork}>
              Submit
            </button>

            <button className="close-btn" onClick={() => setOpen(false)}>
              Close
            </button>

            <p className="result">{result}</p>
          </div>
        </div>
      )}
    </>
  );
}
