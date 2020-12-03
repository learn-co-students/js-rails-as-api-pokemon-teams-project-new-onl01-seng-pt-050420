class PokemonSerializer < ActiveModel::Serializer
    attributes :id, :species, :nickname, :trainer_id
    belongs_to :trainer #without this association, we won't see the trainer info render in index or show
end 