import express from 'express';
import dotenv from 'dotenv';
import { productRouter as productController } from './product/product.controller.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use('/products', productController)

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'route not found'
  })
})

app.listen(PORT, () => {
  console.log(`API running in port ${PORT}`);
});