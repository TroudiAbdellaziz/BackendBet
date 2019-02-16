
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


const port = 3000;


app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
app.use(function(req, res, next) {
  
    res.header("Access-Control-Allow-Origin", "*");
  
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "*");
  
    res.setHeader(
      "Access-Control-Allow-Headers",
      "content-type,x-access-token,X-Requested-With"
    );
  
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    next();
  
  });
const config = require('./config/database');
mongoose.connect(config.database);


const UserRouter = require('./routes/UserRouter');
const PaperRouter = require('./routes/PaperRouter');
const BetRouter = require('./routes/BetRouter');
const TransactionRouter = require('./routes/TransactionRouter');

app.use('/user',UserRouter);
app.use('/papers',PaperRouter);
app.use('/bets',BetRouter);
app.use('/transactions', TransactionRouter);