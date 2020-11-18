const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

    function getTrainers() {
        fetch(TRAINERS_URL)
            .then(res => res.json())
            .then(data => displayTrainers(data))
    };

    function displayTrainers(trainers) {
        const view = document.getElementById('view');
        for (const trainer of trainers) {
            const trainerCard = createCard(trainer);
            view.append(trainerCard);
        }

    }

    function createCard(trainer) {
        const cardDiv = document.createElement('div');

        cardDiv.className = "card";
        cardDiv.data = `${trainer.id}`;

        p = document.createElement('p');
        p.innerHTML = `${trainer.name}`;
        cardDiv.appendChild(p);

        addPokemon = document.createElement('button');
        addPokemon.data = `${trainer.id}`
        addPokemon.appendChild(document.createTextNode('Add Pokemon'));
        cardDiv.appendChild(addPokemon);
        addPokemon.addEventListener('click', function(e) {
            pokemonData = {
                trainer_id: e.path[1].data
            }
            configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(pokemonData)
            }

            fetch(POKEMONS_URL, configObj)
                .then(res => res.json(res))
                .then(function(data) {
                    addPokemonToCard(data, e);
                })
        })

        ul = document.createElement('ul');
        ul.id = `${trainer.name}_team`
        for (const pokemon of trainer.pokemons) {
            createLi(pokemon);
        };

        function createLi(pokemon) {
            li = document.createElement('li');
            li.appendChild(document.createTextNode(`${pokemon.nickname}`))
            li.data = `${pokemon.id}`

            removeButton = document.createElement('button');
            removeButton.appendChild(document.createTextNode('remove'));
            removeButton.addEventListener('click', function(e) {
                removeLi(e, ul);
            });
            li.appendChild(removeButton);
            ul.append(li);
        };

        function removeLi(e, ul) {
            const configObj = { method: "DELETE" }
            const destroyURL = `${POKEMONS_URL}/${e.path[1].data}`
            fetch(destroyURL, configObj)
                .then(res => res.json())
                .then(data => e.path[2].removeChild(e.path[1]))
                .catch(err => console.log(err))
        };

        function addPokemonToCard(data, e) {
            ul = e.target.nextSibling;

            createLi(data);
        };

        cardDiv.appendChild(ul);

        return cardDiv;
    }
    getTrainers();
});