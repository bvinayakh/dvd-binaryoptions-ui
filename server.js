var express = require("express");
var app = express();
app.use(express.static(__dirname));
app.listen("3300");
console.log("Running at\nhttp://localhost:3300");

app.get("/short", (req, res, next) => {
  res.send("bid short");
});

app.get("/long", (req, res, next) => {
  res.send("bid long");
});
