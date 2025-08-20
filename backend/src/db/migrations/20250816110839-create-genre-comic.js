'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('genre_comic', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      genreId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'genres',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      comicId: {
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
    await queryInterface.dropTable('genre_comic');
  }
};
