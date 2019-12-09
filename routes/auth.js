var express = require("express");
var router = express.Router();
const fetch = require("isomorphic-fetch");

/* GET home page. */
router.get("/login", async function(req, res, next) {
  if (req.cookies["token"]) {
    res.redirect("/");
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

router.post("/login", async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  const url = "https://api.axontraining.com/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.ok) {
      const { token } = await response.json();
      if (process.env.NODE_ENV === "development") {
        recordar = { maxAge: 9999999999, httpOnly: true };
      } else {
        recordar = {
          domain: ".axontraining.com",
          maxAge: 9999999999,
          httpOnly: true
        };
      }
      res.cookie("token", token, recordar);

     res.redirect("/");
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
  // res.redirect("/");

 res.render("pages/auth/login");
});

module.exports = router;
