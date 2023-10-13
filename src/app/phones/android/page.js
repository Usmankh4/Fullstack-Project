import '../../globals.css';
import Header from '@/app/header';
import Footer from '@/app/footer';
import phonesData from "../../phones.json";
import PhoneCard from "@/components/phonecard";
import groupByBrand from "@/components/groupbybrand";

export default function android() {
    return (

      <div>
        
        <Header></Header>

        <h3> This is the android page </h3>

        
        <Footer></Footer>
      
      <Footer />
    </div>
    
  );
}
