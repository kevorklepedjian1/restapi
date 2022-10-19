const User = require("../models/users.models");
const bcrypt = require ("bcryptjs");
const auth = require("../middlewares/auth");
const { response } = require("express");

async function login({username, password},callback){
    const user = await User.findOne({username});

    if(user !=null){
        if(bcrypt.compareSync(password, user.password)){
            const token = auth.generateAccessToken(username);
            return callback(null, {...user.toJSON(),token})
        }
    
    else{
        return callback({
            massage: "invalid username/password"
        })
    }
    }
    else{
        return callback({
            massage: "invalid username/password"
        })
    }
}

async function register(params, callback){
    if(params.username === undefined){
        return callback({message: "username required"})
    }
    const user = new User(params);
    user.save()
    .then((response) =>{
        return callback(null, response);
    })
    .catch((error) =>{
        return callback(error)
    })
}

module.exports ={
    login,
    register
}