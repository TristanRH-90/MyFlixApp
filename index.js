const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require(uuid);

app.use(bodyParser.json());

let users = [{
    id: 1,
    name: "ayden",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "abbi",
    favoriteMovies: []
  },]

let movies = [
    
    {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  }
];

  //READ

  app.get('/movies',(req, res) => {res.status(200).json(movies) })



// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});