import { Router } from 'express';
import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = Router();

// Get lessons by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single lesson
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course', 'title');
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create lesson (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();

    // Update course lessons count
    await Course.findByIdAndUpdate(req.body.course, { $inc: { lessonsCount: 1 } });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update lesson (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete lesson (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Update course lessons count
    await Course.findByIdAndUpdate(lesson.course, { $inc: { lessonsCount: -1 } });

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
