'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
        type: 'email',
        receiver: 'newzioarlie@gmail.com',
        createdAt: new Date(),
        createdBy: 'system@ebconnect.com'
      }
    ]
    await queryInterface.bulkInsert('Notifications', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {})
  }
};
