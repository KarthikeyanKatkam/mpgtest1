import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User } from '../types';
import { mockUsers } from '../utils/mockData';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP_START' }
  | { type: 'SIGNUP_SUCCESS'; payload: User }
  | { type: 'SIGNUP_FAILURE'; payload: string };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'SIGNUP_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for saved auth state on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('mayaUser');
    if (savedUser) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: JSON.parse(savedUser),
      });
    }
  }, []);

  // Mock login
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching email
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password.length >= 6) { // Simple validation for demo
        localStorage.setItem('mayaUser', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed. Please try again.' });
    }
  };

  // Mock signup
  const signup = async (username: string, email: string, password: string) => {
    dispatch({ type: 'SIGNUP_START' });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        dispatch({ type: 'SIGNUP_FAILURE', payload: 'Email already in use' });
        return;
      }

      // Validate password length
      if (password.length < 6) {
        dispatch({ type: 'SIGNUP_FAILURE', payload: 'Password must be at least 6 characters long' });
        return;
      }

      // Create new user
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        username,
        email,
        createdAt: new Date(),
      };
      
      // In a real app, this would be an API call to create a user
      // For this demo, we'll just create a new user object
      localStorage.setItem('mayaUser', JSON.stringify(newUser));
      dispatch({ type: 'SIGNUP_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'SIGNUP_FAILURE', payload: 'Signup failed. Please try again.' });
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('mayaUser');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);