var express = require("express");
const fetch = require("node-fetch");
var router = express.Router();

let titles = [];
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((resultado) => {
    resultado.forEach((element) => {
      titles.push(element.title);
    });
  });

setTimeout(() => {
  console.log(titles, "titles");
}, 257);

module.exports = router;
