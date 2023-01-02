const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

module.exports = {
    checkToken : (req,res,next) =>{
        let token = req.get("authorization");
        console.log(token);
        if(token){
         token = token.slice(7);
         console.log(token);
         jwt.verify(token,"secrateKey",(err,decoded)=>{
            if(err){
                res.json({
                    success : 0,
                    message : "Invalid token"
                })
            }else{
                next();
            }
         })
        }else{
            res.json({
                success : 0,
                message : "Access denied! unautorized user"
            })
        }
    }
}

// { 
//     "fullname": "Mohd Sahil",
//     "email": "mohd0786@gmail.com",
//     "password": "12345",
//     "confirmpassword":"1235"
// }
// { 
//     "email": "khansahil0786@gmail.com",
//     "password": "12345"
// }

// checkToken : (req,res,next) =>{
//     const bearerHeader = req.headers["authorization"];
//     if(typeof bearerHeader !== "undefined"){
//         const bearer = bearerHeader.split(" ");
//         let token = bearer[1];
//         console.log(token);
//         req.token = token;
//         jwt.verify(req.token,"secrateKey",(err,decoded)=>{
//             if(err){
//                 res.json({
//                     success : 0,
//                     message : "Invalid token"
//                 })
//             }else{
//                 next();
//             }
//          })
//     } else if(typeof bearerHeader === "undefined"){
//         res.send({
//             result : "token is not valid"
//         })
//     }else{
//         res.json({
//             success : 0,
//             message : "Access denied! unautorized user"
//         })
//     }
// }