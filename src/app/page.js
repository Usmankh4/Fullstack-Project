import iphone from "../image/iphone14crop.png";
import Header from "./components/header";
import BannerImage from "./images/phone.png";
import Image from "next/image";
import samsung from "../image/samsung.png";
import google from "../image/google.png";
import Footer from "./components/footer";
import Link from "next/link";

export default function Home() {
  
  return (
    
    <div>
      
      <Header />
      <div className="pageAfterHeader">
        <div className="heroBanner">
          <div className="repairText">
            <h2>Repair Is Our Specialty</h2>
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
              <h2>Accessories</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image zoom height={243} src={google}></Image>
              </div>
              
            </div>
            <div className="bigcard">
              <h2>Tablets</h2>
              <button>View All</button>
              <div className="iPhoneImage">
                <Image zoom height={243} src={google}></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}