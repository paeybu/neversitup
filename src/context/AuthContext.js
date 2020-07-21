import { createContext } from 'react';

const token = localStorage.getItem('token');
const AuthContext = createContext(token);

export default AuthContext;
