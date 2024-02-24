import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

export default function WorkoutDetails({workout}) {

  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  async function handleDelete() {

    if (!user) {
      return;
    }

    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json});
    }
  }

  return(
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Reps: </strong> {workout.reps}</p>
      <p><strong>Load (lbs): </strong> {workout.load}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className='material-symbols-outlined' onClick={handleDelete}>delete</span>
    </div>
  );
}