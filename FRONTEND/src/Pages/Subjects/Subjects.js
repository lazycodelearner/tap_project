import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../../Components/Navbar";
import SubjectsList from "../../Components/SubjectsList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Subjects() {
  const [data, setData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const [subjectName, setsubjectName] = useState("");
  const [mark, setMark] = useState("");
  const [Budget, setBudget] = useState("NO");

  const [editID, setEditID] = useState("");
  const [editSubjectName, setEditSubjectName] = useState("");
  const [editMark, setEditMark] = useState("");

  const getData = () => {
    axios
      .get(`https://localhost:7151/api/Subject`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  const getStudentData = () => {
    axios
      .get(`https://localhost:7151/api/Student/GetStudent`)
      .then((result) => {
        setStudentData(result.data);
      })
      .catch((error) => {
        toast.error(error.toString());
      });
  };

  useEffect(() => {
    getData();
    getStudentData();
  }, []);

  return (
    <>
      <Fragment>
        <ToastContainer />

        <Navbar text={studentData.lastName + studentData.firstName} />
        <SubjectsList></SubjectsList>
      </Fragment>
    </>
  );
}

export default Subjects;
