import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsGithub, BsLinkedin, BsEnvelopeFill } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import myImage from "../Assets/Image/about-us2.PNG";
import "../Style/about.css";
import SEO from "../Components/SEO";
import Footer from "../Components/Footer";

function About() {
  return (
    <>  
    <div className="about-me-section">
      <SEO
        title="QuickBills | About the Developer"
        description="Learn more about Akshat Gupta, the passionate Full-Stack Developer behind QuickBills. Explore his journey, skills, and contact information."
        url="https://quickbills-ak.vercel.app/about"
        image="https://quickbills-ak.vercel.app/preview.png"
        pageType="ProfilePage"
      />

      <Container>
        <Row className="align-items-center">
          <Col md={5} className="mb-4 mb-md-0 text-center">
            <img
              src={myImage}
              alt="Developer"
              className="img-fluid rounded-circle"
              style={{
                width: "250px",
                height: "250px",
                objectFit: "cover",
                objectPosition: "top"
              }}
            />
          </Col>

          <Col md={7}>
            <h2 className="fw-bold mb-3">Hello, I'm Akshat Gupta 👋</h2>

            <div className="quote-box mt-4">
              <i className="bi bi-quote quote-icon"></i>
              <p className="quote-text">
                I'm a passionate Full-Stack Developer specializing in building clean,
                modern web applications using the MERN stack. I love solving real-world
                problems and turning ideas into working products. From authentication
                systems to intuitive dashboards, I enjoy crafting both frontend and backend.
              </p>
            </div>

            <div className="d-flex my-3 flex-wrap justify-content-between">
              <a
                href="https://www.linkedin.com/in/akshat-gupta1506?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-primary" size="sm">
                  <BsLinkedin className="me-2" />
                  LinkedIn
                </Button>
              </a>

              <a
                href="https://github.com/AkshatG589/quickbill"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-dark" size="sm">
                  <BsGithub className="me-2" />
                  GitHub
                </Button>
              </a>

              <a
                href="https://leetcode.com/u/akshatg_123/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-warning text-dark" size="sm">
                  <SiLeetcode className="me-2" />
                  LeetCode
                </Button>
              </a>
            </div>

            <div className="text-center mt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  (window.location.href = "mailto:akshatg1562004@gmail.com")
                }
              >
                <BsEnvelopeFill className="me-2" />
                Connect with Developer
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer />
    </>
  );
}

export default About;