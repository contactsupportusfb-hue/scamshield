import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'
import FloatingButtons from './FloatingButtons'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <ScrollToTop />
      <Header />
      <p className="bg-primary-container/10 border-b border-primary-container/30 text-primary text-center font-label-sm text-label-sm py-1.5 px-4">Fictional demo site · VERITAS is not a real agency</p>
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </div>
  )
}
