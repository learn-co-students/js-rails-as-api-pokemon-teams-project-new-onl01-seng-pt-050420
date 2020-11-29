const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById('main')


fetch(TRAINERS_URL)
  .then(function(rsp) {
    return rsp.json();
  })
  .then(function(obj){
    addTrainers(obj)
});

function addTrainers(trainers){
    for (const trainer of trainers){
        getTrainers(trainer) 
    }
   
}

function getTrainers(trainer) {
    const h2 = document.createElement("h2") 
        let div = document.createElement("div") 
        div.className = "card"
        h2.innerHTML = trainer.name
        let button = document.createElement('button')
        button.innerText = "Add Pokemon"
        button.addEventListener('click', addPokemon)
        div.id = trainer.id
        div.append(h2, button)
        let pokemons = trainer.pokemons
        for (const pokemon of trainer.pokemons){ 
            const ul = document.createElement("ul")
            const li = document.createElement("li") 
            li.innerText = `${pokemon.nickname} (${pokemon.species}) `
            li.id = pokemon.id
            let pokeButton = document.createElement('button')
            pokeButton.className = "release"
            pokeButton.innerText = "Release"
            pokeButton.addEventListener('click', releasePokemon)
            li.append(pokeButton)
            ul.append(li)
            div.appendChild(ul)
            }  
        main.appendChild(div)
}

function addPokemon() {
    let max = event.target.parentElement.childElementCount
    if (max == 8){
        alert("You have reached the maximum number of Pokemons");
    } else {
    let id = event.target.parentElement.id
    fetch(POKEMONS_URL, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
    .then(response => response.json())
    .then(alert("New Pokemon added."))
    .catch(error => alert("Something went wrong"))};
    location.reload(); 
}


function releasePokemon(event){
  let id = (event.target.parentElement.id)
  fetch(`${POKEMONS_URL}/${id}`, {
  method: "DELETE"})
  .then(alert("You've released your pokemon"))
  .catch(error => alert('Your pokemon is sleeping. Try to release again.'))
  location.reload();

} 
        
    
