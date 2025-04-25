"use client";

import Link from 'next/link';
import { useCart } from "../app/cart/CartContext";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeaderClient() {
  const { cartItems } = useCart();
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <div className="header">
      <div className="headerTop">
        <div className="headerTopLeft">
          <h2>Zain Wireless</h2>
        </div>

        <div className="headerTopRight">
          {/* NEW SEARCH BUTTON - Completely separate */}
          <button 
            onClick={toggleSearch}
            aria-label="Search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginRight: '20px',
              padding: '5px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Search Icon - Font Awesome Style */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512" 
              width="20" 
              height="20" 
              style={{ fill: 'white' }}
              onMouseOver={(e) => e.currentTarget.style.fill = 'grey'}
              onMouseOut={(e) => e.currentTarget.style.fill = 'white'}
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
          </button>

          {/* NEW CART BUTTON - Completely separate */}
          <Link 
            href="/checkout" 
            style={{ 
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Shopping Cart Icon - Font Awesome Style */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512" 
              width="20" 
              height="20" 
              style={{ fill: 'white' }}
              onMouseOver={(e) => e.currentTarget.style.fill = 'grey'}
              onMouseOut={(e) => e.currentTarget.style.fill = 'white'}
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
            
            {/* Cart Item Count Badge */}
            {totalItemsInCart > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#e50914',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search Form */}
      {searchOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '5%',
          zIndex: 100,
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          width: '300px'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginRight: '8px',
                fontSize: '14px'
              }}
              autoFocus
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#e50914',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Search
            </button>
          </form>
        </div>
      )}

      <hr color="#2f2f2f" />

      <div className="headerBottom">
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={menuOpen ? 'show' : ''}>
          <li className="link"><a href="/">Home</a></li>
          <li className="link"><Link href="/products/Apple">Apple</Link></li>
          <li className="link"><Link href="/products/Samsung">Samsung</Link></li>
          <li className="link"><Link href="/products/Android">Android</Link></li>
          <li className="link"><Link href="/products/Tablet">Tablet</Link></li>
          <li className="link"><Link href="/products/Accessories">Accessories</Link></li>
          <li className="link"><Link href="/repair">Repair</Link></li>
          <li className="link"><Link href="/contactus">Contact Us</Link></li>
        </ul>
      </div>
    </div>
  );
}
