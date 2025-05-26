import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import sequelize from '../config/sequelize.js';

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Buyer') {
        return res.status(403).json({ error: 'Only Buyers can add to cart' });
    }

    try {
        const result = await sequelize.transaction(async (t) => {
            const product = await Product.findByPk(productId, { transaction: t });
            if (!product) {
                throw new Error('Product not found');
            }
            if (product.stock < quantity) {
                throw new Error('Insufficient stock');
            }


            const cartItem = await Cart.create(
                {
                    userId,
                    productId,
                    quantity,
                    price: product.price,
                },
                { transaction: t }
            );

            return cartItem;
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 400).json({ error: error.message });
    }
};

export const viewCart = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Buyer') {
        return res.status(403).json({ error: 'Only Buyers can view cart' });
    }

    try {
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product, attributes: ['name', 'price'] }],
        });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

export const removeFromCart = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Buyer') {
        return res.status(403).json({ error: 'Only Buyers can remove from cart' });
    }

    try {
        await sequelize.transaction(async (t) => {
            const cartItem = await Cart.findByPk(id, { transaction: t });
            if (!cartItem) {
                throw new Error('Cart item not found');
            }
            if (cartItem.userId !== userId) {
                throw new Error('You can only remove your own cart items');
            }

            const product = await Product.findByPk(cartItem.productId, { transaction: t });
            if (product) {
                await product.update({ stock: product.stock + cartItem.quantity }, { transaction: t });
            }

            await cartItem.destroy({ transaction: t });
        });

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 403).json({ error: error.message });
    }
};