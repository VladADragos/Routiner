const express = require('express');
const router = express.Router();
const RoutineModel = require('../models/Routine');
const Routine = RoutineModel.routine;
const Activity = RoutineModel.activity;
const auth = require('../middleware/auth');
// @route   POST api/activities
// @desc    Adds activity
// @access  Private
router.post('/', auth, async (req, res) => {
  const { activity, routineId, day } = req.body;

  const { name, icon, from, to } = activity;
  const newActivity = new Activity({ name, icon, from, to });
  let routine = await Routine.findById(routineId);

  // checks if routine exists
  if (!routine) return res.status(404).json({ msg: 'Routine not found' });

  // checks if routine belongs to requesting user
  if (routine.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  routine.days[day].push(newActivity);

  routine.save();
  res.json(newActivity);
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// @route   PUT api/activities
// @desc    Edits activity
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, from, to, day, routineId } = req.body;

  try {
    let routine = await Routine.findById(routineId);

    // checks if routine exists
    if (!routine) return res.status(404).json({ msg: 'Routine not found' });

    // checks if routine belongs to requesting user
    if (routine.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    let activity = await routine.days[day].id(req.params.id);

    // checks if activity exists
    if (!activity) return res.status(404).json({ msg: 'Activity not found' });

    if (name) activity.name = name;
    if (from) activity.from = from;
    if (to) activity.to = to;

    routine.save();
    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/activities
// @desc    Deletes activity
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  const { routineId, day } = req.body;

  console.log(req.body);

  console.log(req.params.id);
  console.log(day);
  console.log(routineId);

  try {
    let routine = await Routine.findById(routineId);

    // checks if routine exists
    if (!routine) return res.status(404).json({ msg: 'Routine not found' });

    // checks if routine belongs to requesting user
    if (routine.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    let activity = await routine.days[day].id(req.params.id);

    // checks if activity exists
    if (!activity) {
      return res.status(404).json({ msg: 'Activity not found' });
    } else {
      activity.remove();
    }

    routine.save();
    res.json({ msg: 'Activity removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
