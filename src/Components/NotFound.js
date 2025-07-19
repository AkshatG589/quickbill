import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";

const NotFound = () => {
  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-4 fw-bold text-danger">404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">
            Oops! The page you're looking for doesn’t exist or has been moved.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/">
              <Button variant="primary">
                <BsArrowLeft className="me-2" />
                Go to Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline-secondary">Browse Products</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;