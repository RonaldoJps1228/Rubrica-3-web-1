import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,
  Routes,Route
  } from 'react-router-dom'
import Inicio from './components/Inicio'
import Login from './components/Login'
import Admin from './components/Admin'
import Navbar from './components/Navbar'
import Usuario from './components/Usuario'
import { auth } from './firebase'
import React from 'react'

function App() {
const [firebaseUser,setFirebaseUser]=React.useState(false)
React.useEffect(()=>{
  auth.onAuthStateChanged(user=>{
    console.log(user);
    if (user) {
      setFirebaseUser(user)
    } else {
      setFirebaseUser(null)
    }
  })
},[])

  return firebaseUser !==false ? (
    <Router>
      <div className='container'>
        <Navbar firebaseUser={firebaseUser}/>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='admin' element={<Admin/>}/>
          <Route path='usuario' element={<Usuario/>}/>

        </Routes>
      </div>

    </Router>
  ):
  (<p>Loading...</p>)
}

export default App
