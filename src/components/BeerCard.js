import React from "react";
import "./BeerCard.css"

export const BeerCard = ({beer}) => {
    return (
        <div className="beerCard">
            <img src={beer.image_url} alt={beer.name} className="beerImg" />
            <div className="name-detail-div"><p className="cardDetail"><span className="cardHeading">Name: </span>{beer.name}</p></div>
            <div className="name-detail-div"><p className="cardDetail"><span className="cardHeading">Tagline: </span>{beer.tagline}</p></div>
            <div className="name-detail-div"><p className="cardDetail"><span className="cardHeading">First Brewed: </span> {beer.first_brewed}</p></div>
            <div className="name-detail-div"><p className="cardDetail"><span className="cardHeading">Description: </span>{beer.description}</p></div>
            <div className="name-detail-div"><p className="cardDetail"><span className="cardHeading">ABV (%): </span> {beer.abv}</p></div>
            <div className="name-detail-div"><p className="cardDetail"><span className="cardHeading">Food pairing: </span> {beer.food_pairing.map(pairing => <p className="pairing" key={Math.random() * 100000}>{pairing}</p>)}</p></div>


        </div>
    )

}

//change those p elements to p and span for easier reading

//            <div className="cardImgDiv"><img src={beer.image_url} alt={beer.name} className="beerImg" /></div>
