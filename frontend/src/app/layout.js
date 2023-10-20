import Image from 'next/image';
import Link from 'next/link';
import './styles.css'

export const metadata = {
  title: 'HyperLogLog C++',
  description: 'A C++ implementation of the HyperLogLog algorithm',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <div className="navbar">
            <div className = "left">
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Image src="/cpp_logo.png" alt="logo" width={50} height={55} />
                </Link>
                <Link href="/" style={{ textDecoration: 'none' }}>
                <h1>HyperLogLog C++</h1>
                </Link>
            </div>
            <div className = "center">
                <div className = "information">Information</div>
                <div className = "documentation">Playground</div>
            </div>
            <div className = "right">
                <h3> ⬅️ Return to Main Page</h3>
            </div>
        </div>
        {children}
        
        </body>
    </html>
  )
}