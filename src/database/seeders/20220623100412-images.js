"use strict";
const imagesDB = require('../../data/images.json');

const images = imagesDB.map(({image},i) => {
  return {
    file : image,
    primary : true,
    productId : i + 1,
    createdAt : new Date()
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", images, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
