import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TeamDashboard from './components/TeamDashboard'
import Home from './components/Home'
import Login from './components/Authentication/Login'
import Dashboard from './components/TeamDashboard'
import ProblemSelection from './components/ProblemSelection'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/problem-select' element={<ProblemSelection/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;