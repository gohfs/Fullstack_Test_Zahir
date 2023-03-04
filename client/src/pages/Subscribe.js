import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../component/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Subscribe() {
  let { id } = useParams();
  let navigate = useNavigate();
  let { data: subscribe } = useQuery("subscribe", async () => {
    const response = await API.get("/variants");
    return response.data.data;
  });
  console.log(subscribe);

  //   useEffect(() => {
  //     refetch();
  //   }, []);

  let [form, setForm] = useState({
    company_name: "",
    variant_id: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubscribe = useMutation(async (e) => {
    try {
      e.preventDefault();

      // const config = {
      //   headers: {
      //     Authorization: "Basic " + localStorage.token,
      //     "Content-Type": "application/json",
      //   },
      // };

      const data = {
        company_name: form.company_name,
        variant_id: parseInt(form.variant_id),
      };

      const response = await API.post("/subscribes", data);
      console.log(response);
      if (response.status === 200) {
        MySwal.fire({
          icon: "success",
          title: "Subscription Success",
          showConfirmButton: false,
          timer: 2000,
        });
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
      <Header />
      <Container id="subscribe-container" fluid>
        <div id="subscribe-logo">
          <div id="subscribe-logo-text" className="mb-4">
            <h2>The Best Accounting Software Is Now in Your Hand.</h2>
          </div>
        </div>
        <div id="subscribe-content1" className="px-5">
          <Row>
            <div id="subscribe-header-text">
              <p className="mb-4">
                Try it now and get all the features for free
              </p>
              <h4 className="mb-4">Zahir Price List Online</h4>
            </div>
            <Form onSubmit={(e) => onSubscribe.mutate(e)}>
              <Form.Label>Register Your Company Here...</Form.Label>
              <Form.Control
                className="mb-3"
                name="company_name"
                type="text"
                placeholder="Company Name"
                onChange={onChange}
                value={form.company_name}
              />
              <Form.Control
                className="mb-3"
                key={"variant_id"}
                onChange={onChange}
                value={form.variant_id}
                name="variant_id"
                type="text"
                placeholder="Type Your Package Here..."
              />
              <Button
                type="submit"
                //  id="subscribe-button"
                style={{
                  backgroundColor: "#20BF6B",
                  fontFamily: "sans-serif",
                  border: "transparent",
                  marginBottom: "2rem",
                }}
              >
                Subscribe
              </Button>
            </Form>
            <Col>
              <Row>
                {subscribe?.map((items, index) => (
                  <Col>
                    <Card
                      className="p-2 shadow rounded-4"
                      id="subscribe-content1-col1"
                      key={items?.id}
                      onChange={onChange}
                      value={form.variant_id}
                      name="variant_id"
                    >
                      {items?.id}
                      <Card.Title
                        className="text-center fw-bold fs-3 mt-3"
                        style={{ color: "#394d6f" }}
                      >
                        {items?.name}
                      </Card.Title>
                      <Card.Title className="d-flex justify-content-center">
                        IDR.{" "}
                        <Card.Title
                          className="ms-1 fw-bold fs-3"
                          style={{ color: "#0f7aae" }}
                        >
                          {" "}
                          {items?.price.toLocaleString()},00
                        </Card.Title>
                      </Card.Title>
                      <Card.Text className="ms-2">
                        {items?.description}
                      </Card.Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
