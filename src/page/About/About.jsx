import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import { BsMouseFill } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';

function About() {
  const navigate = useNavigate();
  const [dropdown, IsDropdown] = useState(false);
  const [moved, isMoved] = useState(true);
  const [movePixel, setMovePixel] = useState(0.8 * window.innerWidth - 60);

  useEffect(() => {
    const handleResize = () => {
      setMovePixel(0.8 * window.innerWidth - 60);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollContainerRef = useRef(null);
  const cardIndex = useRef(0);

  const scrollToNextCard = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      cardIndex.current += 1;
      if (cardIndex.current >= 3) cardIndex.current = 0; // 카드 수에 맞게 조정
      container.scrollTo({
        left: cardIndex.current * window.innerWidth,
        behavior: 'smooth',
      });
      isMoved(!moved);
    }
  };

  return (
    <div className="about-container">
      {/* 메인 */}
      <div className="about-main">
        <img src={process.env.PUBLIC_URL + '/About-img/main.png'} alt="Main Visual" />
        <div className="about-main-text">
          <h1>
            <span style={{ color: '#0066FF' }}>A</span>bout
          </h1>
          <p>안녕하세요!</p>
          <p>
            서울시립대학교 중앙 컴퓨터 학술 동아리 <span id="about-logo">QUIPU</span> 입니다.
          </p>
          <p>
            ‘퀴푸’는 문자 없이 끈과 매듭으로 정보를 기록하고 전달하는 고대 잉카 제국에서 사용된
            시스템을 뜻합니다.
          </p>
          <p>
            이러한 어원에 따른 <span id="about-logo">QUIPU</span>의 핵심 키워드 세 가지를
            소개합니다!
          </p>
        </div>
      </div>

      {/* 키워드 */}
      <div className="about-keyword">
        <h1 onClick={() => scrollToNextCard()}>
          Our <span>Key</span>word
          <BsMouseFill />
        </h1>

        <div
          className="about-keyword-slide-rectangle rectangle__1"
          style={{ transform: moved ? `translateX(${movePixel}px)` : `translateX(0)` }}
        />

        <div className="about-keyword-slide" ref={scrollContainerRef}>
          <div className="about-keyword-slide-text slide__1">
            <h4>Potential</h4>
            <p>퀴푸의 매듭처럼, 각 구성원은 저마다의 잠재력을 가지고 있습니다.</p>
            <p>이 잠재력이 모여 QUIPU는 더 큰 혁신과 성장을 이끌어냅니다.</p>
          </div>
          <div className="about-keyword-slide-text slide__2">
            <h4>Challenging</h4>
            <p>퀴푸가 다양한 매듭을 통해 복잡한 정보를 전달했듯이,</p>
            <p>QUIPU는 새로운 도전과 과제를 해결하며 끊임없이 성장합니다.</p>
          </div>
          <div className="about-keyword-slide-text slide__3">
            <h4>Passion</h4>
            <p>퀴푸의 끈이 정보를 연결하듯,</p>
            <p>QUIPU 구성원들은 뜨거운 열정으로 서로를 연결하고 함께 나아갑니다.</p>
          </div>
        </div>

        <div
          className="about-keyword-slide-rectangle rectangle__2"
          style={{ transform: moved ? `translateX(-${movePixel}px)` : `translateX(0)` }}
        />
      </div>

      {/* 활동, 액티비티 */}
      <div className="about-activity">
        <h1>
          <span style={{ color: '#0066FF' }}>A</span>ctivity
        </h1>

        <div className="about-activity-content">
          <div className="about-activity-left">
            <div className="about-activity-img">
              <img
                src={process.env.PUBLIC_URL + '/ActivityDetail-img/2024/Study/리액트스터디2.jpeg'}
                alt="활동1"
              />
            </div>
            <div className="about-activity-left-text">
              <p>
                그 밖에도 <span>MT, 개총</span> 등 다양한 친목 활동을 하면서
              </p>
              <p>
                <span>네트워크</span>를 형성할 수 있습니다!
              </p>
            </div>
          </div>

          <div className="about-activity-right">
            <div className="about-activity-right-text">
              <p>
                <span id="about-logo">QUIPU</span> 에서는 <span>프로그래밍 언어 기초 공부</span>,
              </p>
              <p>
                <span>개발, 공모전</span> 등 컴퓨터와 관련하여
              </p>
              <p>다양하게 스터디를 개설하거나 스터디에 참여할 수 있습니다.</p>
            </div>
            <div className="about-activity-img">
              <img
                src={process.env.PUBLIC_URL + '/ActivityDetail-img/2023/MT/엠티3.jpg'}
                alt="활동2"
              />
              <div className="about-activity-right-img-border"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 테크스택 */}
      <div className="about-tech">
        <div className="about-tech-top">
          <h4>
            특히 <span id="about-logo">QUIPU</span>의 주 활동인 <span>웹 개발 프로젝트</span>에서는
          </h4>
          <h4>아래와 같은 기술 스택을 사용하여 다양한 프로젝트를 진행합니다.</h4>
        </div>

        <div className="about-tech-stack">
          <h1>Our Tech Stack</h1>
          <div className="about-tech-stack-list">
            {/* 테크스택 리스트 윗줄 */}
            <div className="about-tech-stack-list-top">
              <div className="techstack-container">
                <div className="techstack about-react">
                  <FaReact />
                </div>
                <p>React.js</p>
              </div>
              <div className="techstack-container">
                <div className="techstack about-js">
                  <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" />
                </div>
                <p>JavaScript</p>
              </div>
              <div className="techstack-container">
                <div className="techstack about-nodejs">
                  <img src={process.env.PUBLIC_URL + '/About-img/nodejs.png'} alt="icon" />
                  <img
                    className="about-nodejs-back"
                    src={process.env.PUBLIC_URL + '/About-img/nodejsback.png'}
                    alt="iconback"
                  />
                </div>
                <p>Node.js</p>
              </div>
            </div>

            {/* 테크스택 리스트 아랫줄 */}
            <div className="about-tech-stack-list-bottom">
              <div className="techstack-container">
                <div className="techstack about-mysql">
                  <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" />
                </div>
                <p>MySQL</p>
              </div>
              <div className="techstack-container">
                <div className="techstack about-aws">
                  <img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" />
                </div>
                <p>AWS</p>
              </div>
              <div className="techstack-container">
                <div className="techstack about-github">
                  <img src="https://techstack-generator.vercel.app/github-icon.svg" alt="icon" />
                </div>
                <p>GitHub</p>
              </div>
            </div>

            {/* 테크스택 리스트 가로박스 */}
            <div className="about-tech-stack-rectangle rectangle__1" />
            <div className="about-tech-stack-rectangle rectangle__2" />
          </div>
        </div>
      </div>

      {/* 퀴푸 개발팀, 퀴푸 뎁, 퀴푸디브 */}
      <div className="about-dev">
        <p>
          퀴푸에서 해온 웹 개발 프로젝트의 과정과<br></br>참여자들의 인터뷰를 보고 싶다면,
        </p>
        <p>
          아래 <span>&apos;QUIPU-DEV&apos;</span> 버튼을 눌러주세요!
        </p>

        <div className="about-dev-button">
          <button onClick={() => IsDropdown(!dropdown)}>
            QUIPU-DEV
            {dropdown !== true && (
              <img src={process.env.PUBLIC_URL + '/About-img/pointer.png'} alt="pointer" />
            )}
          </button>
          {dropdown === true && (
            <div className="about-dev-button-list">
              <p onClick={() => navigate('/quipu-dev')}>Showcase</p>
              <p onClick={() => navigate('/interview')}>Interview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
