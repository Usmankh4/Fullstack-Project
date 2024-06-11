"use client";
import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useRouter } from 'next/navigation';
const CancelPage = () => {
    const router = useRouter();
  
    const handleReturnHome = () => {
      router.push('/');
    };
  
    return (
      <div>
        <Header />
        <div className="pageAfterHeader">
          <div className="container">
            <h1 className="title-cancel">Payment Canceled</h1>
            <p className="message">We're sorry, there was an error processing your payment. Please try again with a different payment method.</p>
            <button className="button-cancel" onClick={handleReturnHome}>
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default CancelPage;
