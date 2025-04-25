import Link from 'next/link';
import Image from 'next/image';
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import '../../globals.css';
import { Pagination } from './pagination';

// Metadata generation for dynamic routes
export async function generateMetadata({ params }) {
  const { brand } = params;
  return {
    title: `${brand} Products`,
    description: `Browse our collection of ${brand} products and accessories`,
  };
}

// Server-side data fetching
async function getProducts(brand, page = 1) {
  try {
    const url = `http://localhost:8000/myapp/api/products/?brand=${encodeURIComponent(brand)}`;
    
    const response = await fetch(
      url,
      { 
        cache: 'no-store' // Disable caching to always get fresh data
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { results: [], count: 0 };
  }
}

export default async function BrandPage({ params, searchParams }) {
  const { brand } = params;
  const currentPage = Number(searchParams.page) || 1;
  
  // Normalize brand name to match what might be in the database
  const normalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  
  // Try both the original brand name and the normalized version
  let data = await getProducts(normalizedBrand, currentPage);
  let phones = data.results || [];
  
  // If no results with normalized brand, try the original
  if (phones.length === 0) {
    data = await getProducts(brand, currentPage);
    phones = data.results || [];
  }
  
  const pageCount = data.count ? Math.ceil(data.count / (phones.length || 10)) : 0;

  return (
    <div>
      <div className="PhoneBackground">
        <Header />
        <div className="pageAfterHeader">
          <div className="PhoneTitle">
            <h2>{brand.toUpperCase()}</h2>
            <div className="PhoneWrapper">
              <div className="PhoneLayout">
                {phones.length > 0 ? (
                  phones.map((phone) => (
                    <div className="PhoneCard" key={phone.id}>
                      <h4>{phone.name}</h4>
                      <Link href={`/products/${brand}/${phone.slug || phone.id}`}>
                        <div className="PhoneImage">
                          {phone.image ? (
                            <Image 
                              src={phone.image} 
                              alt={phone.name} 
                              width={150} 
                              height={200}
                              unoptimized={phone.image.startsWith('http')}
                            />
                          ) : (
                            <div className="placeholder-image" style={{ 
                              width: '150px', 
                              height: '200px', 
                              background: '#f0f0f0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#666',
                              fontSize: '14px'
                            }}>
                              No Image Available
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="PhonePrice">
                        <h4>on sale for ${phone.price}</h4>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="NoProducts">
                    <h3>No products found</h3>
                  </div>
                )}
              </div>
            </div>
            <Pagination 
              currentPage={currentPage} 
              pageCount={pageCount} 
              brand={brand} 
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
