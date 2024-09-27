import { Router } from "express";
import {
  getAllTask,
  updateTask,
  deleteTask,
  getAllTaskById,
  add,
  updateTaskStatus,
} from "../controllers/crudController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/add_task", authMiddleware, add);
router.get("/all_task", authMiddleware, getAllTask);
router.get("/:id", authMiddleware, getAllTaskById);
router.put("/update_task/:id", authMiddleware, updateTask);
router.put("/update_task_status/:id", authMiddleware, updateTaskStatus);

router.delete("/delete_task/:id", authMiddleware, deleteTask);

export default router;
