import { useState } from 'react'
import Lobby from './pages/lobby.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Lobby/>
    </>
  )
}

export default App
