class TrainerSerializer
  include JSONAPI::Serializer
  attributes :name
  attributes :pokemons do |trainer| 
    PokemonSerializer.new(trainer.pokemons).as_json['data']
  end 
end
