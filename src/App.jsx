// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// // import './App.css'
// import Login from './components/mof-admin-panel/Login'
// import Signup from './components/mof-admin-panel/Signup'
// import Analytics from './components/mof-admin-panel/Analytics'
// import RfiRegistrationRequests from './components/mof-admin-panel/RfiRegistrationRequests'
// import ReportRequests from './components/mof-admin-panel/ReportRequests'
// import Dashboard from './components/mof-admin-panel/Dashboard'
// import Profile from './components/mof-admin-panel/Profile'
// import Home from './components/mof-admin-panel/Home'



// function App() {

//   return (
//     <>
//       <Router>
        
//           <div className='fixed z-[500] '>
//             <Home />
//           </div>
//           <div className='ml-[20%] p-10 '>
//             <Routes >
//               <Route path="/mof"  element={<Dashboard />}/>
//               <Route path="/mof/login"  element={<Login />}/>
//               <Route path="/mof/signup"  element={<Signup />}/>
//               <Route path="/mof/report-requests"  element={<ReportRequests  />}/>
//               <Route path="/mof/profile"  element={<Profile />}/>
//               <Route path="/mof/analytics"  element={<Analytics />}/>
//               <Route path="/mof/rfi-requests"  element={<RfiRegistrationRequests />}/>
//             </Routes>
//           </div>
        
//       </Router>
      
//     </>
//   )
// }

// export default App


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import { useEffect } from 'react'

import Login from './components/mof-admin-panel/Login'
import Signup from './components/mof-admin-panel/Signup'
import Analytics from './components/mof-admin-panel/Dashboard'
import RegisteredRfi from './components/mof-admin-panel/RegisteredRfi'
import RfiRegistrationRequests from './components/mof-admin-panel/RfiRegistrationRequests'
import ReportRequests from './components/mof-admin-panel/ReportRequests'
import Dashboard from './components/mof-admin-panel/Dashboard'
import Profile from './components/mof-admin-panel/Profile'
import Home from './components/mof-admin-panel/Home'
import { useSelector } from 'react-redux'
import { selectUser } from './redux/features/userSlice'



const IsAuthenticated = () => {
  const user = useSelector(selectUser);
  return !!user;
  // return !!localStorage.getItem('token')
}
const ProtectedRoute = ({ element }) => {
  return IsAuthenticated() ? element : <Navigate to="/mof/login" />
}

function App() {
  // useEffect(()=>{
  //   const token = localStorage.getItem('token');
  //   if(token){
  //     IsAuthenticated();
  //   }
  // },[])

  return (
    <>
      <Router>
        {IsAuthenticated() && (
          <div className='fixed z-[500]'>
            <Home />
          </div>
        )}
        <div className={IsAuthenticated() ? 'ml-[15%] p-10' : 'p-10'}>
          <Routes>
            <Route path="/mof/login" element={<Login />} />
            <Route path="/mof/signup" element={<Signup />} />
            <Route path="/mof" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/mof/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/mof/analytics" element={<ProtectedRoute element={<Analytics />} />} />
            <Route path="/mof/registered-rfi" element={<ProtectedRoute element={<RegisteredRfi />} />} />
            <Route path="/mof/reports-history" element={<ProtectedRoute element={<ReportRequests />} />} />
            <Route path="/mof/report-requests" element={<ProtectedRoute element={<ReportRequests />} />} />
            <Route path="/mof/rfi-requests" element={<ProtectedRoute element={<RfiRegistrationRequests />} />} />
            <Route path="*" element={<Navigate to={IsAuthenticated() ? "/mof" : "/mof/login"} />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
