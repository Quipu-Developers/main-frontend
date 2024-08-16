import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Logo from '../../component/logo';
import './ActivityDetail.css';
import Study from './Study/Study';
import FriendShip from './FriendShip/FriendShip';
import MT from './MT/MT';
import { FaArrowLeftLong } from 'react-icons/fa6';

function ActivityDetail() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Study');

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'Study' || hash === 'Friendship' || hash === 'MT') {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [selectedYear, setSelectedYear] = useState('2024');

  const navigate = useNavigate();

  return (
    <>
      <div className="ActivityDetail-container">
        <NavLink to="/" smooth={true} duration={100}>
          <Logo />
        </NavLink>
        <div className="ActivityDetail-top-mobile">
          <FaArrowLeftLong className="back-button" onClick={() => navigate('/')} />
          <select
            onChange={(e) => setSelectedYear(e.target.value)}
            className="year-dropdown mobile"
          >
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
        <div className="ActivityDetail-titles">
          <FaArrowLeftLong className="back-button pc" onClick={() => navigate('/')} />
          <button
            onClick={() => handleTabClick('Study')}
            style={{ color: activeTab === 'Study' ? '#11324d' : 'white' }}
          >
            STUDY
          </button>
          <button
            onClick={() => handleTabClick('Friendship')}
            style={{ color: activeTab === 'Friendship' ? '#11324d' : 'white' }}
          >
            FRIENDSHIP
          </button>
          <button
            onClick={() => handleTabClick('MT')}
            style={{ color: activeTab === 'MT' ? '#11324d' : 'white' }}
          >
            MT
          </button>
          <select onChange={(e) => setSelectedYear(e.target.value)} className="year-dropdown">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
        <div className="ActivityDetail-content">
          {activeTab === 'Study' && <Study selectedYear={selectedYear} />}
          {activeTab === 'Friendship' && <FriendShip selectedYear={selectedYear} />}
          {activeTab === 'MT' && <MT selectedYear={selectedYear} />}
        </div>
      </div>
    </>
  );
}

export default ActivityDetail;
