'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password1', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 'e681a5f5-4072-4d5f-9b54-477ebc99e3eb',
          username: 'user1',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
