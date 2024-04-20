"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Footer from "../../../components/footer";
import Header from "../../../components//header";
import '../../globals.css';

export default function BrandPage() {
  const { brand } = useParams();
  const [phones, setPhones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);  

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/myapp/api/products/?brand=${brand}&page=${currentPage}`);
        setPhones(response.data.results);
        
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };
    fetchPhones();
  }, [brand, currentPage]);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="PhoneBackground">
        <Header />
        <div className="pageAfterHeader">
          <div className="PhoneTitle">
            <h2>{brand.toUpperCase()}</h2>
            <div className="PhoneWrapper">
              <div className="PhoneLayout">
                {phones.map((phone) => (
                  <div className="PhoneCard" key={phone.name}>
                    <h4>{phone.name}</h4>
                    <Link href={`/products/${brand}/${phone.id}`}>
                      <div className="PhoneImage">
                        <img src={phone.image} alt={phone.name} width={150} height={200} />
                      </div>
                    </Link>
                    <div className="PhonePrice">
                      <h4>on sale for ${phone.price}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="pageButton">
              {currentPage > 1 && <button onClick={handlePrevious}>Previous</button>}
              <button onClick={handleNext}>Next</button>
            </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
