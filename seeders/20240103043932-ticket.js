'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        client: 'BACH',
        company: 'PTI',
        trouble: 'Vandalism',
        status: 'OPEN',
        statusLevel: 10,
        userId: 2,
        createdAt: new Date(),
        createdBy: `system@ebconnect.com`
      },
      {
        client: 'XL-Axiata',
        company: 'XL',
        trouble: 'Engine Breakdown',
        status: 'OPEN',
        statusLevel: 10,
        userId: 1,
        createdAt: new Date(),
        createdBy: `system@ebconnect.com`
      },
      {
        client: 'EB',
        company: 'Telkom',
        trouble: 'Unauthorized Consent',
        status: 'OPEN',
        statusLevel: 10,
        userId: 1,
        createdAt: new Date(),
        createdBy: `system@ebconnect.com`
      },
    ]
    await queryInterface.bulkInsert('Tickets', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tickets', null, {})
  }
};
