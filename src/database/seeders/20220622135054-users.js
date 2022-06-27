"use strict";
const bcryptjs = require('bcryptjs');

const users = [
  {
    name: "admin",
    surname : "admin",
    email : "admin@gmail.com",
    password : bcryptjs.hashSync("123123",10),
    rolId : 1,
    createdAt: new Date(),
  },
  {
    name: "Eric",
    surname : "Mena",
    email : "menaericdaniel@gmail.com",
    password : bcryptjs.hashSync("123123",10),
    rolId : 2,
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
