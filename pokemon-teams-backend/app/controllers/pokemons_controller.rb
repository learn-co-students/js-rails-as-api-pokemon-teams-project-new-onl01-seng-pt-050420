class PokemonsController < ApplicationController
    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: :no_content
    end

    def create
        trainer = Trainer.find_by(id: params[:id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon, status: :created
    end
    
end
