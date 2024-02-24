import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error('useWorkoutContext must be used inside a WorkoutContextProvider');
  }

  return context;
}