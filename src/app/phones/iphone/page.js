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

        <div className="phoneTitle"> 
        <h2>IPHONE</h2>
      <div className="phoneWrapper">
              <div className="phoneLayout">
        {filteredPhones.map((phone) => (
          
          
                <div className="PhoneCard">
                  <h2>{phone.name}</h2>
                  
                  <img src={phone.thumbnail} />
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
