const bcryptjs = require('bcryptjs');
const { check, body } = require("express-validator");
const users = require('../data/usersDataBase.json');


module.exports = [
 
  check("email")
    .notEmpty()
    .withMessage("Debes proporcionar un email")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email válido"),

  body("pass")
    .notEmpty()
    .withMessage(
      "Debes ingresar tu contraseña"
    )
    .custom((value,{req}) => {
        const user = users.find(user => user.email === req.body.email);
        if(!user){
            return false
        }else {
            if(!bcryptjs.compareSync(value,user.pass)){
                return false
            }
        }
        return true
    })
    .withMessage('Credenciales inválidas'),
];
