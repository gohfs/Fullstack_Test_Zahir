import React, { useContext, useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo_zahir.png";
import { UserContext } from "../context/userContext";
import Subscribe from "./Subscribe";

export default function Header() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [modal, setModal] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const Logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/sign-in");
  };

  return (
    <>
      <Navbar
        className="fixed-top"
        expand="lg"
        style={{ backgroundColor: "white" }}
      >
        <Container>
          <Navbar.Brand href="/home">
            <Image src={logo} fluid width={"150rem"} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" />
          <Nav className="me-3" style={{ fontFamily: "sans-serif" }}>
            {state.user.role === "user" ? (
              <Navbar.Text className="d-flex-row">
                <h5>Hi, {state.user.name}</h5>
              </Navbar.Text>
            ) : (
              <Navbar.Text className="d-flex-row">
                <h5>Hi, {state.user.name}</h5>
              </Navbar.Text>
            )}
          </Nav>
          {state.user.role === "user" ? (
            <Button
              className="me-2"
              id="nav"
              style={{
                backgroundColor: "#20BF6B",
                fontFamily: "sans-serif",
                border: "transparent",
              }}
              onClick={() => {
                navigate("/subscribe");
              }}
            >
              Subscribe
            </Button>
          ) : (
            <></>
          )}
          <Button
            id="nav"
            style={{
              backgroundColor: "#20BF6B",
              fontFamily: "sans-serif",
              border: "transparent",
            }}
            onClick={Logout}
          >
            Logout
          </Button>
        </Container>
      </Navbar>
      <Subscribe modal={modal} setModal={setModal} />
    </>
  );
}
