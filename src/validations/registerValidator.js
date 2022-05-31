const { check, body } = require("express-validator");

module.exports = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Mínimo dos caracteres")
    .bail()
    .isAlpha()
    .withMessage("Solo letras porfa!"),

  check("surname")
    .isLength({ min: 2 })
    .withMessage("Mínimo dos caracteres")
    .bail()
    .isAlpha()
    .withMessage("Solo letras porfa!"),

  body("email")
    .notEmpty()
    .withMessage("Debes proporcionar un email")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom((value,{req}) => {
      const user = users.find(user => user.email === value);
      if(user){
          return false
      }else {
        return true
      }
  }).withMessage('El email ya se encuentra registrado'),

  check("pass")
    .isLength({
      min: 6,
      max: 12,
    })
    .withMessage(
      "La contraseña debe tener un mínio de 6 y un máximo de 12 caracteres"
    ),

  body("pass2")
    .custom((value, { req }) => {
      if (value !== req.body.pass) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage(`La contraseña no coincide`),

  check("bases")
    .isString("on")
    .withMessage(
      "Debes aceptar las bases y condiciones"
    ),
];
