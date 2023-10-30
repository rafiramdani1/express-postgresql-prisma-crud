import { deleteProductById, editProduct, findProductById, findProductByName, findProducts, insertProduct } from "./product.repository.js";

export const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

export const getProductById = async (id) => {
  const product = await findProductById(id)

  if (!product) throw Error('Product not found');

  return product;
}

export const createProduct = async (newProductData) => {
  const findProduct = await findProductByName(newProductData.name);

  if (findProduct) {
    throw new Error('name has to be unique')
  }

  const product = await insertProduct(newProductData);
  return product
}

export const deleteProduct = async (id) => {
  await getProductById(id);

  await deleteProductById(id);
}

export const editProductById = async (id, productData) => {

  await getProductById(id);

  const findProduct = await findProductByName(productData.name)

  if (findProduct && findProduct.id !== id) {
    throw new Error('name has to be unique')
  }

  const product = await editProduct(id, productData);

  return product;
}