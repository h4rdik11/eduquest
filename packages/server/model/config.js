const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
  timer: Number,
});

module.exports = mongoose.model("Config", ConfigSchema);
