class PokemonsController < ApplicationController
    def create 
        trainer = Trainer.find_by(id: params[:trainer_id])

        if trainer && trainer.pokemon_team.length < 6 
            new_team_member = trainer.create_pokemon
            render json: PokemonSerializer.new(new_team_member).to_serialized_json
        end
    end

    def destroy
        pokemon = Pokemon.destroy(params[:id])

        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

end
