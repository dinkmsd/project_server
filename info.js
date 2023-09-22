const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoModel = new Schema({
    temperature: Number,
    humidity: Number,
    coordinates: {
      lat: Number,
      lon: Number,
    },
  })
module.exports = mongoose.model("Info", InfoModel);