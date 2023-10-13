import '../../globals.css';
import Header from '@/app/header';
import Footer from '@/app/footer';
import phonesData from "../../phones.json";
import PhoneCard from "@/components/phonecard";
import groupByBrand from "@/components/groupbybrand";

export default function Page() {
  const groupedPhones = groupByBrand(phonesData);
  console.log(phonesData);
  
  
  const samsungPhones = groupedPhones['Samsung'] || [];

  return (
    <div>
      <Header />
      <div className="categories">

       <div className="category-title"> <h1>Samsung</h1>
        <div className="brand-group">
          {samsungPhones.map(phone => (
            <PhoneCard key={phone.name} name={phone.name} image={phone.thumbnail} />
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
