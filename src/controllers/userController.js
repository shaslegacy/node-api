const {createUser, getUser, getUserById, updateUser, deleteUser, getUserByEmail, storeRefreshToken} = require('../models/userModel');
const { sendMailToUser } = require('../services/sendemail')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { createAccessJWT, createRefreshJWT } = require("../helper/jwt.helper")
const { setJWT, getJWT } = require("../helper/redis.helper");

const { sign } = require('jsonwebtoken')

module.exports = {
    createNewUSer: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        const email = body.email;
        createUser(body, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection Error"
                });
            }
            
            sendMailToUser(email)
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    getUser: (req, res) => {
        getUser((err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    data: "Database connection Error"
                })
            }
            if(!results){
                return res.json({
                    success: 0,
                    message:"Record Not Found"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection Error"
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message:"Record Not Found"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)

        updateUser(body, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection Error"
                })
            }
            if(!results){
                return res.json({
                    success: 0,
                    message:"Failed to update user"
                })
            }
            return res.status(200).json({
                success:1,
                message: "Updated Successfully"
            })
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection Error"
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message:"Record Not Found"
                })
            }
            return res.status(200).json({
                success:1,
                data:"Deleted Successfully"
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if(err){
                console.log(err)
            }
            if(!results){
               return res.json({
                   success: 0,
                   message: "Invalid Email Or Password"
               })
            }

            const result = compareSync(body.password, results.password);
            if (result) {
              results.password = undefined;

                
            //   const accessToken =  createAccessJWT(results, results.id);
              const accessToken = createAccessJWT(results, `${results.id}`);
              console.log(accessToken);

            //   const refreshToken = createRefreshJWT(results.email, `${results.id}`);

            //   const accessToken = sign({
            //               result: results
            //           }, process.env.JWT_ACCESS_TOKEN, {
            //     expiresIn: "15m"
            //   });

                setJWT(accessToken, results.id);

            //   const refreshToken = sign({
            //               result: results
            //           }, process.env.JWT_REFRESH_SECRET, {
            //     expiresIn: "30d"
            //   });

              

              // refresh token store in user db
                //   storeRefreshToken(refreshToken, results.id, (err, results) => {
                //       if (err) {
                //           console.log(err)
                //       }
                //   })
              
              return res.json({
                status: "success",
                message: "Login Successfully",
                accessToken
                // refreshToken
              });
            } else {
              return res.json({
                success: 0,
                data: "Invalid email or password"
              });
            }
        })
    }
}

exports.login = (req, res) => {

   EmployeeModel.getAllemployee((err, employees) => {

        if (err)
            res.send(err);
        console.log('Employee ', employees)
        res.send(employees)
    }) 
}