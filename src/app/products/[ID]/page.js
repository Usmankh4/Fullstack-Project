import phonesData from "../../phones.json";

export default function Page({ params }) {
  
 
 const phoneId = parseInt(params.ID, 10);
 const phone = phonesData.find(p => p.id === phoneId);

  if (!phone) return <div>Loading or Not Found...</div>;

  return (
    <div>
      <h1>{phone.name}</h1>
      <img src={phone.thumbnail} alt={phone.name} />
      <p>Price: ${phone.price}</p>
    
    </div>
  );
}