import mongoose, { Schema, Document, Types } from "mongoose";

// We Define the ITodo interface that extends Document for Mongoose
export interface ITodo extends Document {
  title: string;
  completed: boolean;
  doneAt?: Date;
  subtasks: Types.ObjectId[];
}

// We Define the Todo schema
const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  doneAt: { type: Date },
  subtasks: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
});

// TTL index: deletes 1 hour after doneAt
TodoSchema.index({ doneAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.model<ITodo>("Todo", TodoSchema);
