const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function createTrainerCard(trainer) {
    const main = document.getElementById("main")
    
    const card = document.createElement("div")
    card.setAttribute("class", "card")
    const pTag = document.createElement("p")
    const list = document.createElement("ul")
    pTag.innerHTML = trainer.name

    trainer.pokemons.forEach(pokemon => {
        const listItem = document.createElement("li")
        listItem.innerText = pokemon.attributes.species
        list.appendChild(listItem)
        
    })
    


    let addPokemonbtn = document.createElement("button")
    addPokemonbtn.innerHTML = "Add Pokemon"
    main.appendChild(card)
    card.append(pTag, addPokemonbtn, list)

}

function fetchTrainers(){ 
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        let trainers = json['data']
        trainers.forEach(trainer => {
            createTrainerCard(trainer.attributes)
            console.log(trainer.attributes.pokemons.attributes)
        })
    })
}
fetchTrainers()