const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require('../database/models');

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
    let user = db.User.findByPk(req.session.userLogin.id,{
      include : ['addresses']
    })
    let types = db.Type.findAll()
    Promise.all([user,types])
      .then(([user,types]) => res.render("userProfile", {
        user,
        types
      }))
  },
  update : (req,res) => {
    const {name,surname,password, address, city, state, type} = req.body;
    db.User.findByPk(req.session.userLogin.id,{
      attributes : ['password']
    })
      .then(user => {
        db.User.update(
          {
            name : name.trim(),
            surname : surname.trim(),
            password : password ? bcryptjs.hashSync(password, 10) : user.password,
            image : req.file && req.file.filename 
          },
          {
            where : {
              id : req.session.userLogin.id
            }
          }
        )
          .then( () => {
            db.Address.update(
              {
                address : address.trim(),
                city,
                state,
                typeId : type
              },
              {
                where : {
                  userId : req.session.userLogin.id
                }
              }
            ).then( () => res.redirect('/users/profile'))
          })
      }).catch(error => console.log(error))
  
  },
  logout : (req,res) => {
    req.session.destroy();
    res.cookie('mercadoLiebre14',null,{maxAge : -1})
    res.redirect('/')
  }
};
