import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const BusinessInfo = (props) => {
  const { getToken } = useAuth();
  const Host = process.env.REACT_APP_HOST;

  const [formData, setFormData] = useState({
    businessName: '',
    gstin: '',
    phone: '',
    address: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = await getToken();

      const res = await fetch(`${Host}/api/business-info/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Business info saved successfully!');
        setFormData({
          businessName: '',
          gstin: '',
          phone: '',
          address: '',
        });
        props.fetchBusinessInfo();
      } else {
        setMessage(data.error || 'Failed to save info.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while submitting.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Business Information</h2>
        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="businessName" className="form-label">
              Business Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="businessName"
              name="businessName"
              required
              value={formData.businessName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gstin" className="form-label">GSTIN</label>
            <input
              type="text"
              className="form-control"
              id="gstin"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Business Address <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="3"
              required
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Save Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessInfo;