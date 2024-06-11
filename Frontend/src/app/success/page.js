"use client";
import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
    const router = useRouter();
  
    const handleContinueShopping = () => {
      router.push('/products/Accessories');
    };
  
    return (
      <div>
        <Header />
        <div className="pageAfterHeader">
          <div className="container">
            <h1 className="title-success">Payment Successful!</h1>
            <p className="message">Your order has been placed. We'll send you an email with your order details.</p>
            <button className="button-success" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default SuccessPage;