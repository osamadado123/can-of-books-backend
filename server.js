"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
const mongoose = require("mongoose");

server.use(cors());
server.use(express.json());

const PORT = process.env.PORT ;

// mongoose.connect('mongodb://osama:1234@ac-ukbfrna-shard-00-00.ut4lql7.mongodb.net:27017,ac-ukbfrna-shard-00-01.ut4lql7.mongodb.net:27017,ac-ukbfrna-shard-00-02.ut4lql7.mongodb.net:27017/?ssl=true&replicaSet=atlas-14lowc-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('mongodb://omar:1234@ac-gz7wr2i-shard-00-00.jeyohs9.mongodb.net:27017,ac-gz7wr2i-shard-00-01.jeyohs9.mongodb.net:27017,ac-gz7wr2i-shard-00-02.jeyohs9.mongodb.net:27017/?ssl=true&replicaSet=atlas-z04wln-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

server.get('/', homeHandler);
server.get('/books', booksHandler);
server.post('/books', addBooksHandler);
server.delete('/books/:id', deleteBooksHandler);
server.get('*', defaultHandler);

const booksSchema = new mongoose.Schema({
  title: String,

  description: String,

  status: String,
});

const booksModel = mongoose.model("Books", booksSchema);

async function seedData() {
  const firstBook = new booksModel({
    title: "Anna Karenina",

    description:
      "Anna Karenina tells of the doomed love affair between the sensuous and rebellious Anna and the dashing officer, Count Vronsky. Tragedy unfolds as Anna rejects her passionless marriage",

    status: "by Leo Tolstoy",
  });

  const secondBook = new booksModel({
    title: "Madame Bovary",

    description:
      "For daring to peer into the heart of an adulteress and enumerate its contents with profound dispassion, the author of Madame Bovary was tried for offenses against morality ",

    status: "by Gustave Flaubert",
  });

  const thirdBook = new booksModel({
    title: " The Great Gatsby",

    description:
      "The novel chronicles an era that Fitzgerald himself dubbed the Jazz Age. Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity",

    status: " by F. Scott Fitzgerald",
  });

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}
  // seedData();
function homeHandler(req, res) {
  res.send("Hi from the home route");
}

function booksHandler(req, res) {
  booksModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
}

async function addBooksHandler(req, res) {
  console.log(req.body);

  const { bookTitle, BookDescription, bookStatus } = req.body;
  await booksModel.create({
    title: bookTitle,

    description: BookDescription,

    status: bookStatus,
  });
  booksModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
}
function deleteBooksHandler(req, res) {
  const bookId = req.params.id;

  booksModel.deleteOne({ _id: bookId }, (err, result) => {
    booksModel.find({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  });
}

function defaultHandler(req, res) {
  res.status(404).json("Sorry page not found");
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
