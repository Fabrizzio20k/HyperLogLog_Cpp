import Navbar from '@/components/Navbar'
import './styles.css'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'HyperLogLog C++',
  description: 'A C++ implementation of the HyperLogLog algorithm',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}