import { Request, Response } from "express";
import { addCategory, getAllCategories } from "../services/category.service";

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await addCategory(name);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { createCategory, getCategories };