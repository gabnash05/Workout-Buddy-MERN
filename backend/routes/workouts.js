import express from 'express';
import { addWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

//authenticate all workouts route
router.use(requireAuth);


//GET all workouts
router.get('/', getWorkouts);

//GET single workout
router.get('/:id', getWorkout);

//POST a new workout
router.post('/', addWorkout);

//DELETE a workout
router.delete('/:id', deleteWorkout);

//UPDATE a workout
router.patch('/:id', updateWorkout);



export default router;