"use strict";

const categories = [
  {
    name: "visited",
    createdAt: new Date(),
  },
  {
    name: "in-sale",
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
