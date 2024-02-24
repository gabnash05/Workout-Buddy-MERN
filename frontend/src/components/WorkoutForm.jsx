import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from '../hooks/useAuthContext';

export default function() {
  const {dispatch} = useWorkoutContext();
  const {user} = useAuthContext();

  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return;
    }

    const workout = {title, reps, load};

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle('');
      setReps('');
      setLoad('');
      setError(null);
      setEmptyFields([]);
      console.log("New workout added", json)

      dispatch({type: 'CREATE_WORKOUT', payload: json});
    }
  }

  return(
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title: </label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}  
      />

      <label>Load (in lbs): </label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load} 
        className={emptyFields.includes('load') ? 'error' : ''} 
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}