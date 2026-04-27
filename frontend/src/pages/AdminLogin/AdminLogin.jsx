import { Header } from "../../widgets/header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import styles from "./AdminLogin.module.scss";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      navigate("/admin/pages");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className={styles.pages}>
      <Header />

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh", color: "white" }}
      >
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={4}>
            <h1 className="text-center mb-4">ADMIN LOGIN</h1>
            <Card
              className="shadow-lg"
              style={{
                backgroundColor: "#29436B",
                border: "1px solid white",
                color: "white",
              }}
            >
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <img
                    src="../../assets/image/admin_login.png"
                    alt="Admin Login"
                    style={{ width: "80px" }}
                  />
                </div>
                <hr style={{ backgroundColor: "#D9D9D9" }} />
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Control
                      type="text"
                      name="Username"
                      id="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Control
                      type="password"
                      name="Password"
                      id="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "#51A841",
                        width: "150px",
                        border: "1px solid black",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      LOGIN
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
