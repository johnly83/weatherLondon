
const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=90a935c7b8a63c53e13b7475ddde79b2&units=metric";

  https.get(url, function(response){
     console.log(response);
  })

  res.send("Server is up and running.");
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
