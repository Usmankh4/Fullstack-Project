import Header from "../components/header";
import Footer from "../components/footer"
import phonesData from "../phones.json"
import PhoneCard from "../components/phoneCard";
import groupByBrand from "../components/groupByBrand";
export default function Page() {
  const groupedPhones = groupByBrand(phonesData);
  console.log(phonesData)
  return (
    <div >
      <Header/>
      <div className="categories">
            {Object.keys(groupedPhones).map(brand => (
                <div key={brand}>
                    <h1>{brand} Phones</h1>
                    <div className="brand-group">
                        {groupedPhones[brand].map(phone => (
                         
                         <PhoneCard name={phone.name} image={phone.thumbnail} />
                            
                        ))}
                    </div>
                </div>
            ))}
        </div>
      <Footer/>
    </div>
  )
}