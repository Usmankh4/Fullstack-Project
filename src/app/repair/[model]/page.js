import repairData from "../../repairBrand.json";

import Header from "@/components/header";
export default function Page({ params }) {
  
  const repairBrand = repairData.find(p => p.name === params.name);


  if (!repairBrand) return <div>Loading or Not Found...</div>;

  return (
    <div className="container">
      <Header/>
      
         <h1>{repairBrand.name}</h1>



    </div>
  );
}