import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './homepage'
import Portfolio from './portfolio'

export default () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/portfolio" element={<Portfolio />} /> 
  </Routes>
)
