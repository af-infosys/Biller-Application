import numberToGujaratiWords from "./NumberToGujarati";

export default function RenderBill({ workSpot, recordData }) {
  const safeNumber = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  const calculateTotalDue = (taxesArray) => {
    if (!Array.isArray(taxesArray)) return 0;
    let totalDue = taxesArray.reduce((sum, val) => sum + safeNumber(val), 0);
    return totalDue;
  };

  const taxFields = [
    { id: "houseTax", name: "ઘરવેરો" },
    { id: "saPaTax", name: "સા.પાણી વેરો" },
    { id: "specialWaterTax", name: "ખા.પાણી વેરો" },
    { id: "lightTax", name: "લાઈટવેરો" },
    { id: "cleaningTax", name: "સફાઈ વેરો" },
    { id: "sewerTax", name: "ગટર વેરો" },
    { id: "advance", name: "એડવાન્સ" },
    { id: "noticeFee", name: "નોટીસ" },
    { id: "otherTax", name: "અન્ય" },
    { id: "otherTax2", name: "અન્ય૨" },
    { id: "otherTax3", name: "અન્ય૩" },
    { id: "otherTax4", name: "અન્ય૪" },
    { id: "otherTax5", name: "અન્ય૫" },
  ];

  const taxes = recordData?.taxes;

  const totalDue = calculateTotalDue(recordData?.taxes);

  function formatDate(d) {
    return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  }

  // inside your component
  const bill_date = new Date();
  const due_date = new Date(bill_date);
  due_date.setDate(due_date.getDate() + 15);
  const y = bill_date.getFullYear();
  const year = `${y}/${String(y + 1).slice(-2)}`;

  if (!workSpot || !recordData)
    return (
      <>
        <h1>Loading your Bill</h1>
      </>
    );

  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ position: "relative" }}>
            <th colSpan="6" className="bold" style={{ paddingTop: "20px" }}>
              <span className="bold village-name">{workSpot?.gaam}</span>{" "}
              ગ્રામપંચાયત <br />
              <p style={{ fontSize: "1.5rem" }}>
                મુ. <span className="bold">{workSpot?.gaam}</span> તા.{" "}
                <span className="bold">{workSpot?.taluko}</span> જિ.{" "}
                <span className="bold">{workSpot?.district}</span>
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
        </thead>

        <tbody>
          <tr>
            <td className="left" colSpan="6">
              <span>શ્રીમાન /શ્રીમતી :</span>{" "}
              <span className="bold">{recordData?.owner_name}</span>
            </td>
          </tr>
          <tr>
            <td className="left" colSpan="6">
              <span>કબ્જેદાર :</span>{" "}
              <span className="bold">{recordData?.other_name}</span>
            </td>
          </tr>
          <tr>
            <td className="left" colSpan="6">
              <span>સરનામું :</span>{" "}
              <span className="bold">{recordData?.society}</span>
            </td>
          </tr>

          <tr>
            <th className="bold weak center" style={{ fontSize: "23px" }}>
              મિલકત નંબર
            </th>
            <th className="bold weak center" style={{ fontSize: "23px" }}>
              જૂનો મિલકત નં.
            </th>
            <th className="bold weak center" style={{ fontSize: "23px" }}>
              બિલ નંબર
            </th>
            <th className="bold weak center" style={{ fontSize: "23px" }}>
              બિલની તારીખ
            </th>
            <th className="bold weak center" style={{ fontSize: "23px" }}>
              છેલ્લી તારીખ
            </th>
            <th className="bold weak center" style={{ fontSize: "23px" }}>
              મુદત વર્ષ
            </th>
          </tr>
          <tr>
            <td
              className="center"
              style={{
                whiteSpace: "nowrap",
                fontSize: "22px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {recordData?.m_id || ""}
            </td>
            <td
              className="center"
              style={{ whiteSpace: "nowrap", fontSize: "22px" }}
            >
              {recordData?.old_id || ""}
            </td>
            <td
              className="center"
              style={{ whiteSpace: "nowrap", fontSize: "22px" }}
            >
              {recordData?.bill_no || ""}
            </td>
            <td
              className="center"
              style={{ whiteSpace: "nowrap", fontSize: "22px" }}
            >
              {formatDate(bill_date) || ""}
            </td>
            <td
              className="center"
              style={{ whiteSpace: "nowrap", fontSize: "22px" }}
            >
              {formatDate(due_date) || ""}
            </td>
            <td
              className="center"
              style={{ whiteSpace: "nowrap", fontSize: "22px" }}
            >
              {year || ""}
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ width: "100%" }}>
        <thead></thead>

        <tbody>
          <tr className="background">
            <th
              rowSpan="2"
              className="background"
              style={{ fontSize: "1.4rem" }}
            >
              વેરા કે બીજી લેણી રકમ ની વિગત
            </th>
            <th colSpan="4" style={{ fontSize: "1.4rem" }}>
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

          {taxFields?.map((field, index) => {
            const startIndex = index * 2;
            const left = Number(taxes[startIndex] || 0);
            const right = Number(taxes[startIndex + 1] || 0);

            return (
              <tr key={field.id} className="right">
                <td style={{ fontSize: "27px" }}>{field.name}</td>
                <td style={{ fontSize: "27px" }}></td>
                <td style={{ fontSize: "27px" }}>{left.toFixed(2)}</td>
                <td style={{ fontSize: "27px" }}>{right.toFixed(2)}</td>
                <td style={{ fontSize: "27px" }}>
                  {(left + right).toFixed(2)}
                </td>
                <td style={{ fontSize: "27px" }}></td>
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
            <td colSpan="6">
              કુલ રૂપિયા શબ્દોમાં :{" "}
              <span className="bold">{numberToGujaratiWords(totalDue)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          width: "100%",
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
        બજાવવામાં આવશે અને જે ઉપરથી તમે પંચાયતને ઉપરની રકમ ભરી ન જવા બદલ જવાબદાર
        ગણાશે તે જાણશો.
        <br />
      </div>

      <table>
        <tr>
          <td>
            <p style={{ whiteSpace: "nowrap", fontSize: "1.55rem" }}>
              સ્થળ :<span className="bold village-name">{workSpot?.gaam}</span>{" "}
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
              <span className="bold village-name">{workSpot?.gaam}</span>{" "}
              ગ્રામપંચાયત
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
}
