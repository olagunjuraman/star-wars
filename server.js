const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const  database = require("./src/models/");

const errorHandler = require('./src/middlewares/error')

//Route files
const movie = require("./src/routes/movie.route");
const comment = require("./src/routes/comment.route");



//Connect Database

database.sequelize.sync({ ALTER: true })

 const app = express()

  //body parser
  app.use(express.json());

  app.use(cookieParser());

  // set security headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max : 100
  })

  app.use(limiter);

  app.use(hpp());

  app.use(cors())

  // mount route files
  app.use("/api/v1/movies", movie);
  app.use('/api/v1/comments/', comment);




  app.use(errorHandler)

  const PORT = process.env.PORT || 6000;

  app.listen(PORT, ()=>{
    console.log(`The server is listening on ${PORT} in ${process.env.NODE_ENV}`);
  });







