const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  users:{
    name:{type:String, required: true},
    latitude:{type:String, required: true},
    longitude:{type:String, required: true},
  }
});

module.exports = Location = mongoose.model('location', LocationSchema);
