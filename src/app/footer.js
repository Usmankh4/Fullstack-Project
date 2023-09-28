import React from "react";

import "./globals.css";

import phones from "./phones.json";

import Link from "next/link";

function footer() {
  return (
    // <footer className="footer">
    //     <div className="container">
    //         <div className="row">
    //             <div className="footer-col">
    //                 <h4>Main Menu</h4>
    //                 <ul>
    //                     <li>< a href='#'>Home</a></li>
    //                     <li>< a href='#'>iPhone</a></li>
    //                     <li>< a href='#'>Samsung</a></li>
    //                     <li>< a href='#'> Android</a></li>
    //                     <li>< a href='#'>Tablet</a></li>
    //                     <li>< a href='#'>Accessories</a></li>
    //                     <li>< a href='#'>Contact Us</a></li>
    //                     <li>< a href='#'> Help With Checkout</a></li>

    //                 </ul>
    //             </div>
    //             <div className="footer-col">
    //                 <h4>Contact Us</h4>
    //                 <ul>
    //                     <li>< a href='#'></a></li>

    //                 </ul>
    //             </div>
    //             <div className="footer-col">
    //                 <h4></h4>
    //                 <ul>
    //                     <li>< a href='#'></a></li>

    //                 </ul>
    //             </div>

    //         </div>

    //     </div>
    // </footer>

    <div>
      <div className="header">
        <div className="headerTop">
          <div className="footerTopLeft">
           <h4>Main Menu</h4>

          <ul>
            <li className="activeLink">
              <a href="/">Home</a>
            </li>
            <li className="link">
              <Link href="/phones/iphone">Apple</Link>
            </li>
            <li className="link">
              <Link href="/samsung">Samsung</Link>
            </li>
            <li className="link">
              <Link href="/contactus">Contact Us</Link>
            </li>
          </ul>
          </div>

          <div className="footerTopLeft">
          <h4>Main Menu</h4>
           
           <ul>
             <li className="activeLink">
               <a href="/">Home</a>
             </li>
             <li className="link">
               <Link href="/phones/iphone">Apple</Link>
             </li>
             <li className="link">
               <Link href="/samsung">Samsung</Link>
             </li>
             <li className="link">
               <Link href="/contactus">Contact Us</Link>
             </li>
           </ul>
          </div>

          <div className="footerTopRight">
          <h4>Main Menu</h4>
           
           <ul>
             <li className="activeLink">
               <a href="/">Home</a>
             </li>
             <li className="link">
               <Link href="/phones/iphone">Apple</Link>
             </li>
             <li className="link">
               <Link href="/samsung">Samsung</Link>
             </li>
             <li className="link">
               <Link href="/contactus">Contact Us</Link>
             </li>
           </ul>
          </div>
        </div>

        <hr color="#2f2f2f" />

        <div className="footerBottom">
          {/* <ul>
  <li className="activeLink"><a href="/">Home</a></li>
  <li className='link'><Link href="/phones/iphone">Apple</Link></li>
  <li className="link"><Link href="/samsung">Samsung</Link></li>
  <li className="link"><Link href="/contactus">Contact Us</Link></li>
</ul> */}

          <p>Copyright</p>
        </div>
      </div>
    </div>
  );
}

export default footer;
