import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Grid } from "@material-ui/core";
import Navbar from "../../Components/Navbar";

function Subjects() {
  const [cards, setCards] = useState([]); // Array of cards
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    // Simulating API call to fetch initial set of cards
    fetchCards();
  }, []);

  useEffect(() => {
    // Add event listener to detect scroll position
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchCards = () => {
    // Simulating API call to fetch more cards
    // Append the new cards to the existing card array
    setIsLoading(true);
    setTimeout(() => {
      const newCards = [...cards, ...getNewCards()];
      setCards(newCards);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    // Check if the user has reached the bottom of the scrollable area
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchCards();
    }
  };

  const getNewCards = () => {
    // Simulating fetching new cards
    // You can replace this with your own logic or API call
    const newCards = [];
    for (let i = 0; i < 10; i++) {
      newCards.push(<div className="card">Card {cards.length + i + 1}</div>);
    }
    return newCards;
  };

  return (
    <>
      <Navbar />
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {cards.map((card, index) => (
          <div key={index} className="card">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://img.gamedistribution.com/8e5e5f3b0e2b455fa4bcd53ddcf90fd0-512x512.jpeg"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
        {isLoading && <div className="loading">Loading...</div>}
      </Grid>
    </>
  );
}

export default Subjects;
