import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Subscribe({ modal, setModal }) {
  return (
    <Modal
      show={modal}
      onHide={() => setModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          This is The great step for your future...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Choose your Package</h4>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "#20BF6B",
            fontFamily: "sans-serif",
            border: "transparent",
          }}
          onClick={() => setModal(false)}
        >
          Subscribe
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
