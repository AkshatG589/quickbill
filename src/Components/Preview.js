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

  return (
    <>
      {/* ✅ View Button */}
      <Button variant="outline-dark" size="sm" onClick={() => setShowModal(true)}>
        <i className="bi bi-eye"></i> View
      </Button>

      {/* ✅ Single Modal for Preview & Download */}
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
              <div className="text-muted">Phone: {phone}</div>
            </div>

            <hr />

            {/* Bill Info */}
            <div className="mb-2">
              <strong>Bill No:</strong> {invoiceNo}
            </div>
            <div className="mb-3">
              <strong>Date:</strong> {date}
            </div>

            {/* Product Table */}
            <table className="table" style={{ borderCollapse: "collapse", border: "2px solid #000" }}>
              <thead>
                <tr>
                  <th style={{ border: "0.5px solid #000", backgroundColor: "#f2f2f2" }}>Item</th>
                  <th style={{ border: "0.5px solid #000", backgroundColor: "#f2f2f2" }}>Price</th>
                  <th style={{ border: "0.5px solid #000", backgroundColor: "#f2f2f2" }}>Qty</th>
                  <th style={{ border: "0.5px solid #000", backgroundColor: "#f2f2f2" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p._id || i}>
                    <td style={{ border: "0.5px solid #000" }}>{p.productName}</td>
                    <td style={{ border: "0.5px solid #000" }}>₹{p.price.toFixed(2)}</td>
                    <td style={{ border: "0.5px solid #000" }}>{p.quantity}</td>
                    <td style={{ border: "0.5px solid #000" }}>₹{p.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="text-start" colSpan="3" style={{ border: "0.5px solid #000", textAlign: "right" }}>Subtotal:</td>
                  <td style={{ border: "0.5px solid #000" }}>₹{subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-start" colSpan="3" style={{ border: "0.5px solid #000", textAlign: "right" }}>
                    <strong>Discount:</strong>
                  </td>
                  <td style={{ border: "0.5px solid #000", color: "green", fontWeight: "bold" }}>
                    ₹{discount.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="text-start" colSpan="3" style={{ border: "0.5px solid #000", textAlign: "right" }}>
                    <strong>Total:</strong>
                  </td>
                  <td style={{ border: "0.5px solid #000", fontWeight: "bold" }}>
                    ₹{grandTotal.toFixed(2)}
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

export default Preview;