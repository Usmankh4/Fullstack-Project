"use client"
import { useParams } from 'next/navigation';
import '../../globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import phonesData from '../../phones.json';
import Link from 'next/link';
import db,{storage} from '@/firebase';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from 'react';
import Image from 'next/image';
export default function BrandPage() {
  const { brand } = useParams(); // Retrieve the brand parameter

  const [products, setProducts] = useState([]);
// Outside of your component
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "Products");
      console.log(productsCollection);
      console.log(brand);
      const productsCollectionQuery = query(productsCollection, where("brand", "==", brand));
      
      console.log(productsCollectionQuery);
      const querySnapshot = await getDocs(productsCollectionQuery);
      const productsDataPromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        try {
          const imageUrl = await getDownloadURL(ref(storage, data.mainImage));
          console.log(imageUrl); // Ensure URL is correct
          return { ...data, mainImage: imageUrl };
        } catch (error) {
          console.error("Error getting image URL: ", error);
          // Handle or return error appropriately
          return { ...data, mainImage: null }; // or however you want to handle the error
        }
      });
      const productsData = await Promise.all(productsDataPromises);
      setProducts(productsData);
      console.log(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
      // Handle error appropriately
    }
  };

  fetchProducts();
}, [brand]); // Ensure this is the only dependency unless others are needed

  


  return (
    <div>
      <div className="PhoneBackground">
        <Header />
        <div className="pageAfterHeader">
          <div className="PhoneTitle"> 
            <h2>{brand.toUpperCase()}</h2>
            <div className="PhoneWrapper">
              <div className="PhoneLayout">
              {products.map((phone) => (
  <div className="PhoneCard" key={phone.name}>
    <h4>{phone.name}</h4>
    <Link href={`/products/${phone.brand}/${phone.name}`}>
     
        <Image className="iPhoneImage" src={phone.mainImage} width={200} height={150}  alt={phone.name} />
      
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
