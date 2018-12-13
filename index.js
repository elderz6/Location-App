const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Location = require('./models/location');

const connectUri = 'mongodb://test:a12345@ds121834.mlab.com:21834/locationstuff'

const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
  .then(() => {console.log('Connected')})
  .catch((err) => console.log(err));
  //db.locations.insert({latitude: "", longitude:""});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/user', async (req, res) =>{
  res.status(200).send('Response ok--------------------------------------------------');
  console.log(req.body);
  const local = await Location.find({'users.name':req.body.name}).remove();
  const newItem = new Location({
    users:{
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }}
  );
  newItem.save()
  .then((item) => {
    console.log("done");
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/api/user', async (req, res) => {
  const count = await Location.estimatedDocumentCount({});
  console.log(count);
  const local = await Location.find();
  var users = [];
  for (var i = 0; i < count; i++) {
    users.push({latitude:local[i].users.latitude, longitude:local[i].users.longitude})
  }
  res.status(200).send(users);
});

app.listen(port, () => {
  console.log('app started');
});
