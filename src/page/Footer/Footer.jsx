import './Footer.css';
import Logo from '../../component/logo';
import { Link } from 'react-scroll';
import { FaInstagram } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer-contact">
        <h5>Contact.</h5>
        <p>
          카카오톡&nbsp;|&nbsp;
          <a href="https://open.kakao.com/o/s59wy7Gg" target="_blank" rel="noopener noreferrer">
            &apos;퀴푸 문의 오픈톡방&apos;
          </a>
          &nbsp;검색
        </p>
        <p>
          인스타그램&nbsp;|&nbsp;
          <a
            href="https://www.instagram.com/uos_quipu?igsh=MTVjZTFhaXl6NGRoZQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            @uos_quipu
          </a>
        </p>
        <p>동아리방 주소&nbsp;|&nbsp; 학생회관 342호</p>
      </div>
      <div className="footer-logo">
        <Link to="home" smooth={true} duration={100} onClick={() => navigate('/')}>
          <Logo />
        </Link>
        <div className="footer-icon mobile">
          <FooterIcon />
        </div>
        <p>Copyright 2024.QUIPU. All rights reserved.</p>
        <p>Icon designed by Flaticon(Freepik)</p>
      </div>
      <div className="footer-icon pc">
        <FooterIcon />
      </div>
    </div>
  );
}

function FooterIcon() {
  return (
    <>
      <a
        href="https://www.instagram.com/uos_quipu?igsh=MTVjZTFhaXl6NGRoZQ=="
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="icon" />
      </a>
      <a href="mailto:quipu0316@gmail.com">
        <IoIosMail className="icon" />
      </a>
      <a href="https://open.kakao.com/o/s59wy7Gg" target="_blank" rel="noopener noreferrer">
        <RiKakaoTalkFill className="icon" />
      </a>
    </>
  );
}
