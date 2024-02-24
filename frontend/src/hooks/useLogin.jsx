import { useState } from "react";
import { useAuthContext } from './useAuthContext.jsx';

export function useLogin() {
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function login(email, password) {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({email, password})
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      
      //update auth context
      dispatch({type: 'LOGIN', payload: json});

      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}