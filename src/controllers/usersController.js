const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const users = require("../data/usersDataBase.json");

module.exports = {
  register: (req, res) => {
    return res.render("userRegister");
  },
  processRegister: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let { name, surname, email, pass } = req.body;
      let lastId = users.length !== 0 ? users[users.length - 1].id : 0;

      //guardar los datos
      let user = {
        id: lastId + 1,
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        pass: bcryptjs.hashSync(pass, 10),
        avatar: "default.png",
        rol: "user",
      };
      users.push(user);
      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "usersDataBase.json"),
        JSON.stringify(users, null, 3),
        "utf-8"
      );
      //levantar sessión

      //redireccionar
      return res.redirect("/users/login");
    } else {
      return res.render("userRegister", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  login: (req, res) => {
    return res.render("userLogin");
  },
  processLogin: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const {id,name,avatar,rol} = users.find(user => user.email === req.body.email)
        req.session.userLogin = {
            id,
            name,
            avatar,
            rol
        }
        if(req.body.remember){
            res.cookie('mercadoLiebre14',req.session.userLogin,{maxAge:1000*60*2})
        }
        res.redirect('/')
    } else {
      return res.render("userLogin", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  profile: (req, res) => {
    return res.render("userProfile");
  },
  logout : (req,res) => {
    req.session.destroy();
    res.cookie('mercadoLiebre14',null,{maxAge : -1})
    res.redirect('/')
  }
};
