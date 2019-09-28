const express = require('express');
const router = express.Router();
const RoutineModel = require('../models/Routine');
const Routine = RoutineModel.routine;
const auth = require('../middleware/auth');
const sort = require('../utils/sort');
const genActivityHashTable = require('../utils/genActivityHashTable');

// @route   GET api/routines
// @desc    Get all users routines
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.user.id }).sort({
      date: -1
    });

    let _routines = [];
    routines.forEach(routine=>{
      let _routine = routine.toObject();

      let hashTable = genActivityHashTable(_routine);
      let sortedHashTable = sort(hashTable);
          if(sortedHashTable.length>=2){
            _routine.biggestActivities = sortedHashTable.slice(0,3);
          }else{
            _routine.biggestActivities = sortedHashTable.slice(0,sortedHashTable.length);
          }
      _routines.push(_routine);
    });
    res.json(_routines);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route   GET api/routines
// @desc    Get current routine of user
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const routine = await Routine.findOne({ _id: req.params.id });

    res.json(routine);
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
