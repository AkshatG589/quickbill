import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button, Modal } from "react-bootstrap";

function Preview() {
  const invoiceRef = useRef();
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const link = document.createElement("a");
    link.download = "bill_invoice.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // Dummy Business Info
  const business = {
    name: "Shyam Baratan Bhandhar",
    address: "JARULI PHASE 2",
    gstNumber: "GSTIN: 29ABCDE1234F2Z5",
    phone: "6388523305",
    invoiceNo: "INV-002",
    date: "12 July 2025",
  };

  const products = [
    { name: "Milton 1L", price: 1150, qty: 100, total: 115000 },
    { name: "Milton MUG", price: 20, qty: 1, total: 20 },
  ];

  const subtotal = products.reduce((acc, p) => acc + p.total, 0);
  const totalDiscount = 50; // Sample discount
  const grandTotal = subtotal - totalDiscount;

  return (
    <div className="text-center mt-4">
      {/* Preview Button */}
      <Button variant="primary" onClick={() => setShowPreview(true)}>
        <i className="bi bi-eye"></i> Preview
      </Button>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Invoice Preview</Modal.Title>
          <button className="btn-close" onClick={() => setShowPreview(false)}></button>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3" ref={invoiceRef}>
            {/* Business Header */}
            <div className="text-center mb-3">
              <h4 className="fw-bold">{business.name}</h4>
              <div className="text-muted">{business.address}</div>
              <div className="text-muted">{business.gstNumber}</div>
              <div className="text-muted">Phone: {business.phone}</div>
            </div>

            <hr />

            {/* Bill Info */}
            <div className="mb-2">
              <strong>Bill No:</strong> {business.invoiceNo}
            </div>
            <div className="mb-3">
              <strong>Date:</strong> {business.date}
            </div>

            {/* Product Table */}
            <table
              className="table"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                border: "2px solid #000",
              }}
            >
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
                  <tr key={i}>
                    <td style={{ border: "0.5px solid #000" }}>{p.name}</td>
                    <td style={{ border: "0.5px solid #000" }}>₹{p.price.toFixed(2)}</td>
                    <td style={{ border: "0.5px solid #000" }}>{p.qty}</td>
                    <td style={{ border: "0.5px solid #000" }}>₹{p.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="text-start" colSpan="3" style={{ border: "0.5px solid #000", textAlign: "right" }}>Subtotal:</td>
                  <td style={{ border: "0.5px solid #000" }}>₹{subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-start" colSpan="3" style={{ border: "0.5px solid #000", textAlign: "right" }}><strong>Discount:</strong></td>
                  <td className="text-success fw-bold" style={{ border: "0.5px solid #000" }}>₹{totalDiscount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-start" colSpan="3" style={{ border: "0.5px solid #000", textAlign: "right" }}><strong>Total:</strong></td>
                  <td style={{ border: "0.5px solid #000", fontWeight: "bold" }}>₹{grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleDownload}
            variant="dark"
          >
            <i className="bi bi-download"></i> Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Preview;