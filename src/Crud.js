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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "bootstrap";

const CRUD = () => {
  const empdata = [
    //sters
    {
      id: 1,
      firstName: "Emily",
      lastName: "Johnson",
      age: 28,
      isStudent: 1,
    },
    {
      id: 2,
      firstName: "Marcus",
      lastName: "Lee",
      age: 33,
      isStudent: 0,
    },
    {
      id: 3,
      firstName: "Isabella",
      lastName: "Rodriguez",
      age: 21,
      isStudent: 1,
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
    setData(empdata);
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

  function isNumber(value) {
    return !isNaN(value);
  }

  function hasSpecialCharacters(str) {
    const regex = /[!@#$%^&*(),.?":{}|<>_+=;'/]/g;
    return regex.test(str) || /^-+$/.test(str);
  }

  function valueContainsWhiteSpaces(value) {
    if (value.includes(" ")) {
      return false; // Name contains numbers or special characters
    }
    return true; // Name is valid
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
    else if (isNumber(firstName) || isNumber(lastName))
      alert("Names can not be numbers");
    else if (
      valueContainsWhiteSpaces(firstName) === false ||
      valueContainsWhiteSpaces(lastName) === false ||
      valueContainsWhiteSpaces(age) === false
    )
      alert("Name is not a correct value");
    else if (isInputOnlyNumbers(age) === false) alert("Age is not a number");
    else if (age < 16 || age > 100) alert("Age should be between 16 and 100");
    else if (age.indexOf(".") !== -1)
      alert("Age is accepted only as an integer!");
    else {
      axios.post(url, newData).then((result) => {
        toast.success("Student successfully added.")
        //getData();
      }).catch((error) => {
        toast.error(error);
      });

      setFirstName("");
      setLastName("");
      setAge("");
      setIsStudent(false);
    }
  };

  const getData = () => {
    axios
      .get(`url`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleEdit = (id) => {
    
    handleShow();
    axios
      .get(`url/${id}`)
      .then((result) => {
        setEditFirstName(result.data.firstName);
        setEditFirstName(result.data.lastName);
        setEditFirstName(result.data.age);
        setEditFirstName(result.data.isStudent);
        setEditID(id);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleUpdate = () => {
    const url = ``;

    const newData = {
      "firstName": editFirstName,
      "lastName": editLastName,
      "age": editAge,
      "isStudent": editIsStudent,
    };

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
    else if (isNumber(editFirstName) || isNumber(editLastName))
      alert("Names can not be numbers");
    else if (
      valueContainsWhiteSpaces(editFirstName) === false ||
      valueContainsWhiteSpaces(editLastName) === false ||
      valueContainsWhiteSpaces(age) === false
    )
      alert("One of the input contains white spaces whith text");
    else if (isInputOnlyNumbers(editAge) === false)
      alert("Age is not a number");
    else if (editAge <= 0 || editAge > 150) alert("Age is not a correct value");
    else if (editAge.indexOf(".") !== -1)
      alert("Age is accepted only as an integer!");
    else {
      axios
        .put(url, newData)
        .then(() => {
          toast.success("Student successfully updated.");
          getData();
          //handleClose();
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`url/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Student has been delete.")
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <>
      <Fragment>
      <ToastContainer />
        <h1>Students</h1>
        <div className="divFN">First name</div>
        <div className="divLN">Last name</div>
        <div className="divAge">Age</div>
        <Container>
          <Row>
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
                className="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
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
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
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
            <Modal.Title>Edit student data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
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
                  className="editLastName"
                  type="text"
                  placeholder="Last Name"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
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
