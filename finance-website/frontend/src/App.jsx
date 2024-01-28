import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
    </AuthProvider>
  )
}

export default App
