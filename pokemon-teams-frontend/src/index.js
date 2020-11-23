const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementById('container');

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.data.forEach(createTrainerCard));
};

function createTrainerCard(trainer){
    const div = document.createElement('div');
    const pTag = document.createElement('p');
    const pokemons = trainer.relationships.pokemons.data;
    const ul = document.createElement('ul');
    const addButton = document.createElement('button');

    addButton.innerText = "Add Pokemon"
    addButton.addEventListener('click', createPokemon);
    div.className = "card";
    div.id = trainer.id;
    pTag.innerText = trainer.attributes.name;

    div.appendChild(pTag);
    div.appendChild(addButton);
    div.appendChild(ul);
    main.append(div);

    getPokemon(pokemons);
};

function getPokemon(pokemons){
    for(const pokemon of pokemons){
        let id = parseInt(pokemon.id)
        let POKEMON_URL = `${POKEMONS_URL}/${id}`
        fetch(POKEMON_URL)
        .then(res => res.json())
        .then(pokemon => addPokemon(pokemon));
    }
};

function addPokemon(pokemon){
    let trainer = parseInt(pokemon.data.relationships.trainer.data.id)
    let div = document.getElementById(trainer);
    let ul = div.querySelector('ul');
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    const pokemonId = pokemon.data.id;

    deleteButton.innerText = "Release";
    deleteButton.className = "release";
    deleteButton.addEventListener('click', releasePokemon);
    li.innerText = pokemon.data.attributes.nickname;
    li.id = pokemonId;

    ul.appendChild(li).append(deleteButton);
};

function createPokemon(event){
    if (event.target.nextElementSibling.childElementCount == 6){
        alert("You already have 6 Pokemons");
    } else {
        let trainerId = event.path[1].id
        fetch(POKEMONS_URL, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id: trainerId
            })
        }).then(response => response.json())
        .then(alert("New Pokemon added."))
        .catch(error => alert("Something went wrong"))};
        location.reload();
};

function releasePokemon(){
    let id = parseInt(event.target.parentElement.id)
    let POKEMON_URL = `${POKEMONS_URL}/${id}`
    fetch(POKEMON_URL, {
        method:"DELETE"
    })
    .then(alert("You've released your pokemon"))
    .catch(error => alert('Your pokemon is sleeping. Try to release again.'))
    location.reload();
};

getTrainers();