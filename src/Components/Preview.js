import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
function Preview({ business, bill }) {
  const invoiceRef = useRef();
  const [showModal, setShowModal] = React.useState(false);

  const handleDownload = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const imgData = canvas.toDataURL();
    const link = document.createElement("a");
    link.download = `${bill.invoiceNo}.png`;
    link.href = imgData;
    link.click();
  };

  const businessName = business?.businessName || "Your Business";
  const address = business?.address || "";
  const gstin = business?.gstin || "";
  const phone = business?.phone || "";

  const invoiceNo = bill?.invoiceNo || "INV-000";
  const date = moment(bill?.createdAt).format("DD MMMM YYYY");
  const products = bill?.products || [];
  const subtotal = bill?.subtotal || 0;
  const discount = bill?.discount || 0;
  const grandTotal = bill?.grandTotal || 0;
  const gstPercent = bill?.gstPercent || "";
  const gstAmount = bill?.gstAmount || "";

  const customerName = bill?.customerName || "";
  const customerPhone = bill?.customerMobile || "";

  return (
    <>
      <Button variant="outline-dark" size="sm" onClick={() => setShowModal(true)}>
        <i className="bi bi-eye"></i> View
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Invoice Preview</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="p-3" ref={invoiceRef}>
            {/* Business Header */}
            <div className="text-center mb-3">
              <h4 className="fw-bold">{businessName}</h4>
              <div className="text-muted">{address}</div>
              {gstin && <div className="text-muted">GSTIN: {gstin}</div>}
              <div className="text-muted">{phone}</div>
            </div>

            <hr />

            {/* Bill Info */}
            {customerName && <div className="mb-2">              <strong>Customer Name: </strong> {customerName}</div>}
            
            {customerPhone && <div className="mb-2"><strong>Customer Number: </strong>{customerPhone}</div>}
            
            <div className="mb-2">
              <strong>Bill No:</strong> {invoiceNo}
            </div>
            <div className="mb-3">
              <strong>Date:</strong> {date}
            </div>

            {/* Table */}
            <table className="table" style={{ borderCollapse: "collapse", border: "2px solid #000" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Item</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Qty</th>
                  <th style={thStyle}>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p._id || i}>
                    <td style={tdStyle}>{p.productName}</td>
                    <td style={tdStyle}>₹{Number(p.price).toLocaleString("en-IN")}</td>
                    <td style={tdStyle}>{p.quantity}</td>
                    <td style={tdStyle}>₹{Number(p.total).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" style={tdRightStyle}>Subtotal:</td>
                  <td style={tdStyle}>₹{Number(subtotal).toLocaleString("en-IN")}</td>
                </tr>
                {(gstPercent || gstAmount) && (
                  <tr>
                    <td colSpan="3" style={tdRightStyle}>
                      <strong>GST {gstPercent ? `(${gstPercent}%)` : ""}:</strong>
                    </td>
                    <td style={tdStyle}>₹{Number(gstAmount || (subtotal * gstPercent / 100)).toLocaleString("en-IN")}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="3" style={tdRightStyle}>
                    <strong>Discount:</strong>
                  </td>
                  <td style={{ ...tdStyle, color: "green", fontWeight: "bold" }}>
                    ₹{Number(discount).toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" style={tdRightStyle}>
                    <strong>Total:</strong>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: "bold" }}>
                    ₹{Number(grandTotal).toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="w-100 d-flex align-items-center justify-content-center gap-2" variant="dark" onClick={handleDownload}>
            <i className="bi bi-download"></i> Download
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Reusable styles
const thStyle = {
  border: "0.5px solid #000",
  backgroundColor: "#f2f2f2"
};
const tdStyle = {
  border: "0.5px solid #000"
};
const tdRightStyle = {
  ...tdStyle,
  textAlign: "right"
};

export default Preview;