import Header from '../../header';
import Footer from '../../footer';
import phonesData from "../../phones.json";
import PhoneCard from "@/components/phonecard";
import groupByBrand from "@/components/groupbybrand";

export default function Page() {
  const groupedPhones = groupByBrand(phonesData);
  console.log(phonesData);
  
  
  const androidPhones = groupedPhones['Android'] || [];

  return (
    <div>
      <Header />
      <div className="categories">

       <div className="category-title"> <h1>Android</h1>
        <div className="brand-group">
          {androidPhones.map(phone => (
            <PhoneCard key={phone.name} name={phone.name} image={phone.thumbnail} />
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
