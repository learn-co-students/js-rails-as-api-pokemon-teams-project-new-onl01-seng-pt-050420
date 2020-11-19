class PokemonSerializer 
    include JSONAPI::Serializer
    attributes :nickname, :species
end