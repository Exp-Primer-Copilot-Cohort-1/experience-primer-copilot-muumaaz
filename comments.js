// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const db = require('../database/index.js');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Create route to handle get request to /api/comments
app.get('/api/comments', (req, res) => {
  db.getComments((err, results) => {
    if (err) {
      console.log('Error getting comments from database');
    } else {
      res.send(results);
    }
  });
});

// Create route to handle post request to /api/comments
app.post('/api/comments', (req, res) => {
  const comment = req.body;
  db.postComment(comment, (err, results) => {
    if (err) {
      console.log('Error posting comment to database');
    } else {
      res.send(results);
    }
  });
});

// Create route to handle put request to /api/comments
app.put('/api/comments', (req, res) => {
  const comment = req.body;
  db.updateComment(comment, (err, results) => {
    if (err) {
      console.log('Error updating comment in database');
    } else {
      res.send(results);
    }
  });
});

// Create route to handle delete request to /api/comments
app.delete('/api/comments', (req, res) => {
  const comment = req.body;
  db.deleteComment(comment, (err, results) => {
    if (err) {
      console.log('Error deleting comment from database');
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

