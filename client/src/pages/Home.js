import { Card, Col, Container, Image, Row } from "react-bootstrap";
import logo from "../assets/logo_zahir.png";
import home_img1 from "../assets/home_img1.png";
import Header from "../component/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container id="home-container" fluid>
        <div id="home-logo">
          <div id="home-logo-text">
            <h2>One App</h2>
            <h2 style={{ fontWeight: "400", fontStyle: "italic" }}>
              {""}, For Your Businesses
            </h2>
          </div>
          <Image src={logo} alt="logo" fluid />
        </div>
        <div id="home-content1" className="p-2">
          <Row>
            <Col>
              <Image id="home-content1-img" src={home_img1} fluid />
            </Col>
            <Col id="home-content1-col1">
              <h4 className="fw-bold mb-4" style={{ color: "#394d6f" }}>
                Transform Your Business With Zahir Online
              </h4>
              <Row>
                <Col id="home-content1-col2">
                  <Card className="p-2">
                    <Card.Title
                      className="text-center fw-bold"
                      style={{ color: "#20BF6B" }}
                    >
                      With Zahir
                    </Card.Title>
                    <Card.Text>More instant business transactions</Card.Text>
                    <Card.Text>Easily accessible on all devices</Card.Text>
                    <Card.Text>Record finances much more efficiently</Card.Text>
                    <Card.Text>Control of goods with minimal risk</Card.Text>
                    <Card.Text>Integrated branch management solution</Card.Text>
                  </Card>
                </Col>
                <Col id="home-content1-col3">
                  <Card className="p-2">
                    <Card.Title
                      className="text-center fw-bold"
                      style={{ color: "#E95043" }}
                    >
                      Without Zahir
                    </Card.Title>
                    <Card.Text>Step by step transaction process</Card.Text>
                    <Card.Text>Access still needs to send data</Card.Text>
                    <Card.Text>
                      Keeping track of finances is time consuming
                    </Card.Text>
                    <Card.Text>Mistakes often occur</Card.Text>
                    <Card.Text>Manage branches with extra work</Card.Text>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
