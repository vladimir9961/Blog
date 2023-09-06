// models/GeolocationModel.js
const mongoose = require("mongoose");

const geolocationSchema = new mongoose.Schema({
  // Define the schema fields for geolocation data
  // Example fields: latitude, longitude, name, etc.
  latitude: Number,
  longitude: Number,
  name: String,
  // Add other fields as needed
});

const GeolocationModel = mongoose.model("Geolocation", geolocationSchema);

module.exports = GeolocationModel;
