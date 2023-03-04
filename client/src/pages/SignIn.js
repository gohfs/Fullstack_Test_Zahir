import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/logo_zahir.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const MySwal = withReactContent(Swal);

export default function SignIn() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // CHECK USER
  const checkUser = localStorage.getItem("user");
  const onSingIn = useMutation(async (e) => {
    try {
      e.preventDefault();

      // const config = {
      //   headers: {
      //     Authorization: "Basic " + localStorage.token,
      //     "Content-Type": "application/json",
      //   },
      // };
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const body = form;

      const response = await API.post("/login", body);
      console.log(response);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });
      MySwal.fire({
        icon: "success",
        title: "Signed-In",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/home");

      if (response.data.data.role === "admin") {
        MySwal.fire({
          icon: "success",
          title: "Welcome Admin",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/admin");
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Failed",
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
            <Card.Header id="auth-card-header">Sign In</Card.Header>
            <Card.Text id="auth-card-text">
              Sign into your Zahir Account
            </Card.Text>
            <Form id="auth-form" onSubmit={(e) => onSingIn.mutate(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: "3rem" }}>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ width: "100%" }}
                >
                  Sign In
                </Button>
                <Form.Text className="text-muted">
                  Don't Have an Account?
                  <Link style={{ textDecoration: "none" }} to={"/"}>
                    {" "}
                    Sign Up!
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
