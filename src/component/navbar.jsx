import React, { useState } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Logo from './logo';
import { IoIosAdd } from 'react-icons/io';
import { TbHomeFilled } from 'react-icons/tb';
import { GoCodeReview } from 'react-icons/go';
import { BsEnvelopePaperHeartFill } from 'react-icons/bs';
import { GiMicrophone } from 'react-icons/gi';
import { TbPencilHeart } from 'react-icons/tb';
import { TbPencilCode } from 'react-icons/tb';
import { BiSolidSlideshow } from 'react-icons/bi';

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
  const [joinquipuOpen, setJoinquipuOpen] = useState(false);
  const [quipudevOpen, setQuipudevOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavigation = (page) => {
    navigate('/join-quipu', { state: { selectedPage: page } });
  };

  return (
    <>
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
      </nav>

      {/* mobile 메뉴 버튼 */}
      <div
        className="menu-button"
        onClick={() => {
          setMenuOpen(!menuOpen);
          setJoinquipuOpen(false);
          setQuipudevOpen(false);
        }}
      >
        <IoIosAdd />
      </div>

      {/* mobile에서 메뉴들 */}
      <div
        className={`navbar__menu--mobile ${menuOpen ? 'open' : ''}`}
        onClick={() => {
          setMenuOpen(!menuOpen);
          setJoinquipuOpen(false);
          setQuipudevOpen(false);
        }}
      >
        <div>
          <div className="navbar-mobile-block">
            <p>Join Quipu</p>
            <li
              onClick={(e) => {
                setJoinquipuOpen(!joinquipuOpen);
                e.stopPropagation();
              }}
            >
              <BsEnvelopePaperHeartFill />
            </li>
          </div>
          <div className={`navbar-mobile-options ${joinquipuOpen ? 'open' : ''}`}>
            <div className="navbar-mobile-block">
              <p>개발부원</p>
              <li
                onClick={() => {
                  handleNavigation('development');
                  closeMenu();
                }}
              >
                <TbPencilCode />
              </li>
            </div>
            <div className="navbar-mobile-block">
              <p>일반부원</p>
              <li
                onClick={() => {
                  handleNavigation('general');
                  closeMenu();
                }}
              >
                <TbPencilHeart />
              </li>
            </div>
          </div>
        </div>
        <div>
          <div className="navbar-mobile-block">
            <p>QUIPU DEV</p>

            <li
              onClick={(e) => {
                setQuipudevOpen(!quipudevOpen);
                e.stopPropagation();
              }}
            >
              <GoCodeReview />
            </li>
          </div>
          <div className={`navbar-mobile-options ${quipudevOpen ? 'open' : ''}`}>
            <div className="navbar-mobile-block">
              <p>Interview</p>
              <NavLink to="/interview" onClick={closeMenu}>
                <li>
                  <GiMicrophone />
                </li>
              </NavLink>
            </div>
            <div className="navbar-mobile-block">
              <p>Showcase</p>
              <NavLink to="/quipu-dev" onClick={closeMenu}>
                <li>
                  <BiSolidSlideshow />
                </li>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="navbar-mobile-block">
          <p>Home</p>
          <Link to="home" smooth={true} duration={100} onClick={closeMenu}>
            <li>
              <TbHomeFilled />
            </li>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
