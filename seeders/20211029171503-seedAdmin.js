'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users',[{
     name: "admin",
     email: "admin@mail.com",
     password: "$2a$10$w5fzoPf1lPHQDFhHvmAJ4OTZPKdp0BbTqQvMoHBaUJ//YigUYlpre",
     role: "admin"
   }]) 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};