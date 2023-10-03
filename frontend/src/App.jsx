import './App.css'
import { Routes, Route } from 'react-router-dom'
import MenteeRegister from './pages/MenteeRegister'
import MentorRegister from './pages/MentorRegister'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Services from './pages/Services'
import AllMentors from './pages/AllMentors'
import MentorDetails from './pages/MentorDetails'
import MenteeLogin from './pages/Auth/MenteeLogin'
import MentorLogin from './pages/Auth/MentorLogin'
import LoginPage from './pages/Auth/LoginPage'



const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/mentee-login' element={<MenteeLogin />} />
        <Route path='/mentor-login' element={<MentorLogin />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/mentee-register' element={<MenteeRegister />} />
        <Route path='/mentor-register' element={<MentorRegister />} />
        <Route path='/all-mentors' element={<AllMentors />} />
        <Route path="/mentor/:id" element={<MentorDetails />} />
      </Routes>

    </div >
  )
}

export default App
