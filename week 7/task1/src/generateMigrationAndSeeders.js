import { writeFile,mkdir } from 'fs/promises';
import { join } from 'path';


const migrationTemplate = (tableName, fields) => `
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('${tableName}', {
    ${fields}
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('${tableName}');
}
`;

const seederTemplate = (tableName, data) => `
import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('${tableName}', [
    ${data}
  ], {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('${tableName}', null, {});
}
`;

const models = [
    {
        name: 'Users',
        migrationFields: `id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM('Buyer', 'Seller'),
      allowNull: false,
    },`,
        seederData: `{
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
    }`,
    },
    {
        name: 'Products',
        migrationFields: `id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },`,
        seederData: `{
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
    }`,
    },
    {
        name: 'Carts',
        migrationFields: `id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },`,
        seederData: null,
    },
    {
        name: 'Orders',
        migrationFields: `id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('Pending', 'Completed', 'Cancelled'),
      allowNull: false,
    },`,
        seederData: null,
    },
];

async function generateFiles() {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 12);
  const migrationSubfolder = join('src', 'migrations', timestamp);
  const seederSubfolder = join('src', 'seeders', timestamp);

  await mkdir(migrationSubfolder, { recursive: true });
  await mkdir(seederSubfolder, { recursive: true });

  const migrationOrder = ['users', 'products', 'carts', 'orders'];
  const seederOrder = ['users', 'products'];

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const tableName = model.name.toLowerCase();
    const orderIndex = migrationOrder.indexOf(tableName);

    const migrationFileName = `${timestamp}-${orderIndex + 1}-create-${tableName}.js`;
    const migrationPath = join(migrationSubfolder, migrationFileName);

    await writeFile(migrationPath, migrationTemplate(model.name, model.migrationFields));
    console.log(`Generated migration: ${migrationPath}`);

    if (model.seederData) {
      const seederIndex = seederOrder.indexOf(tableName);
      const seederFileName = `${timestamp}-${seederIndex + 1}-${tableName}.js`;
      const seederPath = join(seederSubfolder, seederFileName);
      await writeFile(seederPath, seederTemplate(model.name, model.seederData));
      console.log(`Generated seeder: ${seederPath}`);
    }
  }
}

async function main() {
    try {
        await generateFiles();
        console.log('All migration and seeder files generated successfully.');
    } catch (error) {
        console.error('Error generating files:', error.message);
    }
}

main();