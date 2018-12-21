const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const LocationSchema = new Schema({users:
  [{
    name:{type:String, required: true, unique:true},
    latitude:{type:String},
    longitude:{type:String},
    id:{type:ObjectId}
  }]}
);

module.exports = Location = mongoose.model('location', LocationSchema);
