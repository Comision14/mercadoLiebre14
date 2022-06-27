"use strict";

const categories = [
  {
    name: "Ultimos agregados",
    createdAt: new Date(),
  },
  {
    name: "En oferta",
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
