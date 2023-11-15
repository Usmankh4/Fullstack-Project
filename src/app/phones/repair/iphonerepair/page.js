import '../../globals.css'; // Ensure the path to the CSS file is correct
import Header from '@/app/header';
import Footer from '@/app/footer';
import Link from 'next/link';
import repairBrand from "../../repairBrand.json";

function Page() {
  const repairPhones = [];

  for (let i = 0; i < repairBrand.length; i++) {
    const repairItem = repairBrand[i]; 
    if (repairItem.model === "Apple") {
      repairPhones.push(repairItem); 
    }
  }

  return(
    <div>
    <Header></Header>
      <div className="pageAfterHeader">
        <div className="RepairWrapper">
          <div className="phones-grid">
            {repairBrand.map((phone) => (
              <div className="phone-card" key={phone.name}>
                <div className="phonePicture">
                  <Image src={phone.image} alt={phone.name} width={150} height={104} />
                </div>
                <h4>{phone.name}</h4>
                <button>LEARN MORE</button>
                
              </div>
            ))}
          
        </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )

}