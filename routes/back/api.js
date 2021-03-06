var express = require("express");
var router = express.Router();
var conexion = require("../../bin/conection");
var format = require("date-format");
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_BASE_URL,
  secretAccessKey: process.env.REACT_APP_BASE_URL2
});

async function isLoggedIn(req, res, next) {
  // if (req.isAuthenticated())
  if (req.cookies["token"]) {
    if (!req.session.userid) {
      const url = "https://api.axontraining.com/sesion";
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + req.cookies["token"],
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const sesion = await response.json();
          if (sesion) {
            sql = `SELECT jos_users.id, jos_users.login, per_users_sectores.idsector
            FROM jos_users 
            INNER JOIN per_users_sectores ON per_users_sectores.userid = jos_users.id
            WHERE jos_users.id = ${sesion.id} `;
            var usuario = await makeQuery(sql);
            // if (!usuario[0]) {
            //   res.redirect("http://axontraining.com.ar/");
            // }

            req.session.userid = usuario[0].id;
            req.session.login = usuario[0].login;
            sql = `SELECT * FROM crm_admins WHERE login = '${usuario[0].login}'`;
            var admin = await conexion.makeQuery(sql);
            if (admin[0]) {
              req.session.role = admin[0].role;
            } else {
              req.session.role = "user";
            }
          }
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!res.locals.userid) {
      res.locals.userid = req.session.userid;
      res.locals.login = req.session.login;
      res.locals.role = req.session.role;
    }

    return next();
  } else {
    res.redirect("/login");
  }
}

/* GET home page. */
router.post("/", isLoggedIn, async function(req, res, next) {
  res.send({'hello': 'api'});
})

module.exports = router;
