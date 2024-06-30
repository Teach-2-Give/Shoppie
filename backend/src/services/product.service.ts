import prisma from "../config/database";
import { Prisma } from "@prisma/client";

const addProduct = async (name: string, description: string, price: number, image: string, stockQuantity: number, categoryId: number) => {
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      stockQuantity,
      categoryId
    }
  });
  return newProduct;
};

const getAllProducts = async () => {
  return await prisma.product.findMany();
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } });
};

const updateProduct = async (id: number, data: Prisma.ProductUpdateInput) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};

const deleteProduct = async (id: number) => {
  await prisma.product.delete({ where: { id } });
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };