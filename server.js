const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const  database = require("./src/models/");


//Route files
// const conference = require("./src/routes/conference.route");
// const talk = require("./src/routes/talk.route");
// const usertalk = require('./src/routes/usertalk.route');



//Connect Database

database.sequelize.sync({ ALTER: true })

 const app = express()

  //body parser
  app.use(express.json());

  app.use(cookieParser());

  // Santize data
  app.use(mongoSanitize());

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
  // app.use("/api/v1/conference", conference);
  // app.use('/api/v1/talk', talk);
  // app.use('/api/v1/user-talk', usertalk);



  // app.use(errorHandler)

  const PORT = process.env.PORT || 6000;

  app.listen(PORT, ()=>{
    console.log(`The server is listening on ${PORT} in ${process.env.NODE_ENV}`);
  });

