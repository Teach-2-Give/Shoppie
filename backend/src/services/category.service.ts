import prisma from "../config/database";


/**
 * addCategory
 * @param name 
 * @returns 
 */
const addCategory = async (name: string) => {
  const category = await prisma.category.create({
    data: { name }
  });
  return category;
};

/**
 * getAllCategories
 * @returns 
 */
const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export { addCategory, getAllCategories };