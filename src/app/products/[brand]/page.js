"use client"
import { useParams } from 'next/navigation';
import '../../globals.css';
import Header from '@/app/header';
import Footer from '@/app/footer';
import phonesData from '../../phones.json';
import Link from 'next/link';

export default function BrandPage() {
  const { brand } = useParams(); // Retrieve the brand parameter

  // Filter phones based on the brand parameter
  const filteredPhones = phonesData.filter(phone => 
    phone.brand.toLowerCase() === brand.toLowerCase()
  );

  return (
    <div>
      <div className="PhoneBackground">
        <Header />
        <div className="pageAfterHeader">
          <div className="PhoneTitle"> 
            <h2>{brand.toUpperCase()} PHONES</h2>
            <div className="PhoneWrapper">
              <div className="PhoneLayout">
                {filteredPhones.map((phone) => (
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
