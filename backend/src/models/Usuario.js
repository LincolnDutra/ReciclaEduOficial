import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.ENUM("aluno", "professor", "gestor"),
      allowNull: false,
    },
    pontos: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nivel: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Usuario;
