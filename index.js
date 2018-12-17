const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const lodash = require('lodash');
const mongoose = require('mongoose');
const Location = require('./models/location');

const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
  .then(() => {console.log('Connected')})
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/user', async (req, res) =>{
  const newItem = new Location({users:{
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }});
    await Location.find({_id:'5c17b289bb5bb42968173b5b'}, async (err, sala) => {
      let checkUser = false;
      if (lodash.isEmpty(sala)) {
        newItem.save();
        console.log("saved new entry");
      }else {
        for (var i = 0; i < sala[0].users.length; i++) {
          if (sala[0].users[i].name == newItem.users[0].name) {
            console.log('user already exists');
            checkUser = true;
          }
        }if (checkUser == false) {
            sala[0].users.push(newItem.users[0]);
            sala[0].save();
            console.log('new user pushed');
        }}
    });
    res.status(200).send('Response ok--------------------------------------------------');
});

app.get('/api/user', async (req, res) => {
  const count = await Location.estimatedDocumentCount({});
  const local = await Location.find();
  const users = [];
  console.log(local);
  for (var i = 0; i < count; i++) {
    users.push(local[i].users)
  }
  res.status(200).send(users);
});

app.listen(port, () => {
  console.log('app started');
});
