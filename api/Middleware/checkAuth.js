const jwt = require("jsonwebtoken");


module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token,'crud token')
        next();

    }catch(err){
        return res.status(401).json({
            msg:"Invalid token"
        })
    }
}