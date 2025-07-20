import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "react-bootstrap";
import Preview from "../Components/Preview";
import moment from "moment";
import { useAuth } from "@clerk/clerk-react";
import SEO from "../Components/SEO";

function History() {
  const { getToken } = useAuth();
  const [business, setBusiness] = useState(null);
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const Host = process.env.REACT_APP_HOST;
  useEffect(() => {
    fetchBusiness();
    fetchBills();
    // eslint-disable-next-line
  }, []);

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await axios.get(`${Host}/api/business-info/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setBusiness(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch business info", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBills = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await axios.get(`${Host}/api/bills/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setBills(res.data.bills);
      }
    } catch (err) {
      console.error("Failed to fetch bills", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBills = bills.filter((bill) =>
    bill.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedBills = filteredBills.reduce((acc, bill) => {
    const date = moment(bill.createdAt).format("dddd D MMMM, YYYY");
    if (!acc[date]) acc[date] = [];
    acc[date].push(bill);
    return acc;
  }, {});

  return (
    <> 
    <SEO
  title="QuickBills | View & Download Billing History"
  description="Review past invoices with QuickBills—search, filter by date or customer, view details, and download PDF copies of your GST‑compliant billing history."
  url="https://quickbills-ak.vercel.app/bill-history"
  image="https://quickbills-ak.vercel.app/preview.png"
  pageType="WebPage"
/>
    <div className="container mt-4">
      <h4 className="fw-bold mb-4">Your Previous Bills</h4>

      <div className="input-group mb-4 shadow-sm">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search by bill number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading...</p>
        </div>
      ) : bills.length === 0 ? (
        <div className="text-center text-muted my-5">
          <i className="bi bi-receipt-cutoff display-3 mb-3"></i>
          <h5>No bills yet</h5>
        </div>
      ) : filteredBills.length === 0 ? (
        <div className="text-center text-muted my-5">
          <i className="bi bi-search display-3 mb-3"></i>
          <h5>No bill found</h5>
        </div>
      ) : (
        Object.entries(groupedBills).map(([date, billsOfDay]) => (
          <div key={date} className="">
            <h6 className="mb-3 border py-2 bg-light px-1">
              {date}{" "}
              <Badge bg="secondary">
                {billsOfDay.length} bill{billsOfDay.length > 1 ? "s" : ""}
              </Badge>
            </h6>

            {billsOfDay.map((bill) => (
              <div
                key={bill._id}
                className="shadow-sm p-3 mb-3 rounded border"
              >
                {/* Mobile/Small screen layout */}
                <div className="d-block d-md-none">
                  <div className="fw-bold">{bill.invoiceNo}</div>
                  <div className="text-muted small">
                    {moment(bill.createdAt).format("hh:mm A")} |{" "}
                    <Badge bg="light" text="dark">
                      {bill.products.length} items
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold text-end mt-2">₹{Number(bill.grandTotal).toLocaleString("en-IN")}
                    </div>
                    <div className="mt-2">
                      <Preview business={business} bill={bill} />
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="d-none d-md-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <div className="fw-bold">{bill.invoiceNo}</div>
                      <div className="text-muted small">
                        {moment(bill.createdAt).format("hh:mm A")}
                      </div>
                    </div>
                    <Badge bg="light" text="dark">
                      {bill.products.length} items
                    </Badge>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <div className="fw-bold">₹{bill.grandTotal.toFixed(2)}</div>
                    <Preview business={business} bill={bill} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
        </>
  );
}
export default History;