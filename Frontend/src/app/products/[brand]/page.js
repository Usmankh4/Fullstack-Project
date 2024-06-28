"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Footer from "../../../components/footer";
import Header from "../../../components/header";
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
        setPageCount(Math.ceil(response.data.count / response.data.results.length)); // Assuming the response contains a total count
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };
    fetchPhones();
  }, [brand, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
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
                  <div className="PhoneCard" key={phone.id}>
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
            <div className="pageButton">
              <button onClick={handlePrevious} disabled={currentPage <= 1}>Previous</button>
              <button onClick={handleNext} disabled={currentPage >= pageCount}>Next</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
