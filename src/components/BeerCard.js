import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./BeerCard.css"

export const BeerCard = ({beer}) => {
    return (
        <Card>
            <Card.Header className="py-2 bg-dark text-light fs-5 text-center">{beer.name}</Card.Header>
            <Card.Body>
                <Card.Subtitle className="text-muted">{beer.tagline}</Card.Subtitle>
                <Card.Text>First Brewed: {beer.first_brewed}</Card.Text>
                <Card.Text>Description: {beer.description}</Card.Text>
                <Card.Text>ABV: {beer.abv}%</Card.Text>
                <ListGroup className="list-group-flush">
                    <Card.Text>Food Pairing:</Card.Text>
                    {beer.food_pairing.map(pairing => <ListGroup.Item key={Math.random() * 100000}>{pairing}</ListGroup.Item>)}
                </ListGroup> 
            </Card.Body>
                       

        </Card>
        
    )

}
