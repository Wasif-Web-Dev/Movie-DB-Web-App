import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='bg-[#1F1E24] h-screen flex'>

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App