import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddMenuitem from './components/AddMenuitem'
import ViewMenuitems from './components/ViewMenuitems'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AddMenuitem />
    <ViewMenuitems />
      
    </>
  )
}

export default App
