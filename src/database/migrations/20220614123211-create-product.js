'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull : false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull : false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : {
            tableName : 'categories'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};