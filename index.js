const express = require("express"); //to set up client to my query data from my local machine
const https = require("https"); //to set up my local machinie to query data from an external system
const bodyParser = require("body-parser"); //allows use to parse the queries that came in throught client side
const app = express(); 

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
})

app.post("/", function(request, response){ //how to react when our form gets posted
    
    //break-down of API
    const query = request.body.cityName;
    const appKey = "59066ef0d7172d0f4b1ba83475979546";
    const units = "imperial";
    //API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appKey}&units=${units}`; 
    
    https.get(url, function(res){ // fetching data from external server
        console.log(res.statusCode); //prints the status code; getting a 200 means we good to go;
    
    res.on("data", function(data){ //is called when there's a chunk of data that was recieved(this almost certainly will be more than once)
        
        // console.log(data); //it comes to us in hex code
        const weatherData = JSON.parse(data); //converts data into a JSON document
    
        //get temperature from parsed code
        const temp = weatherData.main.temp;
        
        //get weather description from parsed code
        const weatherDescription = weatherData.weather[0].description;
        
        //get icon from parsed code
        const icon = weatherData.weather[0].icon;
        
        //get imgURL from api
        const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        
        //response to request by sending data
        response.write(`<h1>The temperature is ${temp} degrees in ${query}</h1>`);
        response.write(`The weather is current ${weatherDescription}`); 
        response.write(`<img src=${imgUrl}>`);
        
        //the only send we can have in this block
        response.send();
    })

    });


})

app.listen(2000, function(){//sets up server
    console.log("The server is running....");
})

//we can turn JavaScriptObjects into strings

//you can only have 1 send per get block but we can have a bunch of write 




