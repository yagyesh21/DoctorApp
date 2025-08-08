import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import Above from './pages/Above';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointments from './pages/Appointments';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
   <div className='mx-4 sm:mx-[10%]'> 
   <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/doctors' element={<Doctors/>}/>
    <Route path='/doctors/:speciality' element={<Doctors/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/about' element={<Above/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/my-profile' element={<MyProfile/>}/>
    <Route path='/my-appointments' element={<MyAppointments/>}/>
    <Route path='/appointments/:docId' element={<Appointments/>}/>
    </Routes>
   <Footer/>
   </div>
  )
}

export default App;