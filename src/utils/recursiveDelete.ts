import Todo from "../models/Todo.js";

// Recursively delete a todo and all its nested subtasks
// We walk the tree depth-first, deleting children before parents
export async function recursiveDelete(todoId: string): Promise<void> {
  const todo = await Todo.findById(todoId).populate("subtasks");
  if (!todo) return;

  // Delete all subtasks first (recursive call)
  for (const subtask of todo.subtasks) {
    await recursiveDelete(subtask._id.toString());
  }

  // Then delete the parent
  await Todo.findByIdAndDelete(todoId);
  console.log(`🗑️ Todo ${todoId} deleted (including subtasks)`);
}
