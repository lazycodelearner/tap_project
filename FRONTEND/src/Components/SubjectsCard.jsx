import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDownMark from "./DropDownMark";

const SubjectsCard = ({ id, subjectNameParameter, mark, studentId, getData}) => {
  const [subjectName, setSubjectName] = useState("");
  const [editMark, setEditMark] = useState("");
  const [Mark, setMark] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMark(mark);
    setSubjectName(subjectNameParameter);
  }, [mark, subjectNameParameter]);

  function selectImg(subjectName) {
    switch (subjectName) {
      case "Introduction to Computer Science":
        return "/introcomsci.png";
      case "Data Structures and Algorithms":
        return "/datastrucalg.jpg";
      case "Database Systems":
        return "/database.jpg";
      case "Operating Systems":
        return "/operatingsystems.jpg";
      case "Computer Networks":
        return "/computernetworks.jpg";
      case "Web Development":
        return "/webdevelopment.jpg";
      case "Artificial Intelligence":
        return "/ai.jpg";
      case "Machine Learning":
        return "/machinelearning.jpg";
      case "Cybersecurity":
        return "/cybersecurity.jpeg";
      case "Software Engineering":
        return "/softeng.png";
      default:
        return 0;
    }
  }

  const handleClose = () => {
    setShow(false);
    setMark(editMark);
    setEditMark("");
  };

  const handleEdit = () => {
    setShow(true);
    axios
      .get(`https://localhost:7151/api/Subject/GetSubject/${id}`)
      .then((result) => {
        setEditMark(result.data.mark);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const handleUpdate = () => {
    const url = `https://localhost:7151/api/Subject/PutSubject/${id}`;
    const newData = {
      subjectId: id,
      subjectName: subjectName,
      mark: editMark,
      studentId: studentId,
    };

    if ({ Mark } < 0 || { Mark } > 10)
      alert("Mark should be in interval [0,10]");
    else {
      axios
        .put(url, newData)
        .then(() => {
          toast.success("Subject successfully updated.");
          handleClose();
        })
        .catch((error) => {
          toast.error(error.toString());
        });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      axios
        .delete(`https://localhost:7151/api/Subject/DeleteSubject/${id}`)
        .then(() => {
          toast.success("Subject has been delete.");
          getData();
        })
        .catch((error) => {
          toast.error(error.toString());
        });
    }
  };

  const sendDataToParentMark = (index) => {
    setEditMark(index);
  };

  return (
    <>
      <div className="SubjectsCardDiv">
        <ToastContainer />
        <Card>
          <Card.Img
            className="mx-auto"
            variant="center"
            src={selectImg(subjectName)}
            alt={"image " + subjectName}
          />
          <Card.Body>
            <Card.Title>
              <p>Subject name:</p>
              <p> {subjectName}</p>
            </Card.Title>
            <Card.Text>
              <h3>Mark: {Mark}</h3>
            </Card.Text>
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
            &nbsp;
            <Button variant="danger" onClick={handleDelete}>
              Delete Subject
            </Button>
          </Card.Body>
        </Card>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit subject data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <DropDownMark
                props={Mark}
                sendDataToParentMark={sendDataToParentMark}
              ></DropDownMark>
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
    </>
  );
};

export default SubjectsCard;
