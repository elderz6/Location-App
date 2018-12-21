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
    await Location.find({_id:req.body.id}, async (err, sala) => {
      let checkUser = false;
      console.log(req.body);
      if (lodash.isEmpty(sala)) {
        //if there is no entry matching the id, create a new room
        newItem.save();
        res.status(200).send(newItem._id);
        console.log("saved new entry");
      }else {
        for (var i = 0; i < sala[0].users.length; i++) {
          if (sala[0].users[i].name == newItem.users[0].name) {
            console.log('user already exists');
            //update user info if already exists
            sala[0].users[i].latitude = newItem.users[0].latitude;
            sala[0].users[i].longitude = newItem.users[0].longitude;
            sala[0].save();
            checkUser = true;
          }
        }if (checkUser == false) {
          //if the user is not on the list, push him to the array
            sala[0].users.push(newItem.users[0]);
            sala[0].save();
            console.log('new user pushed');
        }}
    });
});
app.post('/api/user/room/search', async (req, res) => {
  const local = await Location.find({'_id':req.body[0]._id})
  .catch((err) => {
    res.status(200).send('id not found');
  });
  res.status(200).send(local[0].users);
});

app.get('/api/user/:id', async (req, res) => {
  const local = await Location.find({'_id':req.params.id});
  const users = [];
  for (var i = 0; i < local[0].users.length; i++) {
    users.push(local[0].users[i])
  }
  res.status(200).send(users);
});

app.post('/api/user/room/new', async (req, res) => {
  console.log(req.body);
  const newItem = new Location({users:{
      name: req.body.name,
    }});
    const local = await Location.find()
    console.log(await Location.find({'users.name':req.body.name}));
    await Location.deleteMany({'users.name':req.body.name}, (err) => {
      if (err) {
        console.log(err);
      }
    });
    newItem.save();
    console.log(newItem);
    res.status(200).send(newItem._id);
});

app.listen(port, () => {
  console.log('app started');
});
