"use client"
import { useParams } from 'next/navigation';
import '../../globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import phonesData from '../../phones.json';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BrandPage() {
  const { brand } = useParams(); // Retrieve the brand parameter
  const [phones, setPhones] = useState([]); // State for storing the fetched phones data
console.log(brand);
  // Fetch phones data from your backend on component mount
  useEffect(() => {
    const fetchPhones = async () => {
    try {
    const response = await axios.get(`http://localhost:8000/myapp/api/products/?brand=${brand}`);
    console.log(response.data);
    setPhones(response.data);
    } catch (error) {
    console.error('Error fetching phones:', error);
    }
    };
    
    fetchPhones();
    }, [brand]);

  return (
    <div>
      <div className="PhoneBackground">
        <Header />
        <div className="pageAfterHeader">
          <div className="PhoneTitle"> 
            <h2>{brand.toUpperCase()} PHONES</h2>
            <div className="PhoneWrapper">
              <div className="PhoneLayout">
                {phones.map((phone) => (
                  <div className="PhoneCard" key={phone.name}>
                    <h4>{phone.name}</h4>
                    <Link href={`/products/${brand}/${phone.name}`}>
                      <div className="PhoneImage">
                        <img src={phone.thumbnail} alt={phone.name} />
                      </div>
                    </Link>
                    <div className="PhonePrice">
                      <h4> on sale for ${phone.price}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
