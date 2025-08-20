'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('author_comic', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      author_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'authors',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      comic_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'comics',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('author_comic');
  }
};
