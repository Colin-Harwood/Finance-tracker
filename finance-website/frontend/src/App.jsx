import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Income from './pages/Income'
import Expenses from './pages/Expenses'
import Subscriptions from './pages/Subscriptions'
import IncomeGoal from './pages/IncomeGoal'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Settings from './pages/Settings'
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/income-goal" element={<IncomeGoal />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
    </AuthProvider>
  )
}

export default App
