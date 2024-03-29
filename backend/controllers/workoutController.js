import Workout from '../models/WorkoutModel.js'
import mongoose from 'mongoose';


//GET ALL WORKOUTS
export async function getWorkouts(req, res) {

  const user_id = req.user._id;

  //get workouts
  const workouts = await Workout.find({ user_id }).sort({createdAt: -1});

  res.status(200).json(workouts);
}


//GET SINGLE WORKOUT
export async function getWorkout(req, res) {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Invalid ID, Workout not Found'});
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    res.status(404).json({error: 'Workout not found'});
  }

  res.status(200).json(workout);
}


//ADD WORKOUT
export async function addWorkout(req, res) {
  const {title, reps, load} = req.body;

  let emptyFields = [];
  
  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields})
  }

  //add workout to db 
  try {

    const user_id = req.user._id;
    const workout = await Workout.create({title, reps, load, user_id});
    res.status(200).json(workout);

  } catch (error) {
    res.status(400).json({error: error.message})
  }
} 


//DELETE WORKOUT
export async function deleteWorkout(req, res) {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Invalid ID, Workout not Found'});
  }

  const workout = await Workout.findOneAndDelete({_id: id});

  if (!workout) {
    return res.status(404).json({error: 'Workout not found'});
  }

  res.status(200).json(workout);
}


//UPDATE WORKOUT
export async function updateWorkout(req, res) {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Invalid ID, Workout not Found'});
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  });

  if (!workout) {
    return res.status(404).json({error: 'Workout not found'});
  }

  res.status(200).json(workout);
}