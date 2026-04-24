const express = require('express');
const Note = require('../models/Note');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/notes
// @desc    Get all public notes (with search & tag filter)
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { search, tag, sort = 'newest', page = 1, limit = 12 } = req.query;
    
    let query = { isPublic: true };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Tag filter
    if (tag) {
      query.tags = { $in: tag.split(',').map(t => t.trim().toLowerCase()) };
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'oldest': sortOption = { createdAt: 1 }; break;
      case 'views': sortOption = { viewCount: -1 }; break;
      case 'title': sortOption = { title: 1 }; break;
      default: sortOption = { createdAt: -1 }; // newest
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [notes, total] = await Promise.all([
      Note.find(query)
        .populate('author', 'username')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      Note.countDocuments(query)
    ]);

    res.json({
      notes,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/notes/mine
// @desc    Get current user's notes (all, including private)
// @access  Private
router.get('/mine', protect, async (req, res) => {
  try {
    const notes = await Note.find({ author: req.user._id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/notes/tags
// @desc    Get all unique tags with counts
// @access  Public
router.get('/tags', async (req, res) => {
  try {
    const tags = await Note.aggregate([
      { $match: { isPublic: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 30 }
    ]);
    
    res.json(tags.map(t => ({ name: t._id, count: t.count })));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Public (if public) / Private (if private, owner only)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('author', 'username');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // If note is private, only author can view
    if (!note.isPublic) {
      if (!req.user || req.user._id.toString() !== note.author._id.toString()) {
        return res.status(403).json({ message: 'This note is private' });
      }
    }

    // Increment view count
    note.viewCount += 1;
    await note.save();

    res.json(note);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/notes
// @desc    Create a note
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, tags, isPublic, isHTML } = req.body;

    // Only admins can create HTML notes (RBAC)
    const htmlAllowed = isHTML && req.user.role === 'admin';

    const note = await Note.create({
      title,
      content,
      author: req.user._id,
      tags: tags || [],
      isPublic: isPublic !== undefined ? isPublic : true,
      isHTML: htmlAllowed
    });

    const populated = await note.populate('author', 'username');
    res.status(201).json(populated);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note (owner only)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check ownership
    if (note.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this note' });
    }

    const { title, content, tags, isPublic, isHTML } = req.body;
    
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags !== undefined ? tags : note.tags;
    note.isPublic = isPublic !== undefined ? isPublic : note.isPublic;
    // Only admins can toggle HTML mode (RBAC)
    if (isHTML !== undefined && req.user.role === 'admin') {
      note.isHTML = isHTML;
    }

    const updated = await note.save();
    const populated = await updated.populate('author', 'username');

    res.json(populated);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note (owner only)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check ownership
    if (note.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
