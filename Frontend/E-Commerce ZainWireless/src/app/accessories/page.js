import '../../globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import phonesData from "../../phones.json";
import Link from 'next/link';
function Page() {
  const filteredPhones = [];

  for (let i = 0; i < phonesData.length; i++) {
    const phone = phonesData[i];
    if (phone.brand === "Accessories") {
      filteredPhones.push(phone);
    }
  }

  return (
    <div>
      <div className="PhoneBackground">
      <Header />
      <div className="pageAfterHeader">
        <div className="PhoneTitle"> 
          <h2>ACCESSORIES</h2>
          <div className="PhoneWrapper">
            <div className="PhoneLayout">
              {filteredPhones.map((phone) => (
                <div className="PhoneCard">
                  <Link href={`/products/${phone.id}`}>
                    

                  <h4>{phone.name}</h4>
                  <div className="PhoneImage">
                    <img src={phone.thumbnail} />

                  </div>
                  <div className="PhonePrice">
                    <h4> On sale from ${phone.price}</h4>
                </div>
                
                </Link>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
}

export default Page;
