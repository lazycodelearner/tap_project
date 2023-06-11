import "./Components.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import { useState } from "react";

function DropDownSubject({ props, sendDataToParentSubject }) {
  const [subject, setSubject] = useState(props);
  return (
    <Dropdown as={ButtonGroup} drop="down-centered">
      <Form.Control
        className="dropDownSubjectForm"
        type="text"
        maxLength="50"
        value={subject}
        disabled
      />

      <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Subject Name");
            setSubject("Subject Name");
          }}
        >
          Subject Name
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Introduction to Computer Science");
            setSubject("Introduction to Computer Science");
          }}
        >
          Introduction to Computer Science
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Data Structures and Algorithms");
            setSubject("Data Structures and Algorithms");
          }}
        >
          Data Structures and Algorithms
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Database Systems");
            setSubject("Database Systems");
          }}
        >
          Database Systems
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Operating Systems");
            setSubject("Operating Systems");
          }}
        >
          Operating Systems
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Computer Networks");
            setSubject("Computer Networks");
          }}
        >
          Computer Networks
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Web Development");
            setSubject("Web Development");
          }}
        >
          Web Development
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Artificial Intelligence");
            setSubject("Artificial Intelligence");
          }}
        >
          Artificial Intelligence
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Machine Learning");
            setSubject("Machine Learning");
          }}
        >
          Machine Learning
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Cybersecurity");
            setSubject("Cybersecurity");
          }}
        >
          Cybersecurity
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sendDataToParentSubject("Software Engineering");
            setSubject("Software Engineering");
          }}
        >
          Software Engineering
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownSubject;
