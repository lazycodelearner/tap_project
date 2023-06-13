import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import { useState } from "react";

function DropDownMark({ props, sendDataToParentMark }) {
  const [mark, setMark] = useState(props);

  return (
    <Dropdown as={ButtonGroup} drop="down-centered">
      <Form.Control
        className="dropDownMarkForm"
        type="text"
        value={mark}
        disabled
      ></Form.Control>

      <Dropdown.Toggle split variant="dark" id="dropdown-split-basic1" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setMark("Subject Mark")}>
          Subject Mark
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(0);
            sendDataToParentMark(0);
          }}
        >
          0
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(1);
            sendDataToParentMark(1);
          }}
        >
          1
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(2);
            sendDataToParentMark(2);
          }}
        >
          2
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(3);
            sendDataToParentMark(3);
          }}
        >
          3
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(4);
            sendDataToParentMark(4);
          }}
        >
          4
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(5);
            sendDataToParentMark(5);
          }}
        >
          5
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(6);
            sendDataToParentMark(6);
          }}
        >
          6
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(7);
            sendDataToParentMark(7);
          }}
        >
          7
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(8);
            sendDataToParentMark(8);
          }}
        >
          8
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(9);
            sendDataToParentMark(9);
          }}
        >
          9
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMark(10);
            sendDataToParentMark(10);
          }}
        >
          10
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownMark;
