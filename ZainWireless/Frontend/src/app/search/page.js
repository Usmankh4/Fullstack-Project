import Link from 'next/link';
import Image from 'next/image';
import Footer from "../../components/footer";
import Header from "../../components/header";
import '../globals.css';
import './search.css';

// Metadata generation for search page
export function generateMetadata({ searchParams }) {
  const query = searchParams.q || 'Products';
  return {
    title: `Search Results for "${query}"`,
    description: `Browse search results for "${query}" at Zain Wireless`,
  };
}

// Server-side data fetching for search
async function searchProducts(query) {
  try {
    // First, test if the API is accessible at all
    console.log("Testing API connection...");
    const testUrl = "http://localhost:8000/myapp/api/test/";
    
    try {
      const testResponse = await fetch(testUrl, { cache: 'no-store' });
      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log("API test successful:", testData);
      } else {
        console.error("API test failed:", testResponse.status);
      }
    } catch (testError) {
      console.error("API test error:", testError);
    }
    
    // Now try the actual search
    console.log(`Searching for: "${query}"`);
    
    // Use direct product listing instead of search API for testing
    const url = `http://localhost:8000/myapp/api/products/?format=json`;
    console.log(`Using product listing URL: ${url}`);
    
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('All products:', data);
    
    // Filter products on the client side for now
    const results = data.results ? data.results : data;
    
    // Filter by name containing the query (case insensitive)
    const filteredResults = results.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
    );
    
    console.log('Filtered results:', filteredResults);
    
    return {
      results: filteredResults,
      count: filteredResults.length
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return { results: [], count: 0 };
  }
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  
  // If no query provided, show empty results
  if (!query) {
    return (
      <div>
        <div className="PhoneBackground">
          <Header />
          <div className="pageAfterHeader">
            <div className="PhoneTitle">
              <h2>SEARCH RESULTS</h2>
            </div>
            <div className="searchResultsContainer">
              <p className="noResultsMessage">Please enter a search term to find products.</p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  
  // Fetch search results
  const searchData = await searchProducts(query);
  const { results = [], count = 0 } = searchData;
  
  console.log("Rendering search results:", results);
  
  // Render search results
  return (
    <div>
      <div className="PhoneBackground">
        <Header />
        <div className="pageAfterHeader">
          <div className="PhoneTitle">
            <h2>SEARCH RESULTS FOR "{query}"</h2>
            <p className="resultsCount">{count} product{count !== 1 ? 's' : ''} found</p>
          </div>
          
          {count > 0 ? (
            <div className="productGrid">
              {results.map((product) => (
                <Link 
                  href={`/products/${product.brand.toLowerCase()}/${product.slug}`} 
                  key={product.id} 
                  className="productCard"
                >
                  <div className="productImageContainer">
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        width={200}
                        height={200}
                        className="productImage"
                        unoptimized={product.image.startsWith('http')}
                      />
                    ) : (
                      <div className="productImagePlaceholder">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="productInfo">
                    <h3 className="productName">{product.name}</h3>
                    <p className="productBrand">{product.brand}</p>
                    <p className="productPrice">£{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="searchResultsContainer">
              <p className="noResultsMessage">No products found for "{query}".</p>
              <div className="searchSuggestions">
                <h3>Suggestions:</h3>
                <ul>
                  <li>Check the spelling of your search term</li>
                  <li>Try using more general keywords</li>
                  <li>Try searching for a different product</li>
                </ul>
                <div className="popularSearches">
                  <h4>Popular searches:</h4>
                  <div className="popularSearchButtons">
                    <Link href="/search?q=iPhone" className="popularSearchButton">iPhone</Link>
                    <Link href="/search?q=Samsung" className="popularSearchButton">Samsung</Link>
                    <Link href="/search?q=Apple" className="popularSearchButton">Apple</Link>
                    <Link href="/search?q=Android" className="popularSearchButton">Android</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
