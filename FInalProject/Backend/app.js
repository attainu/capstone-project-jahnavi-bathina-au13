const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 1997;
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require("cors");

dotenv.config();
// DATABASE
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true ,useUnifiedTopology: true}).then(()=> console.log('DB connected'))

// Routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user")

//ApiDOcs
app.get("/",(req,res)=>{
  fs.readFile("docs/apiDocs.json", (err,data)=>{
    if(err){
      res.status(400).json({
        error:err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })

})

// MIDDLEWAREs
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Unauthorized User.');
    }
  });

//PORT CONNECTION
app.listen(PORT,(req,res)=>{
    console.log(`ur server is running on ${PORT}`)
});