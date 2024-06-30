import prisma from "../config/database";

const addCategory = async (name: string) => {
  const category = await prisma.category.create({
    data: { name }
  });
  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export { addCategory, getAllCategories };