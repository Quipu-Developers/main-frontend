import './Footer.css';
import Logo from '../../component/logo';
import { FaInstagram } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { RiKakaoTalkFill } from 'react-icons/ri';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-contact">
        <h5>Contact.</h5>
        <p>
          카카오톡&nbsp;|&nbsp;
          <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
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
        <Logo />
        <div className="footer-icon mobile">
          <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
          </a>
          <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
            <IoIosMail className="icon" />
          </a>
          <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
            <RiKakaoTalkFill className="icon" />
          </a>
        </div>
        <p>Copyright 2024.QUIPU. All rights reserved.</p>
        <p>Icon designed by Flaticon(Freepik)</p>
      </div>
      <div className="footer-icon pc">
        <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </a>
        <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
          <IoIosMail className="icon" />
        </a>
        <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
          <RiKakaoTalkFill className="icon" />
        </a>
      </div>
    </div>
  );
}
