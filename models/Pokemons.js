const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

    img: {
      type: String,
      required: true,
    },

    hp: {
      type: String,
      required: true,
    },

    attack: {
      type: String,
      required: true,
    },

    defense: {
      type: String,
      required: true,
    },

    speed: {
      type: String,
      required: true,
    },

    active: {
      type: String,
      required: true,
    }
});

const Pokemon = mongoose.model('Pokemon', pokeSchema);

module.exports = Pokemon;