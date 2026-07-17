import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const MainLayout = ({children}) => {
  return (
    <>
    <Navbar />
    {children}
    <Footer />
    </>
  )
}

export default MainLayout
