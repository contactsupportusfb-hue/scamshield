import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'
import FloatingButtons from './FloatingButtons'
import useScrollReveal from '../hooks/useScrollReveal'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  useScrollReveal()
  return (
    <div className="min-h-dvh flex flex-col overflow-x-clip">
      <ScrollToTop />
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </div>
  )
}
