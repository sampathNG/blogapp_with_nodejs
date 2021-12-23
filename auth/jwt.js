const jwt = require('jsonwebtoken');
// generate token
const generateToken = (data)=>{
    const token =jwt.sign({data},"sampath kumar")
    return token
}

// authenyicate token

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    const decode=jwt.verify(token,'sampath kumar')
    req.usedata=decode
        next()
        

}

module.exports={generateToken,authenticateToken}
