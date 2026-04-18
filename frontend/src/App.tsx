<<<<<<< HEAD
  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
  import LoginPage from './pages/LoginPage'
  import RegisterPage from './pages/RegisterPage'
  import DashboardPage from './pages/DashboardPage'
  import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>)
=======
import LoginPage from './pages/LoginPage'      

function App() {
  return <LoginPage />
>>>>>>> 2acabeb6637c78c646df90d024b85d385a4454d5
}

export default App