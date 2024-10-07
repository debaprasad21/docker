const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
  name: String,
  type: String,
  url: String,
});

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
