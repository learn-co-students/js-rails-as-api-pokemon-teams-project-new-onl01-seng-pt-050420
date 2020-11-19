class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons 
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon 
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build({}
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })
        pokemon.save ? render json: pokemon : {message: }
    end

    def destroy

    end

end
