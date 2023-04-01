import Link from 'next/link'
import React from 'react'

  const navItem = ({text, href, active}: any) => {

  return (
    <Link href={href}
        className={`nav_item ${active ? "active" : ""}`}>
          {text}
    </Link>
  )
  }

  export default navItem