import '../../globals.css';
import Header from '../../header';
import Image from "next/image";

export default function repair() {
  return (
    <div>
      <Header></Header>
      <div className="pageAfterHeader">
        <h3> This is the repair page </h3>

        <div className="phones-grid">
          <div className="phone-card">
            <div className="phonePicture">
              
            <h4>iPhone 14 Plus</h4>
            <p>Get your phone fixed today. Check out our price list now!</p>
            <button>LEARN MORE</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
