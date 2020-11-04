require 'faker'

class Trainer < ApplicationRecord
    has_many :pokemons

    def pokemon_team
        Pokemon.where("trainer_id LIKE ?", "%#{self.id}%")
    end

    def create_pokemon
        pokemon_hash = {
            species: Faker::Games::Pokemon.move,
            nickname: Faker::Games::Pokemon.name,
            trainer_id: self.id
        }

        Pokemon.create(pokemon_hash)
    end
end
