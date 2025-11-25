import { Router } from 'express';
import Sheikh from '../models/Sheikh.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = Router();

// Get all Shuyukh
router.get('/', async (req, res) => {
  try {
    const shuyukh = await Sheikh.find().sort({ createdAt: -1 });
    res.json(shuyukh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single Sheikh
router.get('/:id', async (req, res) => {
  try {
    const sheikh = await Sheikh.findById(req.params.id);
    if (!sheikh) {
      return res.status(404).json({ error: 'Sheikh not found' });
    }
    res.json(sheikh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Sheikh (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const sheikh = new Sheikh(req.body);
    await sheikh.save();
    res.status(201).json(sheikh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Sheikh (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const sheikh = await Sheikh.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sheikh) {
      return res.status(404).json({ error: 'Sheikh not found' });
    }
    res.json(sheikh);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Sheikh (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const sheikh = await Sheikh.findByIdAndDelete(req.params.id);
    if (!sheikh) {
      return res.status(404).json({ error: 'Sheikh not found' });
    }
    res.json({ message: 'Sheikh deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
