import Footer from '@/components/footer';
import '../globals.css';
import Header from '@/components/header';
import Image from "next/image";
import Repairphones from "../repairPhones.json";
import Link from 'next/link';

export default function Repair() {
  return (
    <div>
      <Header></Header>
      <div className="pageAfterHeader">
        <div className="RepairHeader">
          <div className="RepairHeaderText">
          <h3> Please select your phone brand that needs repairing from the list below! </h3>
          <div className="RepairWrapper">
            <div className="phones-grid">
              {Repairphones.map((phone) => (
                <Link href={`/repair/${phone.name}`}>
                <div key={phone.name} className="phonePicture">
                  <Image src={phone.image} alt={phone.name} width={150} height={104} />
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
