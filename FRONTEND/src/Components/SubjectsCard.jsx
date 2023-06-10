import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SubjectsCard() {
  return (
    <Card style={{ width: "300px" }}>
      <Card.Img
        variant="top"
        src="https://img.gamedistribution.com/8e5e5f3b0e2b455fa4bcd53ddcf90fd0-512x512.jpeg"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default SubjectsCard;
