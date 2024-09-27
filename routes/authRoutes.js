import { Router } from "express";
import { login, userRegistration } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/register", userRegistration);

export default router;
