import { Router } from "express";
import { 
    register, 
    login, 
    resetUserPassword 
} from "../controllers/user.controller";

import { resetPasswordHandler } from "../controllers/reset.controller";
import { requestPasswordResetHandler } from "../controllers/reset.controller";
const router = Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/reset-password", resetUserPassword);
router.post("/request-password-reset", requestPasswordResetHandler);
router.post("/reset-password", resetPasswordHandler);

export default router;