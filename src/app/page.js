
import Header from './header'
import BannerImage from './images/phone.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
          <Header />
          <div className="pageAfterHeader">
            <div className="heroBanner">
              <div className="repairText">
                <h2>Repair Is Our Specialty</h2>
              </div>
              <div className="heroImage">
                <Image
                  src={BannerImage}></Image>
              </div>
            </div>
            </div>

      </div>
  )
}
