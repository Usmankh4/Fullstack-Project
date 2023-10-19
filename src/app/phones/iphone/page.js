import '../../globals.css';
import Header from '@/app/header';
import Footer from '@/app/footer';
import phonesData from "../../phones.json";

function Page() {
  const filteredPhones = [];

  for (let i = 0; i < phonesData.length; i++) {
    const phone = phonesData[i];
    if (phone.brand === "Apple") {
      filteredPhones.push(phone);
    }
  }

  return (
    <div>
      <div className="PhoneBackground">
      <Header />
      <div className="pageAfterHeader">
        <div className="PhoneTitle"> 
          <h2>IPHONE</h2>
          <div className="PhoneWrapper">
            <div className="PhoneLayout">
              {filteredPhones.map((phone) => (
                <div className="PhoneCard">
                  <h4>{phone.name}</h4>
                  <div className="PhoneImage">
                    <img src={phone.thumbnail} />

                  </div>
                  <div className="PhonePrice">
                    <h4> on sale for ${phone.price}</h4>
                </div>
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
