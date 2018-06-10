// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json())

app.get("/", function(request, response){
        let utc = new Date();
        let unix = utc.toUTCString();
        response.send({utc, unix});
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:date_string", function (request, response) {
    let dateString = request.params.date_string;
    let utc, unix=Date.parse(dateString);
    if(dateString){
        if(unix!== NaN && utc!=null){
            console.log("Not in Nan");
            utc = new Date(dateString).toUTCString();      
            response.send({utc, unix});
        } else {
            console.log("In else");
            response.send({"error" : "Invalid Date" })
        }
    } else {
         utc = new Date();
         unix = utc.toUTCString();
         response.send({utc, unix});
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
