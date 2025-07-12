import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const BusinessInfo = (props) => {
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    businessName: '',
    gstin: '',
    phone: '',
    address: '',
    logoUrl: '', // This will be filled if you implement image upload to cloud
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = await getToken();

      // Upload logo file to Cloudinary or your image hosting (optional)
      let uploadedLogoUrl = '';
      if (logoFile) {
        const data = new FormData();
        data.append('file', logoFile);
        data.append('upload_preset', 'your_upload_preset'); // Replace if using Cloudinary

        const uploadRes = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: data,
        });

        const uploadData = await uploadRes.json();
        uploadedLogoUrl = uploadData.secure_url;
      }

      const res = await fetch('http://localhost:5000/api/business-info/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          logoUrl: uploadedLogoUrl || '', // Add logo URL if uploaded
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Business info saved successfully!');
        setFormData({
          businessName: '',
          gstin: '',
          phone: '',
          address: '',
          logoUrl: '',
        });
        setLogoFile(null);
        setLogoPreview(null);
        props.fetchBusinessInfo()
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
            <label htmlFor="logoUrl" className="form-label">Logo Image</label>
            <input
              type="file"
              className="form-control"
              id="logoUrl"
              name="logoUrl"
              accept="image/*"
              onChange={handleFileChange}
            />
            {logoPreview && (
              <img src={logoPreview} alt="Logo Preview" className="img-thumbnail mt-2" width="120" />
            )}
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