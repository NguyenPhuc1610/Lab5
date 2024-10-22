import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentView.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
} from "react-bootstrap";   

function StudentView({
  students,
  newStudent,
  totalSelected,
  handleInputChange,
  addStudent,
  deleteStudent,
  handleCheckboxChange,
  clearAll,
}) {
  const [show, setShow] = useState(false); // State để quản lý modal

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from submitting if inputs are invalid
    addStudent();
    handleClose(); // Đóng modal sau khi thêm sinh viên
  };

  return (
    <Container>
      <h1>Student Management</h1>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow}>
            Add Student
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Student Code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={newStudent.code}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Still Active"
                checked={newStudent.status === "Active"}
                onChange={(event) =>
                  handleInputChange({
                    target: { name: "status", value: event.target.checked ? "Active" : "Inactive" },
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col>
          <div>Total Selected Student: {totalSelected}</div>
          <Button variant="secondary" onClick={clearAll}>
            Clear
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Student Name</th>
                <th>Student Code</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      checked={student.selected || false}
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.code}</td>
                  <td>
                    {student.status === "Active" ? (
                      <Button variant="primary" className="status-btn" disabled>
                        Active
                      </Button>
                    ) : (
                      <Button variant="danger" className="status-btn" disabled>
                        Inactive
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteStudent(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentView;
