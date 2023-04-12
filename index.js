const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const uuid = require("uuid");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;s

mongoose.connect('mongodb://localhost:27017/myflixDB', { useNewUrlParser: true, useUnifiedTopology: true });

// const express = require('express'),
//     app = express(),
//     bodyParser = require('body-parser'),
//     uuid = require(uuid);

// app.use(bodyParser.json());

// let users = [{
//     id: 1,
//     name: "ayden",
//     favoriteMovies: []
//   },
//   {
//     id: 2,
//     name: "abbi",
//     favoriteMovies: []
//   },]

// let movies = [
    
//     {
//     title: 'Harry Potter and the Sorcerer\'s Stone',
//     author: 'J.K. Rowling'
//   },
//   {
//     title: 'Lord of the Rings',
//     author: 'J.R.R. Tolkien'
//   },
//   {
//     title: 'Twilight',
//     author: 'Stephanie Meyer'
//   }
// ];

//   //READ

//   app.get("/movies", (req, res) => {
//     res.json(movies);
//     res.status(200).json(movies);
//   });
  
  
//   app.get("/movies/:title", (req, res) => {
//     const movie = movies.find((movie) => movie.title === req.params.title);
//     if (movie) {
//       res.status(200).json(movie);
//     } else {
//       res.status(400).send(`Movie title ${req.params.title} could not be found`);
//     }
//   });
  
  
//   app.get("/movies/genre/:title", (req, res) => {
//     const genre = movies.find((movie) => movie.title === req.params.title).genre;
//     if (genre) {
//       res.status(200).json(genre);
//     } else {
//       res.status(400).send(`Movie title ${req.params.title} could not be found`);
//     }
//   });
  

//   app.get("/movies/director/:name", (req, res) => {
//     const director = movies.find(
//       (movie) => movie.director.name === req.params.name
//     ).director;
//     if (director) {
//       res.status(200).json(director);
//     } else {
//       res.status(400).send(`Movie title ${req.params.name} could not be found`);
//     }
//   });
  
  
//   app.post("/users", (req, res) => {
//     let newUser = req.body;
//     if (newUser.name) {
//       newUser.id = uuid.v4();
//       users.push(newUser);
//       res.status(200).json(newUser);
//     } else {
//       res.status(400).send("Missing user name");
//     }
//   });
  

//   app.put("/users/:userName/:newName", (req, res) => {
//     const user = users.find((user) => user.name === req.params.userName);
//     if (user) {
//       users.find((user) => user.name === req.params.userName).name =
//         req.params.newName;
//       newUserName = users.find((user) => user.name === req.params.newName);
//       res.status(200).json(newUserName);
//     } else {
//       res.status(400).send(`User with name ${req.params.userName} not found`);
//     }
//   });
  
 
//   app.put("/users/:userName/addMovie/:title", (req, res) => {
//     const user = users.find((user) => user.name === req.params.userName);
//     const movie = movies.find((movie) => movie.title === req.params.title);
  
//     if (user && movie) {
//       users
//         .find((user) => user.name === req.params.userName)
//         .userMovies.push(movie);
//       res
//         .status(200)
//         .json(users.find((user) => user.name === req.params.userName).userMovies);
//     } else if (!user) {
//       res.status(400).send(`Could not find user name: ${req.params.userName}`);
//     } else if (!movie) {
//       res.status(400).send(`Could not find movie title: ${req.params.title}`);
//     } else {
//       res
//         .status(400)
//         .send(
//           `Username: ${req.params.userName} and movie title: ${req.params.userName} could not be found`
//         );
//     }
//   });
//   app.get("/", (req, res) => {
//     res.send("Movie Api");
  
  
//   app.delete("/users/:userName/deleteMovie/:title", (req, res) => {
//     const user = users.find((user) => user.name === req.params.userName);
//     const movie = movies.find((movie) => movie.title === req.params.title);
  
//     if (user && movie) {
//       users
//         .find((user) => user.name === req.params.userName)
//         .userMovies.filter((movie) => movie.title !== req.params.title);
//       res.status(200).send(`Movie ${req.params.title} deleted from favourites`);
//     } else if (!user) {
//       res.status(400).send(`Could not find user name: ${req.params.userName}`);
//     } else if (!movie) {
//       res.status(400).send(`Could not find movie title: ${req.params.userName}`);
//     } else {
//       res
//         .status(400)
//         .send(
//           `Username: ${req.params.userName} and movie title: ${req.params.userName} could not be found`
//         );
//     }
//   });
  
 
//   app.delete("/users/:id", (req, res) => {
//     const user = users.find((user) => user.id == req.params.id);
//     if (user) {
//       users.filter((user) => user.id !== req.params.id);
//       res.status(200).send(`User with id ${req.params.id} removed`);
//     } else {
//       res.status(400).send(`User with id ${req.params.id} not found`);
//     }
//   });

  //Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

Users
  .create({
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  })
  .then((user) => { res.status(201).json(user) });

 
// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
})

;$set:
{
  Username: req.body.Username,
  Password; req.body.Password,
  Email; req.body.Email,
  Birthday; req.body.Birthday
}

(err, updatedUser) => {
  if (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  } else {
    res.json(updatedUser);
  }
}

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});