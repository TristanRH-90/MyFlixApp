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

  app.get("/movies", (req, res) => {
    res.json(movies);
    res.status(200).json(movies);
  });
  
  
  app.get("/movies/:title", (req, res) => {
    const movie = movies.find((movie) => movie.title === req.params.title);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send(`Movie title ${req.params.title} could not be found`);
    }
  });
  
  
  app.get("/movies/genre/:title", (req, res) => {
    const genre = movies.find((movie) => movie.title === req.params.title).genre;
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send(`Movie title ${req.params.title} could not be found`);
    }
  });
  

  app.get("/movies/director/:name", (req, res) => {
    const director = movies.find(
      (movie) => movie.director.name === req.params.name
    ).director;
    if (director) {
      res.status(200).json(director);
    } else {
      res.status(400).send(`Movie title ${req.params.name} could not be found`);
    }
  });
  
  
  app.post("/users", (req, res) => {
    let newUser = req.body;
    if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(200).json(newUser);
    } else {
      res.status(400).send("Missing user name");
    }
  });
  

  app.put("/users/:userName/:newName", (req, res) => {
    const user = users.find((user) => user.name === req.params.userName);
    if (user) {
      users.find((user) => user.name === req.params.userName).name =
        req.params.newName;
      newUserName = users.find((user) => user.name === req.params.newName);
      res.status(200).json(newUserName);
    } else {
      res.status(400).send(`User with name ${req.params.userName} not found`);
    }
  });
  
 
  app.put("/users/:userName/addMovie/:title", (req, res) => {
    const user = users.find((user) => user.name === req.params.userName);
    const movie = movies.find((movie) => movie.title === req.params.title);
  
    if (user && movie) {
      users
        .find((user) => user.name === req.params.userName)
        .userMovies.push(movie);
      res
        .status(200)
        .json(users.find((user) => user.name === req.params.userName).userMovies);
    } else if (!user) {
      res.status(400).send(`Could not find user name: ${req.params.userName}`);
    } else if (!movie) {
      res.status(400).send(`Could not find movie title: ${req.params.title}`);
    } else {
      res
        .status(400)
        .send(
          `Username: ${req.params.userName} and movie title: ${req.params.userName} could not be found`
        );
    }
  });
  app.get("/", (req, res) => {
    res.send("Movie Api");
  
  
  app.delete("/users/:userName/deleteMovie/:title", (req, res) => {
    const user = users.find((user) => user.name === req.params.userName);
    const movie = movies.find((movie) => movie.title === req.params.title);
  
    if (user && movie) {
      users
        .find((user) => user.name === req.params.userName)
        .userMovies.filter((movie) => movie.title !== req.params.title);
      res.status(200).send(`Movie ${req.params.title} deleted from favourites`);
    } else if (!user) {
      res.status(400).send(`Could not find user name: ${req.params.userName}`);
    } else if (!movie) {
      res.status(400).send(`Could not find movie title: ${req.params.userName}`);
    } else {
      res
        .status(400)
        .send(
          `Username: ${req.params.userName} and movie title: ${req.params.userName} could not be found`
        );
    }
  });
  
 
  app.delete("/users/:id", (req, res) => {
    const user = users.find((user) => user.id == req.params.id);
    if (user) {
      users.filter((user) => user.id !== req.params.id);
      res.status(200).send(`User with id ${req.params.id} removed`);
    } else {
      res.status(400).send(`User with id ${req.params.id} not found`);
    }
  });



// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});