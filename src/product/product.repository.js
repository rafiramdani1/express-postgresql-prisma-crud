import { prisma } from "../db/index.js";

export const findProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
}

export const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id }
  });

  return product;
};

export const findProductByName = async (productName) => {
  const product = await prisma.product.findFirst({
    where: {
      name: productName
    }
  });

  return product;
}

export const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price
    }
  });

  return product;
}

export const deleteProductById = async (id) => {
  await prisma.product.delete({
    where: { id }
  });
}

export const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      image: productData.image
    }
  });

  return product;
}