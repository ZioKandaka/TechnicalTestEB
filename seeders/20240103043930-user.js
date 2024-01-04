'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
        user: 'admin',
        password: 'admin123',
        email: 'admin@gmail.com',
        createdAt: new Date(),
        createdBy: 'system@ebconnect.com'
      },
      {
        user: 'arlie',
        password: 'arlie123',
        email: 'newzioarlie@gmail.com',
        createdAt: new Date(),
        createdBy: 'system@ebconnect.com'
      }
    ]
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
