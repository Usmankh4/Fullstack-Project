import repairData from "../../repairBrand.json";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";
export default function Page({ params }) {
  
  const repairBrand = repairData.filter(p => p.model === params.model);

 

  if (!repairData) return <div>Loading or Not Found...</div>;

  return (
    <div>
    <Header></Header>
    <div className="pageAfterHeader">
      <div className="RepairHeader">
      <div className="RepairWrapper">
        <div className="phones-grid">
          {repairBrand.map((phone) => (
            <div className="phone-card" key={phone.name}>
              <div className="phonePicture">
                <div className="phonePicturewrapper">
                <Image src={phone.image} alt={phone.name} width={150} height={204} />
              </div>
              </div>
              <h4>{phone.name}</h4>
              <p>Get your phone fixed today. Check out our price list now!</p>
              <Link href={`/repair/${phone.model}/repairPage`}>
                <button>LEARN MORE</button>
              </Link> 
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
    <Footer></Footer>
  </div>



    
  );
}