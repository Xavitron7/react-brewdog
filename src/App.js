import {useState, useEffect} from "react";
import {BeerCard} from "./components/BeerCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function App() {

  const [allBeers, setAllBeers] = useState([]);
  const [displayBeers, setDisplayBeers] = useState([]);
  const [beerName, setBeerName] = useState("");

useEffect(() => {
  const callAPI = async () => {
    const beers = await fetch("https://api.punkapi.com/v2/beers", {mode:"cors"});
    const beersJSON = await beers.json();
    setAllBeers(beersJSON);
    setDisplayBeers(beersJSON); 
  }

  callAPI();

}, [])

function displayRandomBeer() {
  //Select a random beer index from "All Beers" array using that math.random range calculation. Then use that value as an argument for setDisplay beers.

  setDisplayBeers([allBeers[Math.floor(Math.random() * ((allBeers.length - 1) - 0 + 1)) + 0]]);
  
}

function displayAllBeers() {
  setDisplayBeers([...allBeers])
}


function handleSubmit(event) {

  event.preventDefault();
  // Function needs to take the information from the input fields and use that information in a lookup vs the displayBeers array
  const beerSelection = document.querySelector("#beerSelect").value;
  const minABVSelection = document.querySelector("#minABVInput").value === "" ? null : document.querySelector("#minABVInput").value;
  const maxABVSelection = document.querySelector("#maxABVInput").value === "" ? null : document.querySelector("#maxABVInput").value;
  let filteredBeers;
  
  //First thing to do is make sure max abv is larger than or equal to min abv

  //Requirements: If beer selection = any, ignore beer as a filter criteria. If food pairing = any, ignore food pairing as a criteria. Also need a way to deal with empty strings in the abv selections.

  //If statement checks that the max abv is bigger than or equal to the min abv, and that the values are truthy (no empty strings or null / undef values)

  if (minABVSelection && maxABVSelection) {

    beerSelection === "Any" ? 
    filteredBeers = allBeers.filter(beer => beer.abv >= minABVSelection && beer.abv <=maxABVSelection) : 
    filteredBeers = allBeers.filter(beer => beer.name === beerSelection && beer.abv >= minABVSelection && beer.abv <=maxABVSelection);

    setDisplayBeers([...filteredBeers]);
    console.log(minABVSelection, maxABVSelection)
    console.log(displayBeers)

    //Want to: locate the object at a position in the array, access the food pairing array, loop through each object in that array to see if it includes the food pairing
  } 

  else if (!minABVSelection && !maxABVSelection) {
    beerSelection === "Any" ? filteredBeers = allBeers : filteredBeers = allBeers.filter(beer => beer.name === beerSelection);

    setDisplayBeers([...filteredBeers])

    console.log(minABVSelection, maxABVSelection);
    console.log(displayBeers)

  }

  else {
    
      alert("Check the entries in the selection fields")
  }

}
  return (
        
      <Container fluid >
        <Row className="bg-dark" >
          <h1 className="text-light text-center">Brewdog Beer Picker</h1>
        </Row>
        <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="beerSelect">
            <Form.Label>Beer:</Form.Label>
            <Form.Select aria-label="Select a beer" >
              <option value="Any">Any</option>
              {allBeers.map(beer => {return <option value={beer.name}>{beer.name}</option>})} 
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="minABVInput">
            <Form.Label>Min ABV:</Form.Label>
            <Form.Control type="number" placeholder="Min ABV" step="0.1" />          
          </Form.Group>

          <Form.Group controlId="maxABVInput">
            <Form.Label>Max ABV:</Form.Label>
            <Form.Control type="number" placeholder="Max ABV" step="0.1" />
          </Form.Group>

          <ButtonGroup aria-label="Form button group" className="my-3">
            <Button type="reset" className="btn btn-danger">Clear Selections</Button>
            <Button type="submit" className="btn btn-success">Submit</Button>
            <Button type="button" onClick={displayRandomBeer}>Randomise</Button>
            <Button type="button" onClick={displayAllBeers}>Display All Beers</Button>
          </ButtonGroup>

        </Form>
        
        <Container className="my-2">
          <Row s={1} lg={2}>
          {displayBeers.map(beer => {
            return <BeerCard beer={beer} key={Math.random() * 10000}/>
          })}

          </Row>
         
        </Container>

        </Container>
      
      </Container>
    
  );
}

export default App;


//Problem faced: Beer could only be changed once without using the "display all beers function". I.e. you'd select a beer then couldn't choose another. This was because the code was both displaying AND filtering on the beers in the displaybeers array. Changing the code so that it filtered on "allbeers" then updated the "displaybeers" array fixed the problem. Also solidified the fact that the displaybeers array shouldn't be filtered on and just used to store filtering outputs.