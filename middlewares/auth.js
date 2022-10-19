const jwt =require('jsonwebtoken');

function authenticateToken(req, res, next){
    //get auth header
    const authheader = req.headers["authorization"]
    //extracting token
    const token = authheader && authheader.split(' ')[1];

    if(token == null){
        //send a 401 erorr the client request has not been completed because it lacks valid authentication credentials for the requested resource
        return res.sendStatus(401);
    }
    else{
        jwt.verify(token, "Secret_Key" , (err, user)=>{
            if(err){
                // send 403 unauthorized erorr forbidden
                req.user = user
                next();
            }
        })
    }
}

// generate token key on signin
function generateAccessToken(username){
    return jwt.sign({data: username} , "Secret_Key",{
        expiresIn: "24h"
    });
}


module.exports ={
    authenticateToken,
    generateAccessToken,
}