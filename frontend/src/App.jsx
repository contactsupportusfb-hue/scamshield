import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Arrests from './pages/Arrests'
import Press from './pages/Press'
import Contact from './pages/Contact'
import Report from './pages/Report'
import ComingSoon from './pages/ComingSoon'
import Admin from './pages/Admin'

const SOON = { departments: 'Departments', services: 'Services', investigations: 'Investigations', careers: 'Careers', privacy: 'Privacy Policy', terms: 'Terms of Use', accessibility: 'Accessibility' }

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="arrests" element={<Arrests />} />
        <Route path="press" element={<Press />} />
        <Route path="contact" element={<Contact />} />
        <Route path="report" element={<Report />} />
        <Route path="admin" element={<Admin />} />
        {Object.entries(SOON).map(([p, t]) => <Route key={p} path={p} element={<ComingSoon title={t} />} />)}
        <Route path="*" element={<ComingSoon title="Page not found" notFound />} />
      </Route>
    </Routes>
  )
}
