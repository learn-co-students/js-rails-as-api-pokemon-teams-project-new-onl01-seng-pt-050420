class PokemonSerializer
  
  def initialize(pokemon)
    @pokemon = pokemon
  end

  def to_serialized_json
    options = {
      only: [:id, :species, :nickname],
      include: {
        trainer: {
          only: [:id, :name]
        }
      }
    }
    @pokemon.to_json(options)
  end
end
