import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Script from 'next/script'

const Layout = ({ children, title = 'Find You Job Now' }) => {
  return (
    <div>
      <Head>
        <title>{title} - Jobbee</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout