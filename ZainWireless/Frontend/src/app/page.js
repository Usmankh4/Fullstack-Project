import iphone from "../image/15promax.jpg";
import BannerImage from "../images/phone.png"
import Image from "next/image";
import samsung from "../image/samsungultra.jpg";
import google from "../image/Pixel8.png";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import FeaturedCarousel from "../components/featured-carousel";

export const metadata = {
  title: 'Zain Wireless - Home',
  description: 'Your one-stop shop for phone repairs and accessories',
};

export default function Home() {
  return (
    <div>
      <Header />
      <div>
      <div className="pageAfterHeader">
        <div className="heroBanner">
          <div className="box">
            <div className="frame-wrapper">
            <div className='div'>
                <h1 className='text-wrapper'>REPAIR IS OUR SPECIALTY</h1>
                <div className='frame-2'>
                  <div className='div-wrapper'>
                    <Link href= "/products/Accessories">
                    <button className='button-wrapper-2'>Shop</button>
                    </Link>
                  </div>
                  <div className='frame-3'>
                    <Link href="/repair">
                    <button className='button-wrapper-3'>Repair</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="heroImage">
            <Image src={BannerImage} alt="Phone banner" priority />
          </div>
        </div>
        <FeaturedCarousel />

        <div className="cardWrapper">
          <div className="cardLayout">
            
            <div className="iPhoneCard">
              <Link href="/products/Apple">
              <h2>Apple</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image src={iphone} alt="iPhone" />
              </div>
              </Link>
            </div>

            <div className="iPhoneCard">
              <Link href="/products/Samsung">
              <h2>Samsung</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image height={243} src={samsung} alt="Samsung phone" />
                
              </div>
              </Link>
            </div>

            <div className="iPhoneCard">
            <Link href="/products/Android">
              <h2>Android</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image height={243} src={google} alt="Google Pixel" />
              </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="cardsBelowContainer" >
          <div className="CardsBelow">
          
            <div className="bigcard">
            <Link href="/products/Accessories">

              <h2>Accessories</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image height={243} src={google} alt="Accessories" />
              </div>
              </Link>
            </div>
            <div className="bigcard">
            <Link href="/products/Tablet">

              <h2>Tablets</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image height={243} src={google} alt="Tablets" />
              </div>
              </Link>
            </div>
          </div>
        </div>
        
        
        
      </div>
      <Footer />
    </div>
    </div>
  );
}