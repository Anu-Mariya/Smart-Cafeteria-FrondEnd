import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddStudent from './components/AddStudent'
import ViewAllStudents from './components/ViewAllStudents'
import AddMenuitem from './components/AddMenuitem'
import ViewMenuitems from './components/ViewMenuitems'
import NavigationBar from './components/NavigationBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddStudent />
      <ViewAllStudents />
      <AddMenuitem />
      <ViewMenuitems />
      <NavigationBar />
    </>
  )
}

export default App
