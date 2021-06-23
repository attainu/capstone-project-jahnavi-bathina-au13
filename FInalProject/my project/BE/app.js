const express = require('express')
const app = express();
const mongoose = require('mongoose');
const morgan =require("morgan");
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const port = process.env.PORT || 1997
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

//db

mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true,
      useUnifiedTopology: true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });


//bring in routes
const postRoutes =require ("./routes/post")
const authRoutes =require ("./routes/auth")
const userRoutes =require ("./routes/user")



///API Doc

app.get('/',(req,res)=>{
  fs.readFile('docs/apiDocs.json',(err, data) =>{
    if(err){
      res.status(400).json({
        error:err
      });
    }
    const docs = JSON.parse(data)
    res.json(docs);
  });
});




//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/",cors(),postRoutes);
app.use("/",cors(),authRoutes);
app.use("/",cors(),userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"Unauthorized!"});
  }
});


app.listen(port, () => {
console.log(`Hey! Node js API is listening on port:${port}`);

});