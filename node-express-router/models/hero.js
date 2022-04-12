const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  },
  superpower: {
    type: String,
    required: true
  }
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
