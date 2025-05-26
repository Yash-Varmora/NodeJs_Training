
import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Users', [
    {
      username: 'buyer1',
      password: await bcrypt.hash('password123', 10),
      role: 'Buyer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'seller1',
      password: await bcrypt.hash('password123', 10),
      role: 'Seller',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}
