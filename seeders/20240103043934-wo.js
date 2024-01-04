'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
        ticketId: 1,
        status: 'OPEN',
        statusLevel: 10,
        isAccepted: false,
        createdAt: new Date(),
        createdBy: 'system@ebconnect.com'
      },
      {
        ticketId: 2,
        status: 'OPEN',
        statusLevel: 10,
        isAccepted: false,
        createdAt: new Date(),
        createdBy: 'system@ebconnect.com'
      },
      {
        ticketId: 3,
        status: 'OPEN',
        statusLevel: 10,
        isAccepted: false,
        createdAt: new Date(),
        createdBy: 'system@ebconnect.com'
      },
    ]
    await queryInterface.bulkInsert('WorkOrders', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WorkOrders', null, {})
  }
};
