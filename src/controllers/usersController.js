const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require('../database/models');

const users = require("../data/usersDataBase.json");

module.exports = {
  register: (req, res) => {
    return res.render("userRegister");
  },
  processRegister: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let { name, surname, email, pass } = req.body;

      db.User.create({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(pass, 10),
        image: "default.png",
        rolId: 2,
      })
        .then(user => {
            db.Address.create({
                userId : user.id,
                typeId : 1
            }).then( () => {
              return res.redirect("/users/login");
            })
        })
        .catch(error => console.log(error))
  
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
      
      const {email} = req.body

      db.User.findOne({
        where : {
          email
        }
      }).then( ({id,name,image, rolId}) => {
        req.session.userLogin = {
          id : +id,
          name,
          image,
          rol : +rolId
      }
      if(req.body.remember){
          res.cookie('mercadoLiebre14',req.session.userLogin,{maxAge:1000*60*2})
      }
      res.redirect('/')
      })
      
    } else {
      return res.render("userLogin", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id,{
      include : ['addresses']
    })
      .then(user => res.render("userProfile", {
        user
      }))
  },
  logout : (req,res) => {
    req.session.destroy();
    res.cookie('mercadoLiebre14',null,{maxAge : -1})
    res.redirect('/')
  }
};
