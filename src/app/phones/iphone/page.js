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
      <Header />
      <div className="pageAfterHeader">
        <div className="PhoneTitle"> 
          <h2>IPHONE</h2>
          <div className="PhoneWrapper">
            <div className="PhoneLayout">
              {filteredPhones.map((phone) => (
                <div className="PhoneCard">
                  
                  <h3>{phone.name}</h3>
                  <div className="PhoneImage">
                    <img src={phone.thumbnail} />
                  </div>
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

export default Page;
