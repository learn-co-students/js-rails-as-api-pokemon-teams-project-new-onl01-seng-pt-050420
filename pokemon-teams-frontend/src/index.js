const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainRef = document.querySelector("main")

function getTrainers() {
    fetch(TRAINERS_URL).then(response => response.json()).then(response => makeCards(response))
}

function makeCards(trainers) {
    console.log(trainers)
    trainers.forEach(trainer => buildCard(trainer))
    
}

function buildCard(trainer) {
    let newCard = document.createElement("div")
    let p = document.createElement("p")
    p.innerText = trainer.name
    newCard.className = "card";
    newCard.dataset.id = trainer.id
    newCard.appendChild(p)
    let newButton = document.createElement("button")
    newButton.innerText = "Add Pokemon"
    newButton.dataset.trainerId = trainer.id
    newButton.addEventListener("click", () => {addPokemon()})
    newCard.appendChild(newButton) 
    let newUl = document.createElement("ul")
    
    newCard.appendChild(newUl)
    mainRef.appendChild(newCard)
    trainer.pokemon.forEach(pokemon => newUl.appendChild(buildPkmnLi(pokemon)))
    
    

}

function buildPkmnLi(pokemon) {
    let newLI = document.createElement("li")
    newLI.innerText = `${pokemon.nickname} (${pokemon.species})`
    let releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.innerText = "Release"
    releaseButton.dataset.pokemonid = pokemon.id
    newLI.appendChild(releaseButton)
    releaseButton.addEventListener("click", () => {releasePokemon()})
   
    return newLI
}

function addPokemon() {
    const configObj = {
        method: "POST"
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {getTrainers()});