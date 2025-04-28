import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './components/header'
import AddItemList from './components/addItem'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <Router>
      <div>
        <Header />
        
        <Routes> 
        
        <Route path='/addItem' element={<AddItemList />} /> 
          
        </Routes>
      </div>
    </Router>
  )
}

export default App
