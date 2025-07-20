import React from "react";
import { Title, Meta, Link } from "react-head";

const SEO = ({
  title = "QuickBills | Create GST Invoices & Track Billing Easily",
  description = "Create GST-ready invoices with QuickBills. Manage products, track billing history, and download professional invoices with ease.",
  url = "https://quickbills-ak.vercel.app",
  image = "https://quickbills-ak.vercel.app/preview.png",
  type = "website",
  index = true,
  pageType = "WebPage",
  extraSchema = {},
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": pageType,
    name: title,
    description,
    url,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    publisher: {
      "@type": "Organization",
      name: "QuickBills",
      url: "https://quickbills-ak.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://quickbills-ak.vercel.app/logo192.png",
      },
    },
    ...extraSchema,
  };

  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta name="robots" content={index ? "index, follow" : "noindex, nofollow"} />
      <Link rel="canonical" href={url} />

      {/* Open Graph */}
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={image} />
      <Meta property="og:url" content={url} />
      <Meta property="og:type" content={type} />

      {/* Twitter */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
};

export default SEO;