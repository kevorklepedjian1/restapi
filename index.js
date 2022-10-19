//importing express,mongoose and dbconfig
const express = require('express');
const mongoose = require('mongoose');
const dbconfig = require('./config/db.config');
//importing auth and errors from middleware
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
//importing unless from express-unless
const {unless} = require('express-unless');

const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

//connexting to mongodb setting mongoose.promise to global so that it can be seen throughout the api
mongoose.Promise = global.Promise;
//connexting database to mongodb
mongoose.connect("mongodb+srv://kevork:123@cluster0.sgt9hzt.mongodb.net/?retryWrites=true&w=majority", 
{
    maxPoolSize: 50, 
    wtimeoutMS: 2500,
    useNewUrlParser: true
}).then(
    () =>{
        console.log('dtabase is connected')
    },
    (error) => {
        console.log('databased not conected: ' + error);
    }
);
const auth1=auth.authenticateToken
//check if the user has a token or not, based upon that it will either go to the authorized page or not
auth1.unless=unless
//let the app know dont check for token on this pages 
app.use(
 auth1.unless({
    path: [
        {url: "/users/login" , methods:["POST"]},
        {url: "/users/register" , methods:["POST"]},
    ]
 })
);
// object that gives the in comming object in json format
app.use(express.json());

//intiallize routes
app.use("/users", require("./routes/users.routes"))

app.use(errors.errorHandler);

app.listen(process.env.port || 4000 , function(){
    console.log("ready to go");
})