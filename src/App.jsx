import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import './App.css'
import Login from './components/admin/Login'
import Signup from './components/admin/Signup'
import Requests from './components/admin/Requests'
import Profile from './components/admin/Profile'
import Stats from './components/admin/Stats'
import Home from './components/admin/Home'

function App() {

  return (
    <>
      <Router>
        <Routes >
        <Route path="/"  element={<Home />}/>
        <Route path="/login"  element={<Login />}/>
        <Route path="/signup"  element={<Signup />}/>
        <Route path="/requests"  element={<Requests  />}/>
        <Route path="/profile"  element={<Profile />}/>
        <Route path="/stats"  element={<Stats />}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
