import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup"

export const BeerCard = ({beer}) => {
    return (
        <Card>
            <Card.Header className="text-center my-1 bg-info p-2 text-light">{beer.name}</Card.Header>
            <Card.Subtitle>{beer.tagline}</Card.Subtitle>
            <Card.Text>First Brewed: {beer.first_brewed}</Card.Text>
            <Card.Text>Description: {beer.description}</Card.Text>
            <Card.Text>ABV: {beer.abv}%</Card.Text>
            <ListGroup className="list-group-flush">
                <Card.Text>Food Pairing:</Card.Text>
                {beer.food_pairing.map(pairing => <ListGroup.Item key={Math.random() * 100000}>{pairing}</ListGroup.Item>)}
            </ListGroup>            

        </Card>
        
    )

}
