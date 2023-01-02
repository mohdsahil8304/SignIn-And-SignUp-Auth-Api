const {create,getUser,getUserById,updateUser,deleteUser,getUserByEmail} = require("./user.service")
const { hashSync, genSaltSync, compareSync} = require("bcrypt");
const jwt = require("jsonwebtoken");
const con = require("../../config/database");
// const secrateKey = "secrateKey";

module.exports ={
    getUserById : (req,res) =>{
        const id = req.params.id;
        getUserById(id,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success : 0,
                    message : "Record not Found",
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            })
        })
    },
    getUser : (req,res) =>{
        getUser((err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success : 1,
                data : result
            })
        })
    },
    updateUser : (req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateUser(body,(err,result) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success : 0,
                    message : "Failed to update user",
                });
            }
            return res.status(200).json({
                success : 1,
                message : "updated successfully"
            })
        })
    },
    deleteUser : (req,res) =>{
        const body = req.body;
        console.log(body);
        deleteUser(body,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success : 0,
                    message : "Record not Found",
                });
            }
            return res.status(200).json({
                success : 1,
                message : "user deleted successfully"
            })
        })
    },
    signup : (req,res) =>{
        const body = req.body;
        console.log(body);
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        console.log(body.password);
        body.confirmpassword = hashSync(body.confirmpassword,salt)
        console.log(body.confirmpassword)
        create(body,(err,result) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                })
            }
           else if(body.password !== body.confirmpassword){
                return res.json({
                    success : 0,
                    message : "password does not match"
                }) 
                
            }else{
                return res.status(200).json({
                    success : 1,
                    message : result
                })
            }
            
        })
    },
    login : (req,res)=>{
        const body = req.body;
        console.log(body);
        getUserByEmail(body.email,(err,result) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success : 0,
                    message : "Invalid email or password",
                });
            }
            const results = compareSync(body.password,result.password);
            console.log(result.password)
            if(results){
                // result.password = undefined;
                const jsonwebtoken = jwt.sign({result : result}, "secrateKey",{
                    expiresIn :"1h"
                });
                console.log(jsonwebtoken);
                return res.json({
                    success : 1,
                    message : "login successfully",
                    token : jsonwebtoken
                });
            }else{
                return res.json({
                    success : 0,
                    message : "Invalid email or password",
                });
            }
            
        })
    }
}
