import React , {useState} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import About from './components/about/About';
import HomePage from './components/home/HomePage'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'


function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
    
    <Navbar  authenticated={authenticated} setAuthenticated= {setAuthenticated}/>
    
    <div className="container mx-auto p-8">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path="/about" element={<About/>} />
          
          <Route path="/login" element={<Login  setAuthenticated={setAuthenticated}/>} />
          <Route path="/signup" element={<Signup />} />
           

        </Routes>
      </div>
    </Router>
  )
}

export default App
