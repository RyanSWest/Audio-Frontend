import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { UserAuthProvider } from './util/UserContextProvider.jsx'
import App from './App.jsx';
import Dash from './Dash.jsx';
 import Register from './Register.jsx';
 import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UserAuthProvider >  
      <Router>  

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/upload" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

   </UserAuthProvider>
   </StrictMode>,
)
