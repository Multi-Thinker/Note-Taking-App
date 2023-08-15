'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Notes',
      [
        {
          id: 'a2eb515c-9f45-4db2-8790-bb06f101b54a',
          title: 'Note Title 1',
          content: 'Note content 1',
          noteType: 'text',
          userId: 'e681a5f5-4072-4d5f-9b54-477ebc99e3eb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3b2a04db-2065-4d28-88bf-aa833f0d5d16',
          title: 'Note Title 2',
          content: 'Note content 2',
          noteType: 'image',
          userId: 'e681a5f5-4072-4d5f-9b54-477ebc99e3eb',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Notes', null, {});
  },
};
