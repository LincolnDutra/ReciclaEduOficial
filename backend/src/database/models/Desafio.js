const { Model, DataTypes } = require("sequelize");

class Desafio extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.TEXT,
        pontos_recompensa: DataTypes.INTEGER,
        categoria: DataTypes.STRING,
        data_inicio: DataTypes.DATE,
        data_fim: DataTypes.DATE,
        ativo: DataTypes.BOOLEAN
      },
      {
        sequelize,
        tableName: "desafios",
        timestamps: false,
      }
    );
  }
}

module.exports = Desafio;
