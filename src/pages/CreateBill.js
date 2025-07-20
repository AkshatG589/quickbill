import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { BiTrash, BiPlusCircle, BiSave } from "react-icons/bi";
import { useAuth } from "@clerk/clerk-react";
import Preview from "../Components/Preview";
import SEO from "../Components/SEO";

const Host = process.env.REACT_APP_HOST;

function CreateBill() {
  const { getToken } = useAuth();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [billItems, setBillItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // New State
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [discount, setDiscount] = useState("");
  const [gstPercent, setGstPercent] = useState("");
  const [gstAmount, setGstAmount] = useState("");

  useEffect(() => {
    fetchBusiness();
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchBusiness = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${Host}/api/business-info/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setBusiness(res.data.data);
    } catch (err) {
      console.error("Error fetching business info", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${Host}/api/products/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleAddItem = () => {
    setBillItems([
      ...billItems,
      { productName: "", price: 0, quantity: 1, total: 0 },
    ]);
  };

  const handleRemoveItem = (index) => {
    const items = [...billItems];
    items.splice(index, 1);
    setBillItems(items);
  };

  const handleItemChange = (index, field, value) => {
    const items = [...billItems];
    if (field === "productName") {
      items[index].productName = value;
      const selected = products.find((p) => p.name === value);
      if (selected) {
        items[index].price = selected.price;
        items[index].total = selected.price * (items[index].quantity || 1);
      }
    } else if (field === "price") {
      items[index].price = parseFloat(value);
      items[index].total = items[index].price * items[index].quantity;
    } else if (field === "quantity") {
      const qty = parseInt(value);
      items[index].quantity = qty;
      items[index].total = items[index].price * qty;
    }
    setBillItems(items);
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const discountValue = parseFloat(discount) || 0;

  // Handle GST logic
  useEffect(() => {
    const subMinusDiscount = subtotal - discountValue;
    if (gstPercent && !gstAmount) {
      const calculated = (subMinusDiscount * parseFloat(gstPercent)) / 100;
      setGstAmount(calculated.toFixed(2));
    } else if (gstAmount && !gstPercent) {
      const calculated = (parseFloat(gstAmount) * 100) / subMinusDiscount;
      setGstPercent(calculated.toFixed(2));
    }
    // eslint-disable-next-line
  }, [gstPercent, gstAmount, subtotal, discountValue]);

  const gstVal = parseFloat(gstAmount) || 0;
  const grandTotal = subtotal - discountValue + gstVal;

  const generateInvoiceNo = () => `INV-${Date.now()}`;

  const handleSave = async () => {
    const invoiceNo = generateInvoiceNo();
    const newBill = {
      invoiceNo,
      products: billItems,
      discount: discountValue,
      subtotal,
      grandTotal,
      customerName,
      customerMobile,
      gstPercent: gstPercent ? parseFloat(gstPercent) : undefined,
      gstAmount: gstVal || undefined,
    };

    try {
      const token = await getToken();
      await axios.post(`${Host}/api/bills/add`, newBill, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bill saved successfully!");
    } catch (err) {
      console.error("Error saving bill", err);
      alert("Failed to save bill.");
    }
  };

  const handleCreateBill = () => {
    setShowForm(true);
    if (billItems.length === 0) {
      handleAddItem();
    }
  };

  return (
    <>  
<SEO
  title="QuickBills | Create GST Invoice Instantly & Download PDF"
  description="Easily create GST‑compliant invoices with QuickBills—add products, adjust GST rates or discounts, preview in real time, and download PDF bills in seconds."
  url="https://quickbills-ak.vercel.app/create-bill"
  image="https://quickbills-ak.vercel.app/preview.png"
/>
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4">Create a Bill</h3>

      {!showForm ? (
        <div className="text-center">
          <Button variant="success" onClick={handleCreateBill}>
            <BsFileEarmarkPlus className="me-2" /> Create Bill
          </Button>
        </div>
      ) : (
        <>
          {/* Customer Info */}
          <div className="mb-4 p-3 border rounded bg-light">
            <Row className="gy-3">
              <Col md={6}>
                <Form.Label><strong>Customer Name</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Label><strong>Customer Mobile</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                />
              </Col>
            </Row>
          </div>

{/* Products Form */}
{billItems.length > 0 && (
  <div className="px-2 mb-2">
    <Row className="fw-bold text-secondary mb-1 d-none d-md-flex">
      <Col md={4}>Product Name</Col>
      <Col md={2}>Price</Col>
      <Col md={2}>Quantity</Col>
      <Col md={2}>Total</Col>
      <Col md={2}></Col>
    </Row>
  </div>
)}

{billItems.map((item, index) => (
  <div key={index} className="border p-3 mb-3 rounded shadow-sm bg-light">
    <Row className="gy-2 gx-3">
      <Col xs={12} md={4}>
        <Form.Label className="d-md-none">
        <strong>Product Name</strong></Form.Label>
        <Form.Control
          list="productList"
          placeholder="Product name"
          value={item.productName}
          onChange={(e) =>
            handleItemChange(index, "productName", e.target.value)
          }
        />
        <datalist id="productList">
          {products.map((p) => (
            <option key={p._id} value={p.name} />
          ))}
        </datalist>
      </Col>
      <Col xs={6} md={2}>
        <Form.Label className="d-md-none"><strong>Price</strong></Form.Label>
        <Form.Control
          type="number"
          placeholder="Price"
          value={item.price || ""}
          onChange={(e) =>
            handleItemChange(index, "price", e.target.value)
          }
        />
      </Col>
      <Col xs={6} md={2}>
        <Form.Label className="d-md-none"><strong>Quantity</strong></Form.Label>
        <Form.Control
          type="number"
          min="1"
          placeholder="Qty"
          value={item.quantity || ""}
          onChange={(e) =>
            handleItemChange(index, "quantity", e.target.value)
          }
        />
      </Col>
      <Col xs={6} md={2}>
        <Form.Label className="d-md-none"><strong>Total</strong></Form.Label>
        <span className="fw-bold d-flex align-items-center h-100">
          ₹{Number(item.total).toLocaleString("en-IN")}
        </span>
      </Col>
      <Col xs={6} md={2} className="text-end">
        <Button variant="danger" onClick={() => handleRemoveItem(index)}>
          <BiTrash />
        </Button>
      </Col>
    </Row>
  </div>
))}

          <div className="mb-3 text-center">
            <Button onClick={handleAddItem} variant="outline-primary">
              <BiPlusCircle className="me-2" /> Add Another Item
            </Button>
          </div>

          {/* Bill Summary */}
<div className="border p-3 rounded bg-light">
  <h5 className="fw-bold mb-3">Bill Summary</h5>

  {/* GST Section */}
  <InputGroup className="mb-2">
    <InputGroup.Text>GST %</InputGroup.Text>
    <Form.Control
      type="number"
      min="0"
      step="any"
      placeholder="Enter GST %"
      value={gstPercent}
      onChange={(e) => {
        setGstPercent(e.target.value);
        setGstAmount(""); // Clear manual GST if percentage is set
      }}
    />
  </InputGroup>

  <InputGroup className="mb-2">
    <InputGroup.Text>GST Amount</InputGroup.Text>
    <Form.Control
      type="number"
      min="0"
      step="any"
      placeholder="Or enter GST ₹ amount"
      value={gstAmount}
      onChange={(e) => {
        setGstAmount(e.target.value);
        setGstPercent(""); // Clear percentage if amount is set
      }}
    />
  </InputGroup>

  {/* Subtotal (pre-GST, pre-discount) */}
  <p>Subtotal: ₹{Number(subtotal).toLocaleString("en-IN")}</p>

  {/* Discount Section */}
  <InputGroup className="mb-2">
    <InputGroup.Text>Discount</InputGroup.Text>
    <Form.Control
      type="number"
      min="0"
      step="any"
      placeholder="Enter discount"
      value={discount}
      onChange={(e) => setDiscount(e.target.value)}
    />
  </InputGroup>

  {/* Final Grand Total */}
  <h6 className="fw-bold mt-3">
    Grand Total: ₹{Number(grandTotal).toLocaleString("en-IN")}
  </h6>
</div>

          <div className="d-flex justify-items-center justify-content-between my-4">
            <Button
              variant="dark"
              className="w-75 fw-bold "
              onClick={handleSave}
            >
              <BiSave className="me-2" />
              Save Bill
            </Button>
            <Preview
              business={business}
              bill={{
                invoiceNo: generateInvoiceNo(),
                products: billItems,
                discount: discountValue,
                subtotal,
                gstPercent,
                gstAmount,
                grandTotal,
                customerName,
                customerMobile,
              }}
            />
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default CreateBill;