import { useAuthContext } from './useAuthContext';
import { useWorkoutContext } from './useWorkoutContext';

export function useLogout() {

  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutContext();

  const logout = () => {

    localStorage.removeItem('user');

    dispatch({type: 'LOGOUT'});
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
  }

  return {logout};
}