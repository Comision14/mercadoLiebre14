"use strict";

const addresses = [
  {
    userId: 1,
    typeId : 1,
    createdAt: new Date(),
  },
  {
    userId: 2,
    typeId : 1,    
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Addresses", addresses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
