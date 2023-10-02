import React from 'react'
import "./globals.css";

import phones from "./phones.json";

import Link from "next/link";

function footer() {
  return (
    <div>
    <div className="header">
      <div className="headerTop">
        <div className="footerTopLeft">
         <h4>Main Menu</h4>

        <ul>
          <li className="link">
            <a href="/">Home</a>
          </li>
          <li className="link">
            <Link href="/phones/iphone">Apple</Link>
          </li>
          <li className="link">
            <Link href="/samsung">Samsung</Link>
          </li>
          <li className="link">
             <Link href="/contactus">Android</Link>
           </li>
           <li className="link">
             <Link href="/contactus">Tablet</Link>
           </li>
           <li className="link">
             <Link href="/contactus">Accessories</Link>
           </li>
          <li className="link">
            <Link href="/contactus">Contact Us</Link>
          </li>
          <li className="link">
             <Link href="/contactus">Help With Checkout</Link>
           </li>
          
        </ul>
        </div>

        <div className="footerTopLeft">
        <h4>Contact Us</h4>
         
         <ul>
           <li className="link">
             <a href="/">Mississauga 905 232 7771</a>
           </li>
           <li className="link">
             <Link href="/phones/iphone">zainwireless@gmail.com</Link>
           </li>
           <li className="link">
             <Link href="/samsung">3415 Dixie Rd, Mississauga, ON </Link>
           </li>
           <li className="link">
             <Link href="/contactus">L4Y 2B1</Link>
           </li>
         </ul>
        </div>

        <div className="footerTopRight">
        <h4>Policy</h4>
         
         <ul>
           <li className="link">
             <a href="/">Privacy Policy</a>
           </li>
           <li className="link">
             <Link href="/phones/iphone">Terms of Service</Link>
           </li>
           <li className="link">
             <Link href="/samsung">Refund Policy</Link>
           </li>
           <li className="link">
             <Link href="/contactus">Shipping Policy</Link>
           </li>
           <li className="link">
             <Link href="/contactus">Warranty</Link>
           </li>
           <li className="link">
             <Link href="/contactus">Covid-19 Safety</Link>
           </li>
         </ul>
        </div>
      </div>

      <hr color="#2f2f2f" />

      <div className="footerBottom">
      <p>Copyright</p>
        </div>
      </div>
    </div>
  )
}

export default footer