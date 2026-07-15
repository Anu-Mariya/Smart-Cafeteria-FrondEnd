import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddStudent from './components/AddStudent'
import ViewAllStudents from './components/ViewAllStudents'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddStudent />
      <ViewAllStudents />
    </>
  )
}

export default App
