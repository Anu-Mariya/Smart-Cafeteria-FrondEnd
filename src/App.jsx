import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import AddMenuitem from './components/AddMenuitem'
import ViewMenuitems from './components/ViewMenuitems'
import AddStudent from './components/AddStudent'
import ViewAllStudents from './components/ViewAllStudents'
import AddOffer from './components/AddOffer'
import ViewOffer from './components/ViewOffer'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main Presentational Entry Point */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Main Core Resource Pathways */}
          <Route path="/students-add" element={<AddStudent />} />
          <Route path="/students-view" element={<ViewAllStudents />} />
          <Route path="/menu-add" element={<AddMenuitem />} />
          <Route path="/menu-view" element={<ViewMenuitems />} />
          <Route path="/offers-add" element={<AddOffer />} />
          <Route path="/offers-view" element={<ViewOffer />} />

          {/* Fallback Aliases & Legacy System Redirects */}
          <Route path="/add-stud" element={<Navigate to="/students-add" replace />} />
          <Route path="/view-stud" element={<Navigate to="/students-view" replace />} />
          <Route path="/add-item" element={<Navigate to="/menu-add" replace />} />
          <Route path="/view-item" element={<Navigate to="/menu-view" replace />} />
          <Route path="/add-offer" element={<Navigate to="/offers-add" replace />} />
          <Route path="/view-offer" element={<Navigate to="/offers-view" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;