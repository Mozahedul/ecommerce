import colors from 'colors';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    const sampleProduct =
      Array.isArray(products) &&
      products.length > 0 &&
      products.map(product => {
        return { ...product, user: adminUser };
      });
    await Product.insertMany(sampleProduct);
    console.log(colors.green.inverse(`Data Imported From Seeder Script`));
    process.exit();
  } catch (error) {
    console.log(colors.red.inverse`${error}`);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(colors.red.inverse('Data Destroyed With Seeder Script'));
    process.exit();
  } catch (error) {
    console.log(colors.red.inverse(`${error}`));
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
