import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { quadrants } from './types'
import { ThreeApp } from './components/ThreeApp'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">All</Link>
        {quadrants.map((q) => (
          <Link to={q} key={q}>
            {q.replaceAll('-', ' ')}
          </Link>
        ))}
      </nav>
      <Routes>
        <Route path="/:quadrant?" element={<ThreeApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
