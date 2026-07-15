import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/view-students" element={<ViewAllStudents />} />
=======
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/add-stud" element={<AddStudent />} />
          <Route path="/view-stud" element={<ViewAllStudents />} />
>>>>>>> 24c11a7 (Router added)
          <Route path="/add-item" element={<AddMenuitem />} />
          <Route path="/view-item" element={<ViewMenuitems />} />
          <Route path="/add-offer" element={<AddOffer/>} />
          <Route path="/view-offer" element={<ViewOffer />} />
          
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App