import Header from './Header';
import './Main.css';

import bannerImage from "./image/phone.png";

import phones from './phones.json';

function Main() {
  console.log(phones);
  return (
    <div>
        <Header/>
        
        <div className="pageAfterHeader">
            <div className="heroBanner">
              <div className='repairText'><h2>Repair Is Our Specialty</h2></div>
              <div className="heroImage"><img src={bannerImage}></img></div>
            </div>




        </div>
        


     

     
      
    </div>
  );
}

export default Main;
