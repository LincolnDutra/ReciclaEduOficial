const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        tipo_usuario: DataTypes.STRING,
        pontos: DataTypes.INTEGER,
        nivel: DataTypes.INTEGER,
        data_criacao: DataTypes.DATE
      },
      {
        sequelize,
        tableName: "usuarios",
        timestamps: false,
      }
    );
  }
}

module.exports = Usuario;
