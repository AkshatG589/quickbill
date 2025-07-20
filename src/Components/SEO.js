import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
  title = "QuickBills | Create GST Invoices & Track Billing Easily",
  description = "Create GST-ready invoices with QuickBills. Manage products, track billing history, and download professional invoices with ease.",
  url = "https://quickbills-ak.vercel.app",
  image = "https://quickbills-ak.vercel.app/preview.png",
  type = "website",
  index = true, // allow toggling index/follow
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={index ? "index, follow" : "noindex, nofollow"} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data (optional) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          name: "QuickBills",
          url,
          description,
        })}
      </script>
    </Helmet>
  );
};

export default SEO;