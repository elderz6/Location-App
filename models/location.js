const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const LocationSchema = new Schema({users:
  [{
    name:{type:String, required: true, unique:true},
    latitude:{type:String, required: true},
    longitude:{type:String, required: true},
    id:{type:ObjectId}
  }]}
);

module.exports = Location = mongoose.model('location', LocationSchema);
