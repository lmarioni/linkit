var express = require("express");
var router = express.Router();
var conexion = require("../bin/conection");
var system = require("../bin/system");
var format = require("date-format");
var bcrypt = require("bcrypt");
const fetch = require("isomorphic-fetch");

async function isLoggedIn(req, res, next) {
  // if (req.isAuthenticated())

  if (req.cookies["token"]) {
    if (!req.session.userid) {

      try {
          var tokenDecode = system.decodeToken(req.cookies["token"]);

          if (tokenDecode) {
            sql = `SELECT * FROM users where id = ${tokenDecode.userId} `;
            var usuario = await conexion.makeQuery(sql);

            if (usuario.length === 0) {
             res.redirect("/");
           }else{
             req.session.username = usuario[0].username
           }

            // req.session.userid = usuario[0].id;
            // req.session.login = usuario[0].login;
            // sql = `SELECT * FROM crm_admins WHERE login = '${usuario[0].login}'`;
            // var admin = await conexion.makeQuery(sql);
            // if (admin[0]) {
            //   req.session.role = admin[0].role;
            // } else {
            //   req.session.role = "user";
            // }
          }
      } catch (error) {
        console.log(error);
      }
    }
    if (!res.locals.username) {
      res.locals.username = req.session.username;
    }

    return next();
  } else {
    res.redirect("/login");
  }
}

router.get("/",async function(req, res, next) {
//web home
    res.render('pages/home',{'hola': 'xD'})
});

router.get("/dashboard", isLoggedIn,async function(req, res, next) {
  // sql = `SELECT * FROM usuarios where id_usuario = 1`;
  // var usuario = await conexion.makeQuery(sql);

    res.render('pages/dashboard',{'hola': 'xD'})
});

router.get("/clean", async function(req, res, next) {

  //template basico para hacer una pagina nueva en el dash
  // sql = `SELECT * FROM usuarios where id_usuario = 1`;
  // var usuario = await conexion.makeQuery(sql);

    res.render('pages/clean',{'hola': 'xD'})
});

router.get("/profile", async function(req, res, next) {
  // sql = `SELECT * FROM usuarios where id_usuario = 1`;
  // var usuario = await conexion.makeQuery(sql);

    res.render('pages/profile',{'hola': 'xD'})
});


module.exports = router;
