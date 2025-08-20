'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comics', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255)
      },
      slug: {
        type: Sequelize.STRING(255),
        unique: true
      },
      thumbnail: {
        type: Sequelize.STRING(255)
      },
      status: {
        type: Sequelize.STRING(255)
      },
      content: {
        type: Sequelize.TEXT
      },
      originalUrl: {
        type: Sequelize.STRING(255)
      },
      crawlStatus: {
        type: Sequelize.STRING(255),
        defaultValue: 'pending'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('comics');
  }
};
