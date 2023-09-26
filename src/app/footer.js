import React from 'react'
import Link from 'next/link';
function footer() {
  return (
    <footer className="footer">
    <div className="container">
        <div class="row">
        <div className='footer-col'>
            <h4>Main Menu</h4>
                <ul>
                <li className="activeLink"><a href="/">Home</a></li>
          <li className='link'><Link href="/phones/iphone">Apple</Link></li>
          <li className="link"><Link href="/samsung">Samsung</Link></li>
          <li className="link"><Link href="/android">Android</Link></li>
          <li className="link"><Link href="/tablet">Tablet</Link></li>
          <li className="link"><Link href="/accessories">Accessories</Link></li>
          <li className="link"><Link href="/contactus">Contact Us</Link></li>
          <li className="link"><Link href="/helpwithcheckout">Help With Checkout</Link></li>
                </ul>
            
        </div>
        <div className='footer-col'>
            <h4>Contact Us</h4>
                <ul>
                    <li><a href="#"></a> </li>
                </ul>
            
        </div>
        <div className='footer-col'>
            <h4>Policy</h4>
                <ul>
                    <li><a href="#"></a> </li>
                </ul>
            
        </div>
       
        </div>

    </div>


    </footer>
  )
}

export default footer