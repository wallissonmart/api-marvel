import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Heroes } from './pages/Heroes'
import { Navbar } from './components/Navbar'
import { Details } from './pages/Details'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="heroes" index element={<Heroes />} />
      <Route path="heroes/details/:id" element={<Details />} />
    </Routes>
  </BrowserRouter>
)
