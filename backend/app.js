const mongo = require('mongoose')
const express = require('express')
require('dotenv').config()
const user = require('./routes/user');
const survey = require('./routes/survey');
const store = require('./routes/store');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors');


const app = express()


//cors
/*
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
app.use(allowCrossDomain);
*/

//db
mongo.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
.then(()=> console.log("Database connected"))
.catch(err => console.log(err));

//middleware
app.use(cookieParser())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors());

//routes
app.use('/user',user)
app.use('/',survey)
app.use('/store',store)

const port = process.env.PORT || 8000

app.listen(port, ()=> {console.log(`Server is running on ${port}`)})