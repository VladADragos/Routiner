const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');
const auth = require('../middleware/auth');

// @route   GET api/routines
// @desc    Get all users routines
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // const routine = new Routine({
    //   user: req.user.id,
    //   name: 'testtt'
    // });
    const routines = await Routine.find({ user: req.user.id }).sort({
      date: -1
    });

    // routine.save();
    res.json(routines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route   POST api/routines
// @desc    Adds routine
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const routine = new Routine({
      user: req.user.id,
      name: req.body.name,
      season: req.body.season
    });

    routine.save();
    res.json(routine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route   DELETE api/routines
// @desc    Removes routine
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let routine = await Routine.findById(req.params.id);

    if (!routine) return res.status(404).json({ msg: 'Routine not found' });

    if (routine.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Routine.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Routine removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route   PUT api/routines
// @desc    Edits routine
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, season } = req.body;

  const routineFields = {};

  // checking which fields exist and adding them
  if (name) routineFields.name = name;
  if (season) routineFields.season = season;

  try {
    let routine = await Routine.findById(req.params.id);

    // checks if routine exists
    if (!routine) return res.status(404).json({ msg: 'Routine not found' });

    // checks if routine belongs to requesting user
    if (routine.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // edits routine & saves to database
    routine = await Routine.findByIdAndUpdate(
      req.params.id,
      { $set: routineFields },
      { new: true }
    );

    res.json(routine);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
