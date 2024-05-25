// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const path = require('path');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

// Function to check if a date is invalid
const InvalidDate = (date) => isNaN(Date.parse(date));

// API endpoint to serve the index.html file
app.get('/api/date', function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// API endpoint to get the date information
app.get('/api/date/:date', function (req, res) {
  let date = req.params.date;

  // Check if date is in Unix timestamp format
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  // Convert the date to a Date object
  date = new Date(date);

  // Check if the date is invalid
  if (InvalidDate(date)) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// API endpoint to get the current date
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
