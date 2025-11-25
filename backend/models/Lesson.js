
import { Schema, model } from 'mongoose';

const lessonSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  videoUrl: { type: String },
  audioUrl: { type: String },
  pdfUrl: { type: String },
  order: { type: Number, required: true },
  duration: { type: String }, // e.g., "45 min"
  createdAt: { type: Date, default: Date.now }
});

export default model('Lesson', lessonSchema);