class PokemonSerializer
  include JSONAPI::Serializer
  attributes :species, :nickname
end
