"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import SecurePayment from '../../../../components/securepayment';
import CanadaWide from '../../../../components/canadawide';
import { CollapsibleSection } from './collapsible-section';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const getCartFromStorage = () => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCartToStorage = (cart) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function ProductDetails({ productData }) {
  const [phone] = useState(productData);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize default selections
    if (phone.colors && phone.colors.length > 0) {
      const defaultColor = phone.colors[0];
      setSelectedColor(defaultColor.name);
      const defaultImage = phone.color_images.find(image => image.color_name === defaultColor.name);
      setImageURL(defaultImage ? defaultImage.image : phone.image);
    } else {
      setImageURL(phone.image);
    }

    // Debug storage options
    console.log('Product data:', phone);
    console.log('Storage options:', phone.storage_options);

    if (phone.storage_options && phone.storage_options.length > 0) {
      const defaultStorage = phone.storage_options[0];
      console.log('Default storage option:', defaultStorage);
      setSelectedStorage(defaultStorage.storage_amount);
      setFinalPrice(parseFloat(defaultStorage.price || phone.price));
    } else {
      setFinalPrice(parseFloat(phone.price));
    }
  }, [phone]);

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
      brand: phone.brand,
    };

    addToCart(productDetails);
  };

  const addToCart = (productDetails) => {
    let cart = getCartFromStorage();
    const existingIndex = cart.findIndex(item => 
      item.productId === productDetails.productId && 
      item.color === productDetails.color && 
      item.storage === productDetails.storage
    );
    
    let newQuantity = productDetails.quantity;

    if (existingIndex !== -1) {
      newQuantity += cart[existingIndex].quantity;
    }

    if (newQuantity > phone.countInStock) {
      alert('Cannot add more items than available in stock');
      return;
    }

    if (existingIndex !== -1) {
      cart[existingIndex].quantity = newQuantity;
    } else {
      cart.push(productDetails);
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
    setSelectedStorage(newStorage);
    
    // Find the matching storage option
    const storageOption = phone.storage_options.find(option => option.storage_amount === newStorage);
    
    // Debug the selected storage option
    console.log('Selected storage:', newStorage);
    console.log('Found storage option:', storageOption);
    
    // Update price based on the storage option or fallback to base price
    if (storageOption && storageOption.price) {
      setFinalPrice(parseFloat(storageOption.price));
    } else {
      setFinalPrice(parseFloat(phone.price));
    }
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

  const isOutOfStock = phone.countInStock <= 0;
  const isAlmostOutOfStock = phone.countInStock > 0 && phone.countInStock <= 5;

  return (
    <>
      <div className="ProductLayout">
        <div className="ProductContainer">
          <div className="ProductImage">
            {imageURL && (
              <Image 
                src={imageURL} 
                alt={phone.name} 
                width={400} 
                height={400} 
                priority
                unoptimized={imageURL.startsWith('http')}
              />
            )}
          </div>
          <div className="ProductInfo">
            <h2 className="ProductTitle">{phone.name}</h2>
            <div className="ProductPrice">
              <h3>${finalPrice.toFixed(2)}</h3>
            </div>
            <div className="SelectionsContainer">
              <div className="ColourAndStorage">
                {phone.colors && phone.colors.length > 0 && (
                  <div className="ColourSelection">
                    <select value={selectedColor} onChange={handleColorChange}>
                      {phone.colors.map((color) => (
                        <option key={color.id} value={color.name}>{color.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                {phone.storage_options && phone.storage_options.length > 0 && (
                  <div className="StorageSelection">
                    <select 
                      id="storage-select"
                      value={selectedStorage} 
                      onChange={handleStorageChange}
                    >
                      {phone.storage_options.map((option, index) => (
                        <option key={index} value={option.storage_amount}>
                          {option.storage_amount}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
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
          <CollapsibleSection 
            title="DETAILS" 
            content={<p>{phone.description}</p>} 
            isOpen={detailsOpen} 
            toggleSection={toggleDetails} 
          />
          <CollapsibleSection 
            title="SHIPPING" 
            content={<p>Shipping details will be here.</p>} 
            isOpen={shippingOpen} 
            toggleSection={toggleShipping} 
          />
        </div>
      </div>
    </>
  );
}
