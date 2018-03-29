// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
moment().format();


moment().format('MMMM Do YYYY, h:mm:ss a')

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cors());

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/:time', function(req, res){
  
  var param = req.params.time;
  

  if(!isNaN(param)){ //date passed is in unix
    var unixDate = param;
    var naturalDate = moment(param*1000).format('MMMM D, YYYY');
  }
  else { //date passed is in natural language
    var naturalDateTemp = new Date(param);
    if (!isNaN(naturalDateTemp)) {
      var naturalDate = param;
      var unixDate = naturalDateTemp/1000;
    }
    else {
      res.json({ unix: null, natural: null });
    }
  }
  
  res.json({unix: unixDate, natural: naturalDate});

});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

/*

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

var timeStampUnix = "";
var timeStampNatural = "";

app.get("/dreams", (request, response) => {
  response.send(dreams)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})


app.listen(3000, function(){
  console.log('it s working');
});




*/