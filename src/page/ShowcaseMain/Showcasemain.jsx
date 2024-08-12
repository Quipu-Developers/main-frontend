import './Showcasemain.css';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { showcase_data } from '../../data/showcase_data.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowcasemainMobile from './showcaseMainMobile.jsx'; // ShowcasemainMobile 컴포넌트 임포트

function Showcasemain() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const navigate = useNavigate();

  const handleIndexClick = () => {
    navigate(`/quipu-dev/detail`, {
      state: {
        projectname: showcase_data[index].project_name,
        index: index,
      },
    });
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    // 윈도우 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return <ShowcasemainMobile />;
  }

  return (
    <div className="showcasemain-house">
      <div className="showcasemain-nav">
        <section className="showcasemain-logo">
          <NavLink to="/">QUIPU</NavLink>
        </section>
      </div>
      <div className="showcasemain-container">
        <div className="showcasemain">
          <div className="section1">
            {showcase_data.map((element, index) => (
              <div className="showcasemain-list" key={index} onClick={() => setIndex(index)}>
                {showcase_data[index].project_name}
              </div>
            ))}
          </div>
          <div className="section2">
            <div className="gallery">
              <div className="gallery1">
                <img
                  src={showcase_data[index].main_img[0]}
                  alt={showcase_data[index].project_name}
                />
              </div>
            </div>
            <div className="gallery">
              <div className="gallery2">
                <h3>{showcase_data[index].project_name}</h3>
              </div>
            </div>
            <div className="gallery">
              <div className="gallery3">
                <img
                  src={showcase_data[index].main_img[1]}
                  alt={showcase_data[index].project_name}
                />
              </div>
              <div className="gallery3">
                <div className="gallery3-text">
                  <h4>{showcase_data[index].goal}</h4>
                  <p>{showcase_data[index].this_project}</p>
                </div>
              </div>
              <div className="gallery3">
                <img
                  src={showcase_data[index].main_img[2]}
                  alt={showcase_data[index].project_name}
                />
              </div>
              <div className="gallery3">
                <img
                  src={showcase_data[index].main_img[3]}
                  alt={showcase_data[index].project_name}
                />
              </div>
            </div>
            <div className="gallery">
              <div className="gallery4">
                <img
                  src={showcase_data[index].main_img[4]}
                  alt={showcase_data[index].project_name}
                />
              </div>
            </div>
          </div>
          <h4 className="view-button" onClick={handleIndexClick}>
            VIEW
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Showcasemain;
