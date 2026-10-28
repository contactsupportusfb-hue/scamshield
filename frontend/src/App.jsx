import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Scammed from './pages/Scammed'
import Spot from './pages/Spot'
import Report from './pages/Report'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="scammed" element={<Scammed />} />
        <Route path="spot" element={<Spot />} />
        <Route path="report" element={<Report />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
