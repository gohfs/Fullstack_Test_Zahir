import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import Logo from "../assets/logo_zahir.png";
import { API } from "../config/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSingUp = useMutation(async (e) => {
    try {
      e.preventDefault();

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const body = JSON.stringify(form);

      const response = await API.post("/registrations", body);
      console.log(response);
      if (response.status === 200) {
        MySwal.fire({
          icon: "success",
          title: "Registration Success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Registration Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(form);
  });

  return (
    <>
      <Container id="auth-container" fluid>
        <Card id="auth-card">
          <Card.Img src={Logo} id="auth-img" />
          <Card.Body>
            <Card.Header id="auth-card-header">Sign Up</Card.Header>
            <Card.Text id="auth-card-text">
              Create your Free for 30 days! Full access, no payment required.
            </Card.Text>
            <Form id="auth-form" onSubmit={(e) => onSingUp.mutate(e)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={onChange}
                  value={form.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={onChange}
                  value={form.email}
                />
                <Form.Text className="text-muted">
                  Your Email is Secure wih Us!
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                  value={form.password}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCompanyName">
                <Form.Control
                  name="company_name"
                  type="text"
                  placeholder="Company Name"
                  onChange={onChange}
                  value={form.company_name}
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: "3rem" }}>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ width: "100%" }}
                >
                  Create Account
                </Button>
                <Form.Text className="text-muted">
                  Already Have an Account?
                  <Link style={{ textDecoration: "none" }} to={"/sign-in"}>
                    {" "}
                    Sign In!
                  </Link>
                </Form.Text>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
