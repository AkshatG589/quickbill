// src/Components/SEO.js
import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
  title = "QuickBills | Simple GST Billing App",
  description = "Create GST-ready invoices easily with QuickBills. Manage products, view history, and generate professional bills.",
  url = "https://quickbills-ak.vercel.app",
  image = "https://quickbills-ak.vercel.app/preview.png",
  type = "website",
}) => {
  return (
    <Helmet>
      {/* Page Title */}
      <title>{title}</title>

      {/* Meta Description */}
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;