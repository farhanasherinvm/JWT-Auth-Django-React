import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
