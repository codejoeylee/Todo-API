import type { Request, Response } from "express";
import type { ITodo } from "../models/Todo.js";
import Todo from "../models/Todo.js";
import { recursiveDelete } from "../utils/recursiveDelete.js";


export default class TodoController {
  // Create a new todo from request body and save it
  static async create(req: Request, res: Response) {
    try {
      const todo: ITodo = new Todo(req.body);
      const saved = await todo.save();
      res.json(saved);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  // Fetch all todos with their subtasks populated
  static async list(req: Request, res: Response) {
    const todos = await Todo.find().populate("subtasks");
    res.json(todos);
  }

  // Get a single todo by ID with all its subtasks
  static async get(req: Request, res: Response) {
    try {
      const todo = await Todo.findById(req.params.id).populate("subtasks");
      if (!todo) throw new Error("Todo not found");
      res.json(todo);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  // Update a todo - if marked as completed, set the timestamp and schedule deletion
  static async update(req: Request, res: Response) {
    try {
      const updateData = { ...req.body };
      // When marking a todo as done, timestamp it so we know when
      if (req.body.completed === true) {
        updateData.doneAt = new Date();
      }

      // Update the todo and return the updated doc (new: true)
      const updated = await Todo.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updated) throw new Error("Todo not found");

      // If completed, schedule recursive deletion in 1 hour
      if (updated.completed) {
        setTimeout(async () => {
          await recursiveDelete(updated._id.toString());
        }, 60 * 60 * 1000);
      }

      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  // Delete a todo and cascade delete all its subtasks
  static async delete(req: Request, res: Response) {
    try {
      // Use recursive delete to wipe the todo and everything under it
      await recursiveDelete(req.params.id as string);
      res.json({ message: "Deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
