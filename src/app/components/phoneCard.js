import React from 'react'
import Image from 'next/image'
const PhoneCard = ({name,image}) => {
  return (
    <div className="cardWrapper">
        <div className="cardLayout">
          <div className="iPhoneCard">
            <h2>{name}</h2>
            <button>Buy now!</button>
            <div className="iPhoneImage">
                <Image src={image} width={200} height={200}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PhoneCard