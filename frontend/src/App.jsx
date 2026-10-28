import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Departments from './pages/Departments'
import Services from './pages/Services'
import Investigations from './pages/Investigations'
import Arrests from './pages/Arrests'
import Press from './pages/Press'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Report from './pages/Report'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Accessibility from './pages/Accessibility'
import Admin from './pages/Admin'
import ComingSoon from './pages/ComingSoon'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="departments" element={<Departments />} />
        <Route path="services" element={<Services />} />
        <Route path="investigations" element={<Investigations />} />
        <Route path="arrests" element={<Arrests />} />
        <Route path="press" element={<Press />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="report" element={<Report />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="accessibility" element={<Accessibility />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<ComingSoon title="Page not found" notFound />} />
      </Route>
    </Routes>
  )
}
