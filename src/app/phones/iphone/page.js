import React from "react";
import Header from "../../header";
import Footer from "../../footer";
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
      <div className="cardWrapper">
              <div className="cardLayout">
        {filteredPhones.map((phone) => (
          
          
                <div className="iPhoneCard">
                  <h2>{phone.name}</h2>
                  
                  <img src={phone.thumbnail} />
                </div>
            
            
          
        ))}
      </div>
      </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default Page;
