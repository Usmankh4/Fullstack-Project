"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'; 
import { z } from 'zod';
import Header from '@/components/header';
import Footer from '@/components/footer';


const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  quantity: z.number(),
  color: z.string(),
  storage: z.string(),
});

const getCartFromStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export default function ProductPage() {
  const [phone, setPhone] = useState(null);
  const { product } = useParams(); 
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [imageURL, setImageURL] = useState(''); 
  const router = useRouter();
  console.log(phone);


  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/myapp/api/products/${product}`);
        const phoneData = response.data;
        setPhone(phoneData);

        if (phoneData.colors.length > 0) {
          setSelectedColor(phoneData.colors[0].name);
          const defaultImage = phoneData.color_images.find(image => image.color.name === phoneData.colors[0].name);
          setImageURL(defaultImage ? defaultImage.image : phoneData.image);
        }

        if (phoneData.storage_options.length > 0) {
          const defaultStorage = phoneData.storage_options[0];
          setSelectedStorage(defaultStorage.storage_amount);
          setFinalPrice(parseFloat(defaultStorage.price));
        } else {
          setFinalPrice(parseFloat(phoneData.price));
        }
      } catch (error) {
        console.error('Error fetching phone details:', error);
      }
    };

    fetchPhone();
  }, [product]);


  const handleAddToCart = () => {
    const cartItemId = `${phone.id}_${selectedColor}_${selectedStorage}`;
    const productDetails = {
        id: cartItemId,
        productId: phone.id,
        name: phone.name,
        image: imageURL,
        price: finalPrice,
        quantity,
        color: selectedColor,
        storage: selectedStorage,
        brand: phone.brand 
    };
  
    addToCart(productDetails);
  };

  const addToCart = (productDetails) => {
    let cart = getCartFromStorage();
    const existingIndex = cart.findIndex(item => item.productId === productDetails.productId && item.color === productDetails.color && item.storage === productDetails.storage);
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += productDetails.quantity;
    } else {
        cart.push({
            ...productDetails,
            brand: phone.brand
        });
    }
    saveCartToStorage(cart);
    router.push('/checkout');
};




  const incrementQuantity = () => {
    setQuantity(prevQunatity => prevQunatity + 1)
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  }

  const handleColorChange = (event) => {
    const newColorId = event.target.value;
    setSelectedColor(newColorId);

    
    const colorImageEntry = phone.color_images.find(image => image.color === parseInt(newColorId));
    const newImageURL = colorImageEntry ? colorImageEntry.image : phone.image;
    setImageURL(newImageURL);
  };


  const handleStorageChange = (event) => {
    const newStorage = event.target.value;
    const storageOption = phone.storage_options.find(option => option.storage_amount === newStorage);
    setSelectedStorage(newStorage);
    setFinalPrice(parseFloat(storageOption.price));
  };

  if (!phone) return null;

  return (
    <div>
      <Header />
      <div className="ProductLayout">
        <div className="ProductContainer">
          <div className="ProductImage">
            <img src={imageURL} alt={phone.name} />
          </div>
          <div className="ProductInfo">
  <h2 className="ProductTitle">{phone.name}</h2>
  <div className="ProductPrice">
    <h3>${finalPrice.toFixed(2)}</h3>
  </div>
  <div className="SelectionsContainer">
    <div className="ColourAndStorage">
      <div className="ColourSelection">
        <select value={selectedColor} onChange={handleColorChange}>
          {phone.colors.map((color) => (
            <option key={color.id} value={color.id}>{color.name}</option>
          ))}
        </select>
      </div>
      <div className="StorageSelection">
        <select value={selectedStorage} onChange={handleStorageChange}>
          {phone.storage_options.map((option) => (
            <option key={option.id} value={option.storage_amount}>
              {option.storage_amount}
            </option>
          ))}
        </select>
      </div>
      <div className="QuantitySelection">
        <button onClick={decrementQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={incrementQuantity}>+</button>
      </div>
    </div>
    <div className="cartButton">
    <button onClick={() => handleAddToCart(product)}>Add To Cart</button>

    </div>
  </div>
</div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}