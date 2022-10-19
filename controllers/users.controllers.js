const bcrypt = require('bcryptjs');
const userServices = require("../services/users.services");

exports.register = (req, res, next) =>{
    //get password
    const {password} = req.body;
    //gen salt
    const salt =bcrypt.genSaltSync(10);

    //hash password with bcrypt salt
    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body, (error, result) =>{
        if(error){
            return next(error);
        }
        //succes message 200
        return res.status(200).send({
            message:"Success",
            data: result,
        });
    });
};

exports.login = (req, res ,next) =>{
    const {username, password} = req.body;
    userServices.login({username, password}, (error, result)=>{
        if(error){
            return next(error);
        }
        //succes message 200
        return res.status(200).send({
            message:"Success",
            data: result,
        });
    })
}

//authorize user
exports.userProfile =(req, res, next)=>{
return res.status(200).json({message: "Authorized user"})
}