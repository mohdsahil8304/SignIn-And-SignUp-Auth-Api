const con = require("../../config/database");

module.exports ={
    create:(data,callback) =>{
        con.query(
            "INSERT INTO registeration(fullname,email,password,confirmpassword)  VALUES(?,?,?,?)",
    [data.fullname,
     data.email,
     data.password,
     data.confirmpassword],
    (err, result, fields) => {
      if (err) {return callback(err)};
      return callback(null,result);
    }
  );
        
    },
    getUser : callback =>{
        con.query(
            "SELECT  id,fullname,email,password,confirmpassword from registeration",
    [],
    (err, result, fields) => {
      if (err) {return callback(err)};
      return callback(null,result);
    }
  );
    },
    getUserById : (id,callback) =>{
        con.query(
            "SELECT id,fullname,email,password,confirmpassword from registeration WHERE id =?",
    [id],
    (err, result, fields) => {
      if (err) {return callback(err)};
      return callback(null,result[0]);
    }
  );
    },
    updateUser : (data,callback) =>{
        con.query(
            "UPDATE registeration set firstname = ?,lastname = ?,gender = ?,email = ?,password = ?,number =?  WHERE id =?",
            [ 
                data.fullname,
                data.email,
                data.password,
                data.confirmpassword,
                data.id,
            ],
    (err, result, fields) => {
      if (err) {return callback(err)};
      return callback(null,result[0]);
    }
  );
    },
    deleteUser : (data,callback) =>{
        con.query(
            "DELETE from registeration WHERE email = ?",
    [data.email],
    (err, result, fields) => {
      if (err) {return callback(err)};
      return callback(null,result[0]);
    }
  );
    },
    getUserByEmail : (email,callback) =>{
        con.query(
            "SELECT * FROM registeration WHERE email = ?",
    [email],
    (err, result, fields) => {
      if (err) {return callback(err)};
      return callback(null,result[0]);
    }
  );
    }
}