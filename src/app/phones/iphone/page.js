import '../../globals.css';
import Footer from '@/app/components/footer';
import Header from '@/app/components/header';
import PhoneCard from '@/app/components/phoneCard';
import groupByBrand from '@/app/components/groupByBrand';
import phonesData from "../../phones.json"
const iPhonePage = () => {
  const groupedPhones = groupByBrand(phonesData);
  const brandToDisplay = "Apple"; // Display only Apple products
    console.log(groupedPhones)
  // Check if the brand exists in the groupedPhones
  if (!groupedPhones[brandToDisplay]) {
      return <div>No phones available for {brandToDisplay}</div>;
  }

  return (
    <div>
        <Header/>
        <div className='categories'>
            <h1>{brandToDisplay} Phones</h1>
            <div className="brand-group">
                {groupedPhones[brandToDisplay].map(phone => (
                    <PhoneCard name = {phone.name} image={phone.thumbnail} />
                ))} 
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default iPhonePage;