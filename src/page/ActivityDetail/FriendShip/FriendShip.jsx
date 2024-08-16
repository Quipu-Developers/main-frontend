import React, { useState } from 'react';
import './FriendShip.css';
import friendship_data from '../../../data/friendship_data';

function FriendShip({ selectedYear }) {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImgClick = (img) => {
    setSelectedImg(img);
  };

  const closeModal = () => {
    setSelectedImg(null);
  };

  const filteredImages = friendship_data.filter((image) => image.year === selectedYear);

  return (
    <>
      <div className="FriendShip-container">
        {filteredImages.map((image, index) => (
          <img
            onClick={() => handleImgClick(image.src)}
            className="FriendShip-img"
            src={process.env.PUBLIC_URL + image.src}
            key={index}
            alt="친목"
          ></img>
        ))}

        {/*이미지들을 왼쪽부터 정렬한 듯 보이도록 빈 이미지 추가*/}
        <div className="blank-img"></div>
        <div className="blank-img"></div>
        <div className="blank-img"></div>
      </div>

      {selectedImg && (
        <div className="img__modal--container" onClick={closeModal}>
          <img src={process.env.PUBLIC_URL + selectedImg} className="img__modal" alt="친목" />
        </div>
      )}
    </>
  );
}

export default FriendShip;
