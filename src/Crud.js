import React, { useState, useEffect, Fragment } from "react";
import "./Crud.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import Form from "react-bootstrap/Form";

const CRUD = () => {
  const empdata = [
    //sters
    {
      id: 1,
      firstName: "Manij",
      lastName: "Manij",
      age: 34,
      isStudent: 1,
    },
    {
      id: 2,
      firstName: "Pi",
      lastName: "Manij",
      age: 23,
      isStudent: 1,
    },
    {
      id: 3,
      firstName: "Jafar",
      lastName: "Manij",
      age: 55,
      isStudent: 0,
    },
  ];

  const [data, setData] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [isStudent, setIsStudent] = useState(0);

  const [editID, setEditID] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editIsStudent, setEditIsStudent] = useState(0);

  useEffect(() => {
    setData(empdata); //probabil sters
    //getData();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditFirstName("");
    setEditLastName("");
    setEditAge("");
    setEditIsStudent(false);
  };
  const handleShow = () => setShow(true);

  const setHandleIsStudent = (e) => {
    if (e.target.checked) {
      setIsStudent(1);
    } else {
      setIsStudent(0);
    }
  };
  const setEditHandleIsStudent = (e) => {
    if (e.target.checked) {
      setEditIsStudent(1);
    } else {
      setEditIsStudent(0);
    }
  };

  function isInputBlank(inputValue) {
    return inputValue.trim() === "";
  }

  function isInputOnlyNumbers(inputValue) {
    return !isNaN(inputValue) && !isNaN(parseFloat(inputValue));
  }

  function hasSpecialCharacters(str) {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    return regex.test(str);
  }

  const handleCreate = () => {
    const url = "url";
    const newData = {
      id: data[data.length - 1].id + 1, // trebuie sters
      firstName: firstName,
      lastName: lastName,
      age: age,
      isStudent: isStudent,
    };
    if (isInputBlank(firstName) || isInputBlank(lastName) || isInputBlank(age))
      alert("One of the input is consist only from white spaces!");
    else if (hasSpecialCharacters(firstName) || hasSpecialCharacters(lastName))
      alert("First name or last name has special characters.");
    else if (isInputOnlyNumbers(age) === false) alert("Age is not a number");
    else if (age <= 0 || age > 150) alert("Age is not a correct value");
    else if (age.indexOf(".") !== -1)
      alert("Age is accepted only as an integer!");
    else setData([...data, newData]); //sters

    axios.post(url, data).then((result) => {
      setData([...data, newData]); //sters
      //getData();
    });
  };

  const getData = () => {
    axios
      .get("url")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = () => {
    handleShow();
  };

  const handleUpdate = () => {
    // const newData = {
    //   editFirstName: editFirstName,
    //   editLastName: editLastName,
    //   editAge: editAge,
    //   editIsStudent: editIsStudent,
    // };

    if (
      isInputBlank(editFirstName) ||
      isInputBlank(editLastName) ||
      isInputBlank(editAge)
    )
      alert("One of the input is consist only from white spaces!");
    else if (
      hasSpecialCharacters(editFirstName) ||
      hasSpecialCharacters(editLastName)
    )
      alert("First name or last name has special characters.");
    else if (isInputOnlyNumbers(editAge) === false)
      alert("Age is not a number");
    else if (editAge <= 0 || editAge > 150) alert("Age is not a correct value");
    else if (editAge.indexOf(".") !== -1)
      alert("Age is accepted only as an integer!");
    else {
      

      //setData([...data, newData]); //sters
      //handleClose();
    }
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <>
      <Fragment>
        <Container>
          <Row>
            <Col>
              <Form.Control
                className="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                className="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                className="age"
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      className="isStudent"
                      type={type}
                      id={`default-${type}`}
                      label={`Is Student`}
                      checked={isStudent === 1 ? true : false}
                      onChange={(e) => setHandleIsStudent(e)}
                      value={isStudent}
                    />
                  </div>
                ))}
              </Form>
            </Col>
            <Col>
              <Button
                variant="success"
                className="addButton"
                onClick={() => handleCreate()}
              >
                Add New Student
              </Button>{" "}
            </Col>
          </Row>
        </Container>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>LAST NAME</th>
              <th>FIRST NAME</th>
              <th>AGE</th>
              <th>IS STUDENT</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.lastName}</td>
                  <td>{item.firstName}</td>
                  <td>{item.age}</td>
                  <td>{item.isStudent}</td>
                  <td colSpan={2}>
                    <Button
                      className="btnEdit"
                      variant="primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      className="btnDelete"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <input
                  className="editLastName"
                  type="text"
                  placeholder="Last Name"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                />
              </Row>
              <Row>
                <input
                  className="editFirstName"
                  type="text"
                  placeholder="First Name"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                />
              </Row>

              <Row>
                <input
                  className="editAge"
                  type="text"
                  placeholder="Age"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </Row>
              <Row>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      className="editCheckbox"
                      type={type}
                      label={`Is Student`}
                      checked={editIsStudent === 1 ? true : false}
                      onChange={(e) => setEditHandleIsStudent(e)}
                      value={editIsStudent}
                    />
                  </div>
                ))}
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </>
  );
};

export default CRUD;
