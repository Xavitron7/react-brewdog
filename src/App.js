import './App.css';
import {useState, useEffect} from "react";
import {BeerCard} from "./components/BeerCard";

function App() {

  const [allBeers, setAllBeers] = useState([]);
  const [displayBeers, setDisplayBeers] = useState([]);
  const [beerName, setBeerName] = useState("");



  const logger = () => {console.log(allBeers, displayBeers, beerName)};

  

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
  //e.g.: something like setDisplayBeers(allBeers[Math.Random() - Math.Random()])
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
      //console.log(minABVSelection, maxABVSelection, beerSelection);    
  }

}
  



  return (
    <div>
      <div id="container">
        <header>
          <h1>Brewdog Beer Picker</h1>
        </header>
        <form action="#" method="GET" onSubmit={handleSubmit}>
          <div id="inputWrapper">

          <label htmlFor="beerSelect">Beer: </label>
          <select id="beerSelect">          
              <option value="Any">Any</option>
              {allBeers.map(beer => {return <option value={beer.name}>{beer.name}</option>})}            
          </select>

          <label htmlFor="minABVInput">Min ABV: </label>
          <input type="number" className="searchInput" placeholder="Min abv" id="minABVInput" step="0.1"/> 

          <label htmlFor="maxABVInput">Max ABV: </label>
          <input type="number" className="searchInput" placeholder="Max abv" id="maxABVInput" step="0.1"/> 
          </div>

          <div id="buttonWrapper">
          <button type="reset" className="btn">Clear Selections</button>
          <button type="submit" className="btn">Submit</button>
          <button type="button" className="btn" onClick={displayRandomBeer}>Randomise</button>
          <button type="button" className="btn" onClick={displayAllBeers}>Display All</button>
          </div>

        </form>
        <div id="cardSection">
          {displayBeers.map(beer => {
            return <BeerCard beer={beer} key={Math.random() * 10000}/>
          })}
        </div>

      <button onClick={logger}>API</button>
      </div>
    </div>
  );
}

export default App;

/* Food pairing functionality to be added at a later date. Here's the code I used that is related to that:

Selections to be rendered:

<select name="Food Pairing" id="pairingSelect">
            <optgroup label="Any">
              <option value="Any">Any</option>
            </optgroup>

            <optgroup label="Meat ">
              <option value="beef">Beef</option>
              <option value="lamb">Lamb</option>
              <option value="pork">Pork</option>
              <option value="ribs">Ribs</option>
              <option value="venison">Venison</option>
            </optgroup>

            <optgroup label="Poultry">
              <option value="chicken">Chicken</option>
              <option value="pigeon">Pigeon</option>        
            </optgroup>

            <optgroup label="Seafood">
              <option value="crab">Crab</option> 
              <option value="squid">Squid</option>        
              <option value="mussels">Mussels</option>        
              <option value="oysters">Oysters</option>        
              <option value="prawns">Prawns</option>        
              <option value="sole">Sole</option>        
            </optgroup>


            <optgroup label="Deli">
              <option value="pastrami">Pastrami</option>
              <option value="ham">Ham</option>
            </optgroup>

            <optgroup label="Fruits">
              <option value="Lemon">Lemon</option>
              <option value="strawberry">Strawberry</option>
              <option value="banana">Banana</option>
              <option value="pomegranate">Pomegranate</option>
              <option value="raspberry">Raspberry</option>
              <option value="avocado">Avocado</option>
              <option value="lime">Lime</option>
              <option value="blackberry">Blackberry</option>
              <option value="mango">Mango</option>
              <option value="tomato">Tomato</option>
            </optgroup>

            <optgroup label="Vegetables">
              <option value="corn">Corn</option>
              <option value="rhubarb">Rhubarb</option>
              <option value="garlic">Garlic</option>              
            </optgroup>

          </select>


  Code Idea for the food pairing selections:

  //Want to: locate the object at a position in the array, access the food pairing array, loop through each object in that array to see if it includes the food pairing

    let foodPairingMatches = [];

    if (pairingSelection !== "Any") {
      let flatFoodPairs = [];

      filteredBeers.forEach(beer => { foodPairingMatches.push(beer.food_pairing)});

      flatFoodPairs = foodPairingMatches.flat();

      for (let pair of flatFoodPairs) {
        console.log(pair.includes("pigeon"))
      }

      console.log(flatFoodPairs)





    }

    idea is to look through the food pairing array in each object in the array and return a true value if it exists. Need to find a way to do that.

    */



//Problem faced: Beer could only be changed once without using the "display all beers function". I.e. you'd select a beer then couldn't choose another. This was because the code was both displaying AND filtering on the beers in the displaybeers array. Changing the code so that it filtered on "allbeers" then updated the "displaybeers" array fixed the problem. Also solidified the fact that the displaybeers array shouldn't be filtered on and just used to store filtering outputs.