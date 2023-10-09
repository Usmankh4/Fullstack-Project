import '../../globals.css';
import Header from '../../header';
import groupByBrand from '@/app/components/groupbybrand';
import PhoneCard from '@/app/components/phoneCard';
import phonesData from "../../phones.json"
const iPhonePage = () => {
  const groupedPhones = groupByBrand(phonesData);
  const brandToDisplay = "Apple"; // Display only Apple products

  // Check if the brand exists in the groupedPhones
  if (!groupedPhones[brandToDisplay]) {
      return <div>No phones available for {brandToDisplay}</div>;
  }

  return (
      <div className="phone-list">
          <h1>{brandToDisplay} Phones</h1>
          <div className="brand-group">
              {groupedPhones[brandToDisplay].map(phone => (
                  <PhoneCard key={phone.name} phone={phone} />
              ))}
          </div>
      </div>
  );
};

export default iPhonePage;