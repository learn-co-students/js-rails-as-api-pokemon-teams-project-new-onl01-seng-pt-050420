const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function createTrainerCard(trainer) {
    let div = document.createElement("div")
    let main = document.querySelector("main")
    let pTag = document.createElement("p")
    div.className = "card"
    pTag.innerHTML = trainer.attributes.name

    let addPokemonBtn = document.createElement("button")
    addPokemonBtn.innerHTML = "Add Pokemon"

    div.appendChild(pTag)
    div.appendChild(addPokemonBtn)

    main.appendChild(div)
}

function fetchTrainers() {
    return fetch(TRAINERS_URL)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        let trainers = json['data']
        trainers.forEach(trainer => {
            createTrainerCard(trainer)
            console.log(trainer.attributes.name)
        })
    })
}

fetchTrainers()
