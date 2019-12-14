var express = require("express");
var router = express.Router();
const fetch = require("isomorphic-fetch");
var conexion = require("../bin/conection");
var system = require("../bin/system");
var bcrypt = require("bcrypt");


router.get('/register', async function(req, res, next){
  // var prueba = system.createToken(2);
   var data = {
     status: 'hola'
   }
   res.render('pages/auth/register',data);
 })
 
 router.post('/register', async function(req, res, next){
   var email = req.body.email;
   var username = req.body.username;
   var contrasena = req.body.contrasena;
   var repcontrasena = req.body.repcontrasena;
 
   //vars rta
   var status = 'success';
   var message = 'Registrado con exito';
 
   var sql = `SELECT * FROM users WHERE email = '${email}' OR  username = '${username}'`;
   var existe = await conexion.makeQuery(sql);
 
   if(existe.length > 0){
 
     if(existe[0].email === email){
       status = 'error';
       message = 'Ya existe un usuario con ese email';
     }
 
     if(existe[0].username === username){
       status = 'error';
       message = 'Ya existe un usuario con ese username';
     }
 
   }else{
     if(contrasena === repcontrasena){
         //guardo en la tabla
         contrasena = bcrypt.hashSync(contrasena, 10);
         sql = `INSERT INTO users(username, email, password) VALUES ('${username}','${email}','${contrasena}')`;
         var insertUser = await conexion.makeQuery(sql);

        
        res.cookie("token", token, recordar);

         if(insertUser.insertId === 0){
           status = 'error';
           message = 'No se pudo registrar el usuario';
         }else{
            if (process.env.NODE_ENV === "development") {
              var recordar = { maxAge: 9999999999, httpOnly: true };
            } else {
              // var recordar = {
              //   domain: ".axontraining.com",
              //   maxAge: 9999999999,
              //   httpOnly: true
              // };
            }
            var token = system.createToken(insertUser.insertId);
  
           status = 'success';
           message = 'Usuario creado.';
         }
     }else{
       status = 'error';
       message = 'Las contraseñas no coinciden';
     }
    
 
   }
  if(status === 'error'){
   var rta = {
     status: status,
     message: message,
   }
   console.log(rta);
   res.render('pages/auth/register',rta)
  }else{
 
  }
   
 res.redirect('/admin');
 })

/* GET home page. */
router.get("/login", async function(req, res, next) {
  // if (req.cookies["token"]) {
  //   res.redirect("/");
  // }

  res.render("pages/auth/login");
});

router.post("/login", async function(req, res, next) {
  var username = req.body.username;
  var contrasena = req.body.contrasena;

  console.log(username)
  console.log(contrasena)

     //vars rta
     var status = 'success';
     var message = 'Login con exito';
   
     var sql = `SELECT * FROM users WHERE email = '${username}' OR  username = '${username}'`;
     var usuario = await conexion.makeQuery(sql);

     if(usuario.length > 0){
       var iguales = bcrypt.compareSync(contrasena, usuario[0].password);
        if(iguales){
          //login correcto
          if (process.env.NODE_ENV === "development") {
            var recordar = { maxAge: 9999999999, httpOnly: true };
          } else {
            // var recordar = {
            //   domain: ".axontraining.com",
            //   maxAge: 9999999999,
            //   httpOnly: true
            // };
          }
          var token = system.createToken(usuario[0].id);
          res.cookie("token", token, recordar);
        }else{
          status = 'error';
          message = 'Contraseña incorrecta';
        }
     }else{
       status = 'error';
       message = 'Usuario no encontrado';
     }

     if(status=== 'success'){
       res.redirect('/admin')
     }


 res.render("pages/auth/login");
});
router.get("/logout", function(req, res, next) {
  let domain = { domain: ".localhost" };
  if (process.env.NODE_ENV != "development") {
    domain = { domain: ".axontraining.com" };
  }

  res.clearCookie("token", domain);
  req.session.userid = 0;
  req.session.login = 0;
  res.redirect("/login");
});



module.exports = router;
