import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import './Main.css';
import IPhone from './IPhone';
import bannerImage from './image/phone.png';

function Main() {
  return (
    
      <div>
        <div>
        <Header />
        <div className="pageAfterHeader">
          <div className="heroBanner">
            <div className="repairText">
              <h2>Repair Is Our Specialty</h2>
            </div>
            <div className="heroImage">
              <img src={bannerImage} alt="Phone Banner" />
            </div>
          </div>
        </div>
      </div>

      <Routes>

        <Route path="iphones" element={<IPhone />} />
      </Routes>

    </div>
  );
}

export default Main;
