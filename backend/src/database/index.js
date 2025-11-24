const Sequelize = require("sequelize");
const config = require("./config");

// importar modelos
const Usuario = require("./models/Usuario");
const Desafio = require("./models/Desafio");
const Conquista = require("./models/Conquista");
const Premio = require("./models/Premio");
const Resgate = require("./models/Resgate");

const sequelize = new Sequelize(config);

// ativar models
Usuario.init(sequelize);
Desafio.init(sequelize);
Conquista.init(sequelize);
Premio.init(sequelize);
Resgate.init(sequelize);

module.exports = sequelize;
