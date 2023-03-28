const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });

// morgan logger
app.use(morgan('common', { stream: accessLogStream }));
app.use(express.static('public'));

let topMovies = [
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

// GET requests
app.get('/', (req, res) => {
    console.log('Welcome to myCinema');
    res.send('Welcome to myCinema!');
  }),

  app.get('/movies', (req, res) => {                  
    console.log('Top movies request');
    res.json(topMovies);
  });
  app.get('/documentation', (req, res) => {                  
    console.log('Documentation Request');
    res.send('All documentation found here.');
  });

  // Morgan middleware error handling function
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error');
  });
// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});