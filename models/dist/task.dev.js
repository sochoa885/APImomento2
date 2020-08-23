"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema = new Schema({
  title: {
    type: String,
    require: [true, "'Title' is required"],
    "default": 'Titulo default'
  },
  description: {
    type: String,
    require: false,
    "default": 'Without description'
  },
  image_url: {
    type: String,
    require: false,
    "default": 'Without image'
  },
  created_at: {
    type: Date,
    require: [true, "'Created at' is required"],
    "default": Date.now
  },
  active: {
    type: Boolean,
    "default": true
  }
});
module.exports = mongoose.model("Task", productSchema);