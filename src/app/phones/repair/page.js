import { useNavigation } from 'next/navigation';
import Footer from '../../footer';
import '../../globals.css';
import Header from '../../header';
import Image from "next/image";
import Repairphones from "../../repairPhones.json";

export default function Repair() {
  const navigate = useNavigation();

  // Function to handle redirection to the brand-specific repair page
  const redirectToBrandPage = (brandName) => {
    // Convert the brand name to a slug (e.g., "Apple" becomes "apple-repair")
    const slug = `${brandName.toLowerCase().replace(/\s/g, '-')}-repair`;
    // Perform navigation to the dynamic route
    navigate(`/repair/${slug}`);
  };

  return (
    <div>
      <Header />
      <div className="pageAfterHeader">
        <div className="RepairHeader">
          <h3>Please select your phone brand that needs repairing from the list below!</h3>
          <div className="RepairWrapper">
            <div className="phones-grid">
              {Repairphones.map((phone) => (
                <div className="phone-card" key={phone.name}>
                  <div className="phonePicture">
                    <Image src={phone.image} alt={phone.name} width={150} height={104} />
                  </div>
                  <h4>{phone.name}</h4>
                  <p>Get your phone fixed today. Check out our price list now!</p>
                  <button onClick={() => redirectToBrandPage(phone.name)}>LEARN MORE</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
