const mongoose = require("mongoose");

module.exports = {
  createDbInstance: () =>
    mongoose.createConnection(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@eduquestdb.eudj1.mongodb.net/?retryWrites=true&w=majority&appName=eduquestDB`
    ),
};
