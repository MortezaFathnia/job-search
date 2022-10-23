import React from 'react'
import Head from 'next/head';
import Header from './Header'
import Footer from './Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children, title = 'Find You Job Now' }) => {
  return (
    <div>
      <Head>
        <title>{title} - Jobbee</title>
      </Head>
      <ToastContainer position='bottom-right'/>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout