class TrainerSerializer

  def initialize(trainers)
    @trainers = trainers
  end

  def to_serialized_json
    options = {
      only: [:id, :name],
      include: {
        pokemons: {
          only: [:id, :species, :nickname, :trainer_id]
        }
      }
    }
    @trainers.to_json(options)
  end

end
