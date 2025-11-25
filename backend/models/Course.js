
import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  sheikh: { type: Schema.Types.ObjectId, ref: 'Sheikh', required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  duration: { type: String }, // e.g., "10 hours"
  lessonsCount: { type: Number, default: 0 },
  enrolledCount: { type: Number, default: 0 },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Course', courseSchema);
