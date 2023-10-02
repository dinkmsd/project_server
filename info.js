const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoModel = new Schema({
    coordinates: {
      lat: Number,
      lon: Number,
    },
    history: [
      {
        temperature: Number,
        humidity: Number,
        light: Number,
        dateTime: Date,
      }
    ]
  })
module.exports = mongoose.model("Info", InfoModel);