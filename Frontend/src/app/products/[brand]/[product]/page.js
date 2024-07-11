"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import Footer from "../../../../components/footer";
import Header from "../../../../components/header";
import { loadStripe } from '@stripe/stripe-js';
import SecurePayment from '../../../../components/securepayment';
import CanadaWide from '../../../../components/canadawide';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

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

const CollapsibleSection = ({ title, content, isOpen, toggleSection }) => (
  <div className="CollapsibleSection">
    <div className="SectionHeader" onClick={toggleSection}>
      <span>{title}</span>
      <span>{isOpen ? '-' : '+'}</span>
    </div>
    {isOpen && <div className="SectionContent">{content}</div>}
  </div>
);

export default function ProductPage() {
  const [phone, setPhone] = useState(null);
  const { product } = useParams();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/myapp/api/products/${product}`);
        const phoneData = response.data;
        setPhone(phoneData);

        if (phoneData.colors.length > 0) {
          const defaultColor = phoneData.colors[0];
          setSelectedColor(defaultColor.name);
          const defaultImage = phoneData.color_images.find(image => image.color_name === defaultColor.name);
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
        brand: phone.brand,
      });
    }
    saveCartToStorage(cart);
    router.push('/checkout');
  };

  const incrementQuantity = () => {
    if (quantity < phone.countInStock) {
        setQuantity(prevQuantity => prevQuantity + 1);
    }
};

const decrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
};


  const handleColorChange = (event) => {
    const newColorName = event.target.value;
    setSelectedColor(newColorName);

    const colorImageEntry = phone.color_images.find(imageEntry => imageEntry.color_name === newColorName);
    const newImageURL = colorImageEntry ? colorImageEntry.image : phone.image;
    setImageURL(newImageURL);
  };

  const handleStorageChange = (event) => {
    const newStorage = event.target.value;
    const storageOption = phone.storage_options.find(option => option.storage_amount === newStorage);
    setSelectedStorage(newStorage);
    setFinalPrice(parseFloat(storageOption.price));
  };

  const handleBuyNow = async () => {
    try {
      const response = await axios.post('http://localhost:8000/myapp/api/create-checkout-session/', {
        productId: phone.id,
        price: finalPrice,
        quantity: quantity,
        image: imageURL
      });

      const { sessionId } = response.data;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Error redirecting to Stripe checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const toggleShipping = () => {
    setShippingOpen(!shippingOpen);
  };

  if (!phone) return null;

  const isOutOfStock = phone.countInStock <= 0;
  const isAlmostOutOfStock = phone.countInStock > 0 && phone.countInStock <= 5;

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
                      <option key={color.id} value={color.name}>{color.name}</option>
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
                <button onClick={incrementQuantity} disabled={quantity >= phone.countInStock}>+</button>
                  </div>
              </div>
              <div className="StockStatus">
                <p>{phone.countInStock > 0 ? `In Stock: ${phone.countInStock}` : "Out of Stock"}</p>
                {isAlmostOutOfStock && <p style={{ color: 'red' }}>Hurry! Only {phone.countInStock} left in stock!</p>}
              </div>
              <div className="cartButtons">
                <button 
                  onClick={handleAddToCart} 
                  disabled={isOutOfStock} 
                  style={{ backgroundColor: isOutOfStock ? 'grey' : undefined }}
                >
                  Add To Cart
                </button>
                <button 
                  onClick={handleBuyNow} 
                  disabled={isOutOfStock} 
                  style={{ backgroundColor: isOutOfStock ? 'grey' : undefined }}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="InfoIcons">
              <div className="InfoIcon">
                <SecurePayment />
              </div>
              <div className="InfoIcon">
                <CanadaWide />
                <span>Canada Wide Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="CollapsibleSections">
        <div className='CollapsibleContainer'>
          <CollapsibleSection title="DETAILS" content={<p>{phone.description}</p>} isOpen={detailsOpen} toggleSection={toggleDetails} />
          <CollapsibleSection title="SHIPPING" content={<p>Shipping details will be here.</p>} isOpen={shippingOpen} toggleSection={toggleShipping} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
