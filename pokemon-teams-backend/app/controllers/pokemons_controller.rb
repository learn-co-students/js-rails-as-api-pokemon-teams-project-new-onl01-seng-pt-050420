class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        trainer = Trainer.find_by(id: pokemon_params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
