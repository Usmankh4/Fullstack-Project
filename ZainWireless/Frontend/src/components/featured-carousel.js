'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FeaturedCarousel() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Number of products to show per slide (responsive)
  const getProductsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 992) return 3;
      return 4;
    }
    return 4; // Default for server-side rendering
  };
  
  const [productsPerSlide, setProductsPerSlide] = useState(4);
  
  useEffect(() => {
    // Update products per slide on window resize
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide());
    };
    
    // Set initial value
    setProductsPerSlide(getProductsPerSlide());
    
    // Add resize listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        console.log('Fetching featured products...');
        const response = await fetch('http://127.0.0.1:8000/myapp/api/featured-products/');
        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }
        const data = await response.json();
        console.log('Featured products data:', data);
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Group products into slides
  const getSlides = () => {
    const slides = [];
    for (let i = 0; i < featuredProducts.length; i += productsPerSlide) {
      slides.push(featuredProducts.slice(i, i + productsPerSlide));
    }
    return slides;
  };

  const slides = getSlides();

  useEffect(() => {
    // Auto-scroll carousel every 5 seconds
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="carouselContainer">
        <div className="loading">Loading featured products...</div>
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    console.log('No featured products found');
    return null; // Don't render anything if no featured products
  }

  return (
    <div className="featuredSection">
      <h2 className="featuredTitle">Featured Products</h2>
      <div className="carouselContainer">
        {slides.length > 1 && (
          <button 
            className="carouselButton prevButton" 
            onClick={prevSlide}
            aria-label="Previous products"
          >
            &#10094;
          </button>
        )}
        
        <div className="carouselTrack">
          {slides.map((slideProducts, slideIndex) => (
            <div 
              key={slideIndex} 
              className={`carouselSlide ${slideIndex === currentIndex ? 'active' : ''}`}
              style={{ transform: `translateX(${(slideIndex - currentIndex) * 100}%)` }}
            >
              {slideProducts.map((product) => (
                <div key={product.id} className="productWrapper">
                  <Link href={`/products/${product.brand}/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="productCard">
                      <div className="imageContainer">
                        {product.image && (
                          <img 
                            src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`} 
                            alt={product.name} 
                            className="productImage"
                          />
                        )}
                      </div>
                      <div className="productInfo">
                        <h3 className="productName">{product.name}</h3>
                        <p className="productPrice">${product.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {slides.length > 1 && (
          <button 
            className="carouselButton nextButton" 
            onClick={nextSlide}
            aria-label="Next products"
          >
            &#10095;
          </button>
        )}
      </div>
      
      {slides.length > 1 && (
        <div className="carouselDots">
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentIndex ? 'activeDot' : ''}`} 
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
