const mongo = require('mongoose')
const express = require('express')
require('dotenv').config()
const user = require('./routes/user');
const survey = require('./routes/survey');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors');

const app = express()

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

const port = process.env.PORT || 8000

app.listen(port, ()=> {console.log(`Server is running on ${port}`)})