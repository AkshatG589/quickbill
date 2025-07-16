import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Style/Footer.css"; // optional

function Footer() {
  return (
    <footer className="bg-light border-top py-4 mt-5 shadow-sm">
      <Container>
        <Row>
          <Col xs={12} md={4} className="mb-3">
            <h5>QuickBills</h5>
            <p className="text-muted small">
              Create professional bills, manage your products, and track billing history – all in one place.
            </p>
          </Col>

          <Col xs={6} md={4} className="mb-3">
            <h6 className="text-dark">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/create-bill" className="text-decoration-none text-muted">Create Bill</Link>
              </li>
              <li>
                <Link to="/products" className="text-decoration-none text-muted">Products</Link>
              </li>
              <li>
                <Link to="/bill-history" className="text-decoration-none text-muted">Bill History</Link>
              </li>
              <li>
                <Link to="/business-details" className="text-decoration-none text-muted">Business Details</Link>
              </li>
            </ul>
          </Col>

          <Col xs={6} md={4} className="mb-3">
            <h6 className="text-dark">More</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-decoration-none text-muted">About Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-decoration-none text-muted">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-muted">Terms of Service</Link>
              </li>
              <li>
                <Link to="/support" className="text-decoration-none text-muted">Contact Support</Link>
              </li>
            </ul>
          </Col>
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