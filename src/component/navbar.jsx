import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Logo from './logo';

function QuipuDevDropdown({ isVisible }) {
  return isVisible ? (
    <div className="dropdown-box">
      <NavLink to="/quipu-dev" smooth>
        <p>Showcase</p>
      </NavLink>
      <NavLink to="/interview" smooth>
        <p>Interview</p>
      </NavLink>
    </div>
  ) : null;
}

function JoinQuipuDropdown({ isVisible, onNavigate }) {
  return isVisible ? (
    <div className="dropdown-box">
      <p
        style={{
          border: '1.5px solid rgb(86, 127, 187, 0.8)',
          color: '#567FBB',
          backgroundColor: '#EDF4FF',
        }}
        onClick={() => onNavigate('general')}
      >
        일반 부원
      </p>
      <p
        style={{
          border: '1.5px solid rgb(86, 127, 187, 0.8)',
          color: '#567FBB',
          backgroundColor: '#EDF4FF',
        }}
        onClick={() => onNavigate('development')}
      >
        개발 부원
      </p>
    </div>
  ) : null;
}

const Navbar = () => {
  const [dropdownState, setDropdownState] = useState({
    quipuDevDropdown: false,
    joinQuipuDropdown: false,
    activityToggle: false,
    quipuDevToggle: false,
    joinQuipuToggle: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigation = (page) => {
    navigate('/join-quipu', { state: { selectedPage: page } });
  };

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <Link to="home" smooth={true} duration={100} onClick={closeMenu}>
        <Logo />
      </Link>

      {/* pc에서 메뉴들 */}
      <div className="navbar__menu--pc">
        <li>
          <Link to="home" smooth={true} duration={100}>
            home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={100}>
            about
          </Link>
        </li>
        <li>
          <Link to="activity" smooth={true} duration={100}>
            activity
          </Link>
        </li>
        <li>
          <Link to="recommend-site" smooth={true} duration={100}>
            recommend site
          </Link>
        </li>
        <h4 onClick={() => toggleDropdown('quipuDevDropdown')}>
          quipu dev
          <QuipuDevDropdown isVisible={dropdownState.quipuDevDropdown} />
        </h4>
        <h4
          style={{
            border: '1.5px solid rgb(86, 127, 187, 0.8)',
            color: '#567FBB',
          }}
          onClick={() => toggleDropdown('joinQuipuDropdown')}
        >
          join quipu
          <JoinQuipuDropdown
            isVisible={dropdownState.joinQuipuDropdown}
            onNavigate={handleNavigation}
          />
        </h4>
      </div>

      {/* mobile에서 메뉴 버튼 */}
      <input
        style={{ display: 'none' }}
        id="menu-toggle"
        type="checkbox"
        checked={menuOpen}
        onChange={() => setMenuOpen(!menuOpen)}
      />
      <label className={`menu-button ${menuOpen ? 'open' : ''}`} htmlFor="menu-toggle">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </label>

      {/* mobile에서 메뉴들 */}
      <div className={`navbar__menu--mobile ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="home" smooth={true} duration={100} onClick={closeMenu}>
            home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={100} onClick={closeMenu}>
            about
          </Link>
        </li>
        <li>
          <div className="mobile-dropdown">
            <Link to="activity" smooth={true} duration={100} onClick={closeMenu}>
              activity
            </Link>
            <div
              className={`mobile-dropdown-button ${dropdownState.activityToggle ? 'open' : ''}`}
              onClick={() => toggleDropdown('activityToggle')}
            >
              <span className="line line4"></span>
              <span className="line line5"></span>
            </div>
          </div>
          <div
            className={`mobile-dropdown-content ${dropdownState.activityToggle ? 'visible' : ''}`}
          >
            <NavLink to="/activity-detail#Study" onClick={closeMenu}>
              <li>study</li>
            </NavLink>
            <NavLink to="/activity-detail#Friendship" onClick={closeMenu}>
              <li>friendship</li>
            </NavLink>
            <NavLink to="/activity-detail#MT" onClick={closeMenu}>
              <li>mt</li>
            </NavLink>
          </div>
        </li>
        <li>
          <Link to="recommend-site" smooth={true} duration={100} onClick={closeMenu}>
            recommend site
          </Link>
        </li>
        <li>
          <div className="mobile-dropdown">
            <div>quipu dev</div>
            <div
              className={`mobile-dropdown-button ${dropdownState.quipuDevToggle ? 'open' : ''}`}
              onClick={() => toggleDropdown('quipuDevToggle')}
            >
              <span className="line line4"></span>
              <span className="line line5"></span>
            </div>
          </div>
          <div
            className={`mobile-dropdown-content ${dropdownState.quipuDevToggle ? 'visible' : ''}`}
          >
            <NavLink to="/quipu-dev" onClick={closeMenu}>
              <li>showcase</li>
            </NavLink>
            <NavLink to="/interview" onClick={closeMenu}>
              <li>interview</li>
            </NavLink>
          </div>
        </li>
        <li>
          <div className="mobile-dropdown">
            <div>join quipu</div>
            <div
              className={`mobile-dropdown-button ${dropdownState.joinQuipuToggle ? 'open' : ''}`}
              onClick={() => toggleDropdown('joinQuipuToggle')}
            >
              <span className="line line4"></span>
              <span className="line line5"></span>
            </div>
          </div>
          <div
            className={`mobile-dropdown-content ${dropdownState.joinQuipuToggle ? 'visible' : ''}`}
          >
            <div
              onClick={() => {
                handleNavigation('general');
                closeMenu();
              }}
            >
              <li>일반 부원</li>
            </div>
            <div
              onClick={() => {
                handleNavigation('development');
                closeMenu();
              }}
            >
              <li>개발 부원</li>
            </div>
          </div>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
