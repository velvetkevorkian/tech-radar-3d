import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThreeApp } from './components/ThreeApp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThreeApp />} />
        <Route path="/quadrant/:quadrant?" element={<ThreeApp />} />
        <Route path="/ring/:ring?" element={<ThreeApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
