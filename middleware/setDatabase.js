const database = require("../db/problemsDB");
const schema = require("../models/problemDetails");

const setDatabase = (language) => {
    return database.getCurrentConnection().model(language, schema);
}

module.exports = { setDatabase };