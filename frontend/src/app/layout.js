import Navbar from "@/components/navbar"

export const metadata = {
  title: 'Hyperloglog C++',
  description: 'A Hyperloglog implementation in C++',
}

export default function MainLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
