import { Router } from "express";
import TodoController from "../controllers/TodoController.js";

const router = Router();

// All the standard CRUD operations for todos
router.post("/", TodoController.create);      // Create new todo
router.get("/", TodoController.list);         // Get all todos
router.get("/:id", TodoController.get);       // Get single todo by ID
router.put("/:id", TodoController.update);    // Update todo
router.delete("/:id", TodoController.delete); // Delete todo (and all subtasks)

export default router;
