import { Router } from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Sheikh from '../models/Sheikh.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = Router();

// All routes require admin authentication
router.use(auth, adminAuth);

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const coursesCount = await Course.countDocuments();
    const shuyukhCount = await Sheikh.countDocuments();

    res.json({
      usersCount,
      coursesCount,
      shuyukhCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
