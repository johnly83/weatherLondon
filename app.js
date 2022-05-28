
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;        //fetch a data from body.cityName
  const apiKey = "90a935c7b8a63c53e13b7475ddde79b2";    //authentication
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;   //paths

  https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data", function(data){
       const weatherData = JSON.parse(data);    //parse the JSON data
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;   //https://api.openweathermap.org/data/2.5/weather?q=London&appid=90a935c7b8a63c53e13b7475ddde79b2&units=metric
       const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";   //https://openweathermap.org/weather-conditions
      //Using express and Node modules
       res.write("<p>The weather is currently " + weatherDescription + "</p>");
       res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius</h1>");
       res.write("<img src=" + iconURL + ">");
       res.send()
     })
  })
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
