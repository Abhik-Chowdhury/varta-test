import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </>    
  )
}

export default App