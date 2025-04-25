"use client";

import Link from 'next/link';

export function ProductNotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for could not be found.</p>
        <p>It may have been removed or the URL might be incorrect.</p>
        <div className="not-found-actions">
          <Link href="/">
            <button className="home-button">Return to Home</button>
          </Link>
          <Link href="/products/Apple">
            <button className="browse-button">Browse Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
