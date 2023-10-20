"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import './Navbar.css'

export default function Navbar() {
    const pathName = usePathname();
    return (
        <div className="navbar">
        <div className="left">
            <Link href="/" style={{ textDecoration: 'none' }}>
                <Image src="/cpp_logo.png" alt="logo" width={50} height={55} />
            </Link>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <h1>HyperLogLog C++</h1>
            </Link>
        </div>
        <div className="center">

            <Link href='/information' style={{ textDecoration: 'none', color:'white'}}>
                <div className={`information ${pathName === '/information' ? 'active' : ''}`}>
                <h3>Information</h3>
                </div>
            </Link>

            <Link href='/playground' style={{ textDecoration: 'none', color:'white'}}>
                <div className={`playground ${pathName === '/playground' ? 'active' : ''}`}>
                <h3>Playground</h3>
                </div>
            </Link>
        </div>
        <div className={`right ${pathName === '/' ? 'disable_content' : 'active_content'}`}>
            <Link href='/' style={{ textDecoration: 'none', color:'white'}}>
                <h3> ⬅️ Return to Main Page</h3>
            </Link>
        </div>
        </div>
    );

}