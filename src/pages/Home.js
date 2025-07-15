import React from "react"; import { Button, Container, Row, Col, Card } from "react-bootstrap"; import { useNavigate } from "react-router-dom"; import { useUser } from "@clerk/clerk-react"; import { BsLightningChargeFill, BsBoxSeam, BsFileEarmarkText, BsShieldLock, BsCloudCheck, BsPersonBadge ,BsArrowRight} from "react-icons/bs";

function Home({ isLoggedIn }) { const navigate = useNavigate(); const { user } = useUser();

return ( <div> {/* Hero Section */} 
<div
  className="bg-light d-flex justify-content-center align-items-center text-center"
  style={{ height: "70vh" }}
>
  <Container>
    <h1 className="display-4 fw-bold">Welcome to QuickBills</h1>
    <p className="lead text-muted">
      Create professional bills, manage products and track history — fast and easy.
    </p>
    {user && (
      <h5 className="text-primary">
        Welcome back, {user.firstName || "User"}!
      </h5>
    )}
    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
      {isLoggedIn ? (
        <>
          <Button variant="primary" onClick={() => navigate("/create-bill")}>
            Start Billing
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate("/products")}>
            Manage Products
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={() => navigate("/sign-in")}>
          Get Started <BsArrowRight className="ms-2" />
        </Button>
      )}
    </div>
  </Container>
</div>

{/* Features Section */}
  <Container className="py-5">
    <h2 className="text-center mb-4">Why Choose QuickBills?</h2>
    <Row className="g-4">
      {[
        { icon: <BsFileEarmarkText size={30} />, text: "GST-Ready Billing" },
        { icon: <BsBoxSeam size={30} />, text: "Manage Products" },
        { icon: <BsPersonBadge size={30} />, text: "Store Business Info" },
        { icon: <BsCloudCheck size={30} />, text: "Cloud Data Storage" },
        { icon: <BsShieldLock size={30} />, text: "Clerk Authentication" },
        { icon: <BsLightningChargeFill size={30} />, text: "Fast & Simple" },
      ].map((item, idx) => (
        <Col md={4} key={idx}>
          <Card className="h-100 text-center p-3 shadow-sm">
            <div className="text-primary mb-2">{item.icon}</div>
            <Card.Text>{item.text}</Card.Text>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>

  {/* How It Works */}
  <div className="bg-light py-5">
    <Container>
      <h2 className="text-center mb-4">How It Works</h2>
      <Row className="text-center g-4">
        {[
          "Add Your Business Info",
          "Add Products Once",
          "Create Bills Instantly",
          "Download or Print with One Click"
        ].map((step, index) => (
          <Col md={3} key={index}>
            <Card className="h-100 p-3 shadow-sm">
              <h4 className="text-primary">Step {index + 1}</h4>
              <p>{step}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </div>

  {/* Screenshots Section */}
  <Container className="py-5">
    <h2 className="text-center mb-4">Quick Glimpse</h2>
    <Row className="g-4">
      {["Products", "Create Bill", "History"].map((title, i) => (
        <Col md={4} key={i}>
          <Card className="h-100 p-3 shadow-sm text-center">
            <div className="bg-secondary text-white py-5 rounded">Screenshot Placeholder</div>
            <Card.Body>
              <Card.Title>{title} Page</Card.Title>
              <Card.Text>Take control of your {title.toLowerCase()}.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>

  {/* Contact / Footer */}
  <div className="bg-dark text-white text-center py-4">
    <Container>
      <p className="mb-1">Have questions? Contact us at quickbills@gmail.com</p>
      <small>&copy; {new Date().getFullYear()} QuickBills. All rights reserved.</small>
    </Container>
  </div>
</div>

); }

export default Home;

