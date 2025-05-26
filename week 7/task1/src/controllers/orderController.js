
import sequelize from '../config/sequelize.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const placeOrder = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Buyer') {
        return res.status(403).json({ error: 'Only Buyers can place orders' });
    }

    try {
        const cartItems = await Cart.findAll({ where: { userId } });

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const result = await sequelize.transaction(async (t) => {
            const order = await Order.create(
                {
                    userId,
                    total: cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
                    status: 'Pending',
                },
                { transaction: t }
            );

            for (const item of cartItems) {
                const product = await Product.findByPk(item.productId, { transaction: t });
                if (!product || product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ${item.productId}`);
                }
                await product.update({ stock: product.stock - item.quantity }, { transaction: t });
            }

            await Cart.destroy({ where: { userId }, transaction: t });

            return order;
        });

        res.status(201).json({ message: 'Order placed successfully', order: result });
    } catch (error) {
        res.status(500).json({ error: `Failed to place order: ${error.message}` });
    }
};

export const getOrderHistory = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Buyer') {
        return res.status(403).json({ error: 'Only Buyers can view order history' });
    }

    try {
        const orders = await Order.findAll({ where: { userId } });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
};