import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import AddMenuitem from './components/AddMenuitem'
import ViewMenuitems from './components/ViewMenuitems'
import AddStudent from './components/AddStudent'
import ViewAllStudents from './components/ViewAllStudents'

function App() {

  return (
    <>
      <BrowserRouter>

       

        <Routes>
          <Route path="/" element={<AddStudent />} />
          <Route path="/view-stud" element={<ViewAllStudents />} />
          <Route path="/add-item" element={<AddMenuitem />} />
          <Route path="/view-item" element={<ViewMenuitems />} />
          
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App