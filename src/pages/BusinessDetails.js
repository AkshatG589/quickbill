import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { Modal, Button, Form } from "react-bootstrap";
import BusinessInfo from "../Components/BusinessInfo";

function BusinessDetails() {
  const { isLoaded, getToken } = useAuth();
  const Host = process.env.REACT_APP_HOST;

  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    address: "",
  });

  const fetchBusinessInfo = async () => {
    if (!isLoaded) return;

    try {
      const token = await getToken();
      const res = await axios.get(`${Host}/api/business-info/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setBusinessInfo(res.data.data);
        setFormData({
          businessName: res.data.data.businessName || "",
          phone: res.data.data.phone || "",
          address: res.data.data.address || "",
        });
      } else {
        setBusinessInfo(null);
      }
    } catch (err) {
      console.error("Error fetching business info:", err);
      setBusinessInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessInfo();
    // eslint-disable-next-line
  }, [isLoaded]);

  const handleUpdate = async () => {
    try {
      const token = await getToken();
      const res = await axios.put(`${Host}/api/business-info/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setShowModal(false);
        fetchBusinessInfo();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!businessInfo) return <BusinessInfo fetchBusinessInfo={fetchBusinessInfo} />;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h3 className="text-center mb-4">Business Details</h3>

        <div className="text-center mb-3">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-2 m-auto"
            style={{ width: "70px", height: "70px", fontSize: "36px" }}
          >
            {businessInfo.businessName?.charAt(0).toUpperCase() || "Q"}
          </div>
          <h4>{businessInfo.businessName}</h4>
        </div>

        <p><strong>Phone:</strong> {businessInfo.phone}</p>
        <p><strong>Address:</strong> {businessInfo.address}</p>

        <div className="text-center">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Update Details
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Business Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BusinessDetails;