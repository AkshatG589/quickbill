import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Style/Footer.css"; // optional

function Footer() {
  const footerLinks = [
    { label: "Create Bill", to: "/create-bill" },
    { label: "About Us", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Bill History", to: "/bill-history" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Business Details", to: "/business-details" },
    { label: "Support", to: "/support" },
    { label: "Pricing", to: "/pricing" },
    { label: "Careers", to: "/careers" },
    { label: "Help Center", to: "/help" },
    { label: "Blog", to: "/blog" },
  ];

  return (
    <footer className="bg-light border-top py-4 mt-5 shadow-sm">
      <Container>
        {/* Branding on Top */}
        <div className="text-center mb-4">
          <h5 className="fw-bold">QuickBills</h5>
          <p className="text-muted small mb-0">
            Create professional bills, manage your products, and track billing history — all in one place.
          </p>
        </div>

        {/* Responsive Links */}
        <Row>
          {footerLinks.map((link, index) => (
            <Col xs={6} md={3} className="mb-2" key={index}>
              <Link to={link.to} className="text-decoration-none text-muted d-block m-auto">
                {link.label}
              </Link>
            </Col>
          ))}
        </Row>

        <hr />
        <p className="text-center text-muted small mb-0">
          © {new Date().getFullYear()} QuickBills. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;