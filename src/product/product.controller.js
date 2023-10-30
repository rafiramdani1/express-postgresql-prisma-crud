import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, editProductById } from './product.service.js';

export const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(parseInt(productId));

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);
    res.status(201).json({
      data: product,
      message: "product created successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

productRouter.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteProduct(parseInt(productId));

    res.json({
      message: 'Product deleted successfully'
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

productRouter.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    if (!(productData.name && productData.description && productData.price && productData.image)) {
      return res.status(400).json({
        message: 'some fields are missing'
      });
    };

    const product = await editProductById(parseInt(productId), productData);

    res.json({
      data: product,
      message: "product edited successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

productRouter.patch('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.json({
      data: product,
      message: "product edited successfully"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});