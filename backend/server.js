const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const questionRoutes = require('./routes/question');
app.use('/api', questionRoutes);


app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/intervibot', {
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
  

app.get('/', (req, res) => {
  res.send('InterviBot Backend is Running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
