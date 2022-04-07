const dbconn = require('../configs/dbConfig');

module.exports = {
    createUser: (data, callback) => {
        dbconn.query(`insert into users(first_name, last_name, gender, email, password, mobile, createdby, created_date) values(?, ?, ?, ?, ?, ?, ?, ?)`,[
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.mobile,
            data.createdby,
            new Date()
        ], (err, results, fields) => {
            if(err){
               return callback(err)
            }
            return callback(null, results)
        })
    },
    getUser: callback => {
        dbconn.query(`select id, first_name, last_name, gender, email, mobile, createdby, created_date from users`,
         [], (err, results, fields) => {
             if(err){
                 return callback(err)
             }
             return callback(null, results)
         })
    },
    getUserById: (id, callback) => {
        dbconn.query(`select id, first_name, last_name, gender, email, mobile, createdby, created_date from users where id = ?`,
        [id], (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results[0])
        })
    },
    updateUser: (data, callback) => {
         dbconn.query(`update users set first_name=?, last_name=?, gender=?, email=?, password=?, mobile=? where id = ? `,
         [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.mobile,
            data.id
         ], (err, results, fields) => {
             if(err){
                 return callback(err)
             }
             return callback(null, results)
         })
    },
    deleteUser: (data, callback) => {
        dbconn.query(`delete from users where id = ?`,[data.id],
        (err, results, fields) => {
            if(err){
                return callback(err)
            }
            return callback(null, results)
        })
    },

    getUserByEmail: (email, callback) => {
        dbconn.query(`select * from users where email = ?`,
        [email], (err, results, fields) => {
            if(err){
                callback(err)
            }
            return callback(null, results[0])
        })
    }
}