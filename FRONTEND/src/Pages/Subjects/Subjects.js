import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../../Components/Navbar";
import SubjectsList from "../../Components/SubjectsList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropDownMark from "../../Components/DropDownMark";
import DropDownSubject from "../../Components/DropDownSubject";
import "./Subjects.css";

function Subjects() {
  const [data, setData] = useState([]);
  const [subjectName, setSubjectName] = useState("Subject Name");
  const [Mark, setMark] = useState("Subject Mark");

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(
        `https://localhost:7151/api/Subject/GetSubjectsByStudentId/${location.state.studentId.studentId}`
      )
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const handleCreate = () => {
    const url = "https://localhost:7151/api/Subject/PostSubject";
    const newData = {
      subjectName: subjectName,
      mark: Mark,
      studentId: location.state.studentId.studentId,
    };
    var ok = true;
    data.map((subject, index) => {
      if (subject.subjectName === subjectName) ok = false;
      return 0;
    });

    if (ok === false) alert("Subject already exist in database");
    else if (Mark === "Subject Mark" || subjectName === "Subject Name")
      alert("Subject Name not choosed or Mark not choosed");
    else {
      axios
        .post(url, newData)
        .then((result) => {
          toast.success("Subject successfully added.");
          getData();
        })
        .catch((error) => {
          toast.error(error.toString());
        });
    }
  };

  const sendDataToParentSubject = (index) => {
    setSubjectName(index);
  };

  const sendDataToParentMark = (index) => {
    setMark(index);
  };

  return (
    <>
      <Fragment>
        <ToastContainer />
        <Navbar
          text={
            location.state.studentFirstName.firstName +
            " " +
            location.state.studentLastName.lastName
          }
        />

        <Container className="container">
          <Row>
            <Col className="subjectColumn">
              <h1 className="h1Label">Subject Name</h1>
              <div className="formDiv">
                <DropDownSubject
                  props={subjectName}
                  sendDataToParentSubject={sendDataToParentSubject}
                ></DropDownSubject>
              </div>
            </Col>
            <Col className="subjectColumn">
              <h1 className="h1Label">Mark</h1>
              <div className="formDiv">
                <DropDownMark
                  props={Mark}
                  sendDataToParentMark={sendDataToParentMark}
                ></DropDownMark>
              </div>
            </Col>
            <Col className="subjectColumn">
              <Button
                variant="success"
                className="addButton"
                onClick={() => handleCreate()}
              >
                Add New Subject
              </Button>
            </Col>
          </Row>
        </Container>

        <SubjectsList
          subjectsData={data}
          getData={getData}
        ></SubjectsList>
      </Fragment>
    </>
  );
}

export default Subjects;
