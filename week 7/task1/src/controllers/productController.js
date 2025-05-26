import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import sequelize from '../config/sequelize.js';

export const createProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Seller') {
        return res.status(403).json({ error: 'Only Sellers can create products' });
    }

    try {
        const product = await Product.create({ name, price, stock, sellerId: userId });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

export const getAllProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Product.findAndCountAll({
            offset,
            limit,
        });
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            products: rows,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Seller') {
        return res.status(403).json({ error: 'Only Sellers can update products' });
    }

    try {
        const result = await sequelize.transaction(async (t) => {
            const product = await Product.findByPk(id, { transaction: t });
            if (!product) {
                throw new Error('Product not found');
            }
            if (product.sellerId !== userId) {
                throw new Error('You can only update your own products');
            }

            await product.update({ name, price, stock }, { transaction: t });

            if (price) {
                await Cart.update(
                    { price },
                    { where: { productId: id }, transaction: t }
                );
            }

            return product;
        });

        res.json(result);
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 403).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    if (role !== 'Seller') {
        return res.status(403).json({ error: 'Only Sellers can delete products' });
    }

    try {
        await sequelize.transaction(async (t) => {
            const product = await Product.findByPk(id, { transaction: t });
            if (!product) {
                throw new Error('Product not found');
            }
            if (product.sellerId !== userId) {
                throw new Error('You can only delete your own products');
            }

            await Cart.destroy({ where: { productId: id }, transaction: t });

            await product.destroy({ transaction: t });
        });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 403).json({ error: error.message });
    }
};