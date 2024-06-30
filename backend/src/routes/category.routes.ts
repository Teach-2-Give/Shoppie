import { Router } from "express";
import { 
    createCategory, 
    getCategories, 
    removeCategory, 
    updateCategoryController
} from "../controllers/category.controller";

const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:id", removeCategory);
router.put("/:id", updateCategoryController);


export default router;