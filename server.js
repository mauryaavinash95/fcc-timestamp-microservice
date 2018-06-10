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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/:date_string", function (request, response) {
    let dateString = request.params.date_string;
    let utc, unix=Date.parse(dateString);
    if(dateString){
        if(unix!== NaN){
            utc = new Date(dateString).toUTCString();      
            response.send({utc, unix});
        } else {
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
