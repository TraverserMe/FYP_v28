import './globals.css'
import Navbar from './components/navbar'

import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'D.A.O',
  description: 'A decentralized autonomous organization for everyone.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={openSans.className}>
      <link rel="icon" href="/icon.png" sizes="any" />
      <Navbar/>
      {children}
    </body>
  </html>
  )
}
