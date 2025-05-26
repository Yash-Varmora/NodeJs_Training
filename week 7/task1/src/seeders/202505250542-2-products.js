
import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Products', [
    {
      name: 'Laptop',
      price: 999.99,
      stock: 10,
      sellerId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Smartphone',
      price: 499.99,
      stock: 20,
      sellerId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Products', null, {});
}
