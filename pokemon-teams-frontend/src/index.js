document.addEventListener('DOMContentLoaded', () => {
  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`

  const trainerContainer = document.querySelector('#trainer-container')

  let trainers = []
  console.log(trainerContainer)

  trainerContainer.addEventListener('click', (event) => {
    if (event.target.className === "release") {
      const config = {
        method: "DELETE"
      }

      fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, config)
        .then(response => response.json())
        .then(data => {
          event.target.parentElement.remove()
          console.log(data)
        })
    }
  })

  const getTrainersAndRenderAndAddEventListenersAndEtc = () => {
    trainerContainer.innerHTML = ''

    fetch(TRAINERS_URL)
      .then(response => response.json())
      .then(data => {
        data.forEach(trainer => {
          const trainerCard = document.createElement('div')
          trainerCard.dataset.id = trainer.id
          trainerCard.className = "card"

          trainerCard.innerHTML = `
            <p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul id=trainer-card-ul-${trainer.id}>
            </ul>
          `

          const addPokemon = trainerCard.querySelector('button')
          addPokemon.addEventListener('click', (event) => {
            const config = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                 trainer_id: trainer.id
              })
            }

            fetch(POKEMONS_URL, config)
              .then(response => response.json())
              .then(data => {
                console.log(data)

                getTrainersAndRenderAndAddEventListenersAndEtc()
              }) 

          })
          trainer.pokemons.forEach(pokemon => {
            const trainerCardUl = trainerCard.querySelector('ul')
            const pokemonLi = document.createElement('li')
            const releaseButton = document.createElement('button')


            releaseButton.innerText = 'Release'

            releaseButton.className = 'release'
            releaseButton.dataset.pokemonId = pokemon.id
            pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`

            pokemonLi.append(releaseButton)

            trainerCardUl.append(pokemonLi)
          })
          trainerContainer.append(trainerCard)
        })
      })
  }

  getTrainersAndRenderAndAddEventListenersAndEtc();

});