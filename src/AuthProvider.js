// AuthProvider.js - Context provider for authentication state
import React, {createContext, useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
