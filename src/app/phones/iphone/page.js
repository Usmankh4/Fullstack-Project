import Header from '../../header';
import Footer from '../../footer';
import phonesData from "../../phones.json";
import PhoneCard from "@/components/phonecard";
import groupByBrand from "@/components/groupbybrand";

export default function Page() {
  const groupedPhones = groupByBrand(phonesData);
  console.log(phonesData);
  
  
  const applePhones = groupedPhones['Apple'] || [];

  return (
    <div>
      <Header />
      <div className="categories">

       <div className="category-title"> <h1>iPhone</h1>
        <div className="brand-group">
          {applePhones.map(phone => (
            <PhoneCard key={phone.name} name={phone.name} image={phone.thumbnail} />
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
