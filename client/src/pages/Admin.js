import { Col, Container, Image, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";

import home_img1 from "../assets/home_img1.png";
import Header from "../component/Header";
import { API } from "../config/api";
import moment from "moment";

export default function Admin() {
  let { data: companies } = useQuery("companies", async () => {
    const response = await API.get("/companies");
    return response.data.data;
  });
  console.log(companies);

  // const formatDate = (datetime) => {
  //   if (!datetime) return "";
  //   return date.toLocaleString();
  // };
  // const date = new Date(companies?.);

  const start = moment().format("YYYY-MM-DD");
  const end = moment().format("YYYY-MM-DD");
  // const formattedDate = moment(date).format("YYYY-MM-DD");

  return (
    <>
      <Header />
      <Container id="home-container" fluid>
        <div id="home-logo">
          <div id="home-logo-text">
            <h2>WELCOME ADMIN</h2>
          </div>
        </div>
        <div id="home-content1" className="p-2">
          <Row>
            <Col id="home-content1-col1">
              <h4 className="fw-bold mb-4" style={{ color: "#394d6f" }}>
                Companies that have been Subscribed
              </h4>
              <Col id="home-content1-col2">
                <Table striped="columns">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Subscription Start</th>
                      <th>Subscription End</th>
                      <th>Package ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  {companies?.map((items) => (
                    <tbody>
                      <tr>
                        <td>{items?.id}</td>
                        <td>{items?.user_id}</td>
                        <td>{items?.name}</td>
                        <td>
                          {moment(items?.Start_Date).format("YYYY-MM-DD")}
                        </td>
                        <td>
                          {moment(items?.Expired_Date).format("YYYY-MM-DD")}
                        </td>
                        <td>{items?.variant_id}</td>
                        <td>{items?.status}</td>
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </Col>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
