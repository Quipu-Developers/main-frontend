import React, { useEffect, useState } from 'react';
import Object3D1 from './Object3D1';
import Object3D2 from './Object3D2';
import './Home.css';

function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="home-container">
      {isSmallScreen ? <Object3D2 /> : <Object3D1 />}

      <div className="home-container__message">
        <p className="home-container__message--sentence1-pc">서울시립대학교 컴퓨터 학술 동아리</p>
        <p className="home-container__message--sentence1-mobile">
          서울시립대학교<br></br>컴퓨터 학술 동아리
        </p>
        <p className="home-container__message--sentence2">Hello, Quipu!</p>
      </div>
    </div>
  );
}

export default Home;
