import iphone from "../image/15promax.jpg";
import Header from "./header";
import BannerImage from "./images/phone.png";
import Image from "next/image";
import samsung from "../image/samsungultra.jpg";
import google from "../image/Pixel8.png";

import Footer from "./footer";
import Link from "next/link";

export default function Home() {
  
  return (
    
    <div>
      
      <Header />
      <div className="pageAfterHeader">
        <div className="heroBanner">
          <div className="repairText">
            <h2>Repair Is Our Specialty</h2>
            <div className="divWrapper">
            <button className="buttonOne"> Shop</button>
            
            <div className="wrapperTwo">
            <button className="buttonTwo"> Repair</button>
            </div>
            </div>

          </div>
          <div className="heroImage">
            <Image src={BannerImage}></Image>
          </div>
        </div>

        <div className="cardWrapper">
          <div className="cardLayout">
            
            <div className="iPhoneCard">
              <Link href="/phones/iphone">
              <h2>Apple</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image src={iphone}></Image>
              </div>
              </Link>
            </div>

            <div className="iPhoneCard">
              <Link href="/phones/samsung">
              <h2>Samsung</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image height={243} src={samsung}></Image>
                
              </div>
              </Link>
            </div>

            <div className="iPhoneCard">
            <Link href="/phones/android">
              <h2>Android</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image zoom height={243} src={google}></Image>
              </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="cardsBelowContainer" >
          <div className="CardsBelow">
          
            <div className="bigcard">
            <Link href="/phones/accessories">

              <h2>Accessories</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image zoom height={243} src={google}></Image>
              </div>
              </Link>
            </div>
            <div className="bigcard">
            <Link href="/phones/tablet">

              <h2>Tablets</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image zoom height={243} src={google}></Image>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}