import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout ({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='shortcut icon' href='/logo.png' type='image/x-icon' />
      </Head>

      <Navbar />

      <div>
        {children}
      </div>
    </>
  )
}
