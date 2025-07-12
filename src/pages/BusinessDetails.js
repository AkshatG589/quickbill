import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { Modal, Button, Form } from "react-bootstrap";
import BusinessInfo from "../Components/BusinessInfo" 
function BusinessDetails() {
  const { isLoaded, getToken } = useAuth();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    logoUrl: "",
    phone: "",
    address: "",
  });
  const [logoFile, setLogoFile] = useState(null);

  const fetchBusinessInfo = async () => {
    if (!isLoaded) return;

    try {
      const token = await getToken();
      const res = await axios.get("http://localhost:5000/api/business-info/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setBusinessInfo(res.data.data);
        setFormData({
          businessName: res.data.data.businessName || "",
          logoUrl: res.data.data.logoUrl || "",
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
  }, [isLoaded]);

  const handleUpdate = async () => {
    try {
      const token = await getToken();

      // If logo file is selected, upload it or convert to base64/local URL (demo version)
      let logoUrl = formData.logoUrl;

      if (logoFile) {
        // Example: Convert to base64 for demo only (not for production)
        const reader = new FileReader();
        reader.readAsDataURL(logoFile);
        reader.onloadend = async () => {
          logoUrl = reader.result;

          const updatedData = {
            ...formData,
            logoUrl,
          };

          const res = await axios.put("http://localhost:5000/api/business-info/update", updatedData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (res.data.success) {
            setShowModal(false);
            fetchBusinessInfo();
          }
        };
        return; // Wait for FileReader to finish
      }

      // No image uploaded
      const res = await axios.put("http://localhost:5000/api/business-info/update", formData, {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, logoUrl: previewUrl });
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!businessInfo) return(
      <BusinessInfo fetchBusinessInfo={fetchBusinessInfo} />
    ) 

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h3 className="text-center mb-4">Business Details</h3>

        <div className="text-center mb-3">
          {businessInfo.logoUrl ? (
            <img
              src={businessInfo.logoUrl}
              alt="Business Logo"
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
              className="mb-2 rounded-circle border"
            />
          ) : (
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-2 m-auto"
              style={{ width: "70px", height: "70px", fontSize: "36px" }}
            >
              {businessInfo.businessName?.charAt(0).toUpperCase() || "Q"}
            </div>
          )}
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

            <Form.Group className="mt-3">
              <Form.Label>Upload Logo</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              {formData.logoUrl && (
                <img
                  src={formData.logoUrl}
                  alt="Preview"
                  style={{ width: "80px", height: "80px", objectFit: "contain", marginTop: "10px" }}
                />
              )}
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