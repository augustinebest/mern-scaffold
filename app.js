require("dotenv").config();
const express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
const path = require("path");
const app = express();

//cors {Cross Origin Request}
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,DELETE,PATCH,POST,GET');
      return res.status(200).json({});;
  }
  next();
});

//connecting to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Sportzlite', { useNewUrlParser: true })

// Connection to mlab
// mongoose.connect('mongodb://sportzlite:sportzlite123@ds133814.mlab.com:33814/sportzlite', { useNewUrlParser: true })

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));

// Routes
const UserRoutes = require('./routes/userRoutes');

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//route for homepage
app.get('/', (req, res) => {
  res.json('hello world!');
});

app.use('/user', UserRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
})

module.exports = app