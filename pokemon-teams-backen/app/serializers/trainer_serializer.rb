class TrainerSerializer < ActiveModel::Serializer
    attributes :id, :name
    has_many :pokemons #without this association, we won't see the pokemons info render in index or show
end 