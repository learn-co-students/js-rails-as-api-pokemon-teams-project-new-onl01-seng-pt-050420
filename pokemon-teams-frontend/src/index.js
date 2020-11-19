const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(`${TRAINERS_URL}`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            let trainers = json['data']
            trainers.forEach(trainer => {
                createTrainerCard(trainer.attributes.name)
                console.log(trainer.attributes.name)
            })
        })
}

function createTrainerCard(trainer) {
    let div = document.createElement("div")
    let main = document.querySelector("main")
    let pTag = document.createElement("p")
    div.className = "card"
    pTag.innerHTML = trainer

    let addPokemonBtn = document.createElement("button")
    addPokemonBtn.innerHTML = "Add Pokemon"
    div.appendChild(addPokemonBtn)

    main.appendChild(div)
}

function fetchPokemon()