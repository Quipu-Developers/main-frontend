import './Showcasemain.css';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { showcase_data } from '../../data/showcase_data.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowcasemainMobile from './showcaseMainMobile.jsx'; // ShowcasemainMobile 컴포넌트 임포트
import { FaArrowLeftLong } from 'react-icons/fa6';

function Showcasemain() {
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  const navigate = useNavigate();

  const handleIndexClick = () => {
    navigate(`/quipu-dev/detail`, {
      state: {
        projectname: showcase_data[index].project_name,
        index: index,
      },
    });
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setting
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowWidth <= 900) {
    return <ShowcasemainMobile />;
  }

  return (
    <div className="showcasemain-house">
      <div className="showcasemain-nav">
        <section className="showcasemain-logo">
          <NavLink to="/">QUIPU</NavLink>
        </section>
      </div>
      <FaArrowLeftLong className="back-button" onClick={() => navigate('/')} />
      <div className="showcasemain-container">
        <div className="showcasemain">
          <div className="section1">
            {showcase_data.map((element, index) => (
              <div
                className="btn-hover color-8"
                key={index}
                onClick={() => {
                  setIndex(index);
                  setSelectedIndex(index);
                }}
                style={{
                  color: selectedIndex === index ? 'white' : '#AAAAAA',
                  cursor: 'pointer',
                }}
              >
                {element.project_name}
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
              <div className="gallery3">
                <img
                  src={showcase_data[index].main_img[1]}
                  alt={showcase_data[index].project_name}
                />
              </div>
              <div className="gallery3 text">
                <h4>{showcase_data[index].project_name}</h4>
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
            <div className="gallery" style={{ border: 'none', backgroundColor: 'transparent' }}>
              <div className="gallery2">
                <h3>&#34;{showcase_data[index].project_summary}&#34;</h3>
                <h4 className="view-button" onClick={handleIndexClick}>
                  View This Project
                </h4>
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
        </div>
      </div>
    </div>
  );
}

export default Showcasemain;
