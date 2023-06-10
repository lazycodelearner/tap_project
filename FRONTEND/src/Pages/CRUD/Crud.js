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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";

function CRUD() {
  const [data, setData] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [Budget, setBudget] = useState("NO");

  const [editID, setEditID] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editBudget, setEditBudget] = useState("NO");

  useEffect(() => {
    getData();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditFirstName("");
    setEditLastName("");
    setEditAge("");
    setEditBudget("NO");
  };
  const handleShow = () => setShow(true);

  const setHandleBudget = (e) => {
    if (e.target.checked) {
      setBudget("YES");
    } else {
      setBudget("NO");
    }
  };

  const setEditHandleBudget = (e) => {
    if (e.target.checked) {
      setEditBudget("YES");
    } else {
      setEditBudget("NO");
    }
  };

  function isInputBlank(inputValue) {
    return inputValue.toString().trim() === "";
  }

  function isInputOnlyNumbers(inputValue) {
    return !isNaN(inputValue) && !isNaN(parseFloat(inputValue));
  }

  function isNumber(value) {
    return !isNaN(value);
  }

  function nameContainsNumbers(text) {
    return /\d/.test(text);
  }

  function hasSpecialCharacters(str) {
    const regex = /[!@#$%^&*(),.?":{}|<>_+=;'/]/g;
    return regex.test(str) || /^-+$/.test(str.toString());
  }

  function valueContainsWhiteSpaces(value) {
    if (value.toString().includes(" ")) {
      return false; // Name contains numbers or special characters
    }
    return true; // Name is valid
  }

  const handleCreate = () => {
    const url = "https://localhost:7151/api/Student/PostStudent/";
    const newData1 = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      budget: Budget,
    };

    if (isInputBlank(firstName) || isInputBlank(lastName) || isInputBlank(age))
      alert("One of the input is consist only from white spaces!");
    else if (hasSpecialCharacters(firstName) || hasSpecialCharacters(lastName))
      alert("First name or last name has special characters.");
    else if (isNumber(firstName) || isNumber(lastName))
      alert("Names can not be numbers");
    else if (nameContainsNumbers(firstName) || nameContainsNumbers(lastName))
      alert("Names can not contain numbers");
    else if (
      valueContainsWhiteSpaces(firstName) === false ||
      valueContainsWhiteSpaces(lastName) === false ||
      valueContainsWhiteSpaces(age) === false
    )
      alert("Name is not a correct value");
    else if (isInputOnlyNumbers(age) === false) alert("Age is not a number");
    else if (age < 16 || age > 100) alert("Age should be between 16 and 100");
    else if (age.toString().indexOf(".") !== -1)
      alert("Age is accepted only as an integer!");
    else {
      axios
        .post(url, newData1)
        .then((result) => {
          toast.success("Student successfully added.");
          getData();
        })
        .catch((error) => {
          toast.error(error.toString());
        });
      setFirstName("");
      setLastName("");
      setAge("");
      setBudget("NO");
    }
  };

  const getData = () => {
    axios
      .get(`https://localhost:7151/api/Student/GetStudent`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7151/api/Student/GetStudent/${id}`)
      .then((result) => {
        setEditFirstName(result.data.firstName);
        setEditLastName(result.data.lastName);
        setEditAge(result.data.age);
        setEditBudget(result.data.budget);
        setEditID(id);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const handleUpdate = () => {
    const url = `https://localhost:7151/api/Student/PutStudent/${editID}`;
    const newData = {
      studentId: editID,
      firstName: editFirstName,
      lastName: editLastName,
      age: editAge,
      budget: editBudget,
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
      nameContainsNumbers(editFirstName) ||
      nameContainsNumbers(editLastName)
    )
      alert("Names can not contain numbers");
    else if (
      valueContainsWhiteSpaces(editFirstName) === false ||
      valueContainsWhiteSpaces(editLastName) === false ||
      valueContainsWhiteSpaces(age) === false
    )
      alert("One of the input contains white spaces whith text");
    else if (isInputOnlyNumbers(editAge) === false)
      alert("Age is not a number");
    else if (editAge <= 0 || editAge > 100) alert("Age is not a correct value");
    else if (editAge.toString().indexOf(".") !== -1)
      alert("Age is accepted only as an integer!");
    else {
      axios
        .put(url, newData)
        .then(() => {
          toast.success("Student successfully updated.");
          getData();
          handleClose();
        })
        .catch((error) => {
          toast.error(error.toString());
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`https://localhost:7151/api/Student/DeleteEmployee/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Student has been delete.");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error.toString());
        });
    }
  };

  return (
    <>
      <Fragment>
        <ToastContainer />
        <Navbar text="Students"></Navbar>
        <Container>
          <Row>
            <Col>
              <h1 className="h1Label">First name</h1>
              <Form.Control
                className="inputName"
                type="text"
                id="first_name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col>
              <h1 className="h1Label">Last name</h1>
              <Form.Control
                className="inputName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
            <Col>
              <h1 className="h1Label">Age</h1>
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
                <h1 className="h1Label">Budget</h1>
                <Form.Check
                  className="isBudget"
                  checked={Budget === "YES" ? true : false}
                  onChange={(e) => setHandleBudget(e)}
                />
              </Form>
            </Col>
            <Col>
              <Button
                variant="success"
                className="addButton"
                onClick={() => handleCreate()}
              >
                Add New Student
              </Button>
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
              <th>BUDGET</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.studentId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>{item.budget}</td>
                  <td colSpan={3}>
                    <Button variant="warning">
                      <Link to="/Subjects">Subjects</Link>
                    </Button>
                    &nbsp;
                    <Button
                      className="btnEdit"
                      variant="primary"
                      onClick={() => handleEdit(item.studentId)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      className="btnDelete"
                      variant="danger"
                      onClick={() => handleDelete(item.studentId)}
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
                  className="editInput"
                  type="text"
                  placeholder="First Name"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                />
              </Row>
              <Row>
                <input
                  className="editInput"
                  type="text"
                  placeholder="Last Name"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                />
              </Row>
              <Row>
                <input
                  className="editInput"
                  type="text"
                  placeholder="Age"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </Row>
              <Row>
                <Form.Check
                  className="editCheckbox"
                  label={`Budget`}
                  style={{ color: "white" }}
                  checked={editBudget === "YES" ? true : false}
                  onChange={(e) => setEditHandleBudget(e)}
                />
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
}

export default CRUD;
