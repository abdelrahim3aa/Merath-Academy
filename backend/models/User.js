import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String, default: '' },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
  },
  {
    timestamps: true // adds createdAt & updatedAt automatically
  }
);

export default model('User', userSchema);
