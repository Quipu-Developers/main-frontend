import React, { useState } from 'react';
import './RecommendSite.css';

function RecommendSite() {
  return (
    <div className="recommend-site">
      <div className="recommend-site__title">
        <span style={{ color: '#0066ff' }}>R</span>ecommend Site
      </div>
      <div className="recommend-site__container">
        <div className="recommend-site__box">
          <div className="recommend-site__box--top">
            <Icon
              img="/RecommendSite-img/chatGPT.png"
              name="ChatGPT"
              exp="AI 챗봇, 문서 작성 및 정보 검색 지원"
              link="https://chat.openai.com/"
            />
            <Icon
              img="/RecommendSite-img/replit.png"
              name="Replit"
              exp="코드 작성 및 실행 가능한 온라인 플랫폼"
              link="https://replit.com/"
            />
            <Icon
              img="/RecommendSite-img/computerWorld.png"
              name="Computer World"
              exp="IT 최신 뉴스 및 인사이트 제공 사이트"
              link="https://www.computerworld.com/"
            />
          </div>
          <div className="recommend-site__box--bottom">
            <Icon
              img="/RecommendSite-img/w3Schools.png"
              name="W3 Schools"
              exp="다양한 웹 개발 언어 정보 및 문제 풀어볼 수 있는 곳"
              link="https://www.w3schools.com/"
            />
            <Icon
              img="/RecommendSite-img/mdn.png"
              name="MDN Web Docs"
              exp="웹 기술에 대한 문서와 예제를 제공하는 사이트"
              link="https://developer.mozilla.org/"
            />
          </div>
        </div>
        <div className="recommend-site-box-mobile">
          <Icon
            img="/RecommendSite-img/chatGPT.png"
            name="ChatGPT"
            exp="AI 챗봇, 문서 작성 및 정보 검색 지원"
            link="https://chat.openai.com/"
          />
          <Icon
            img="/RecommendSite-img/replit.png"
            name="Replit"
            exp="코드 작성 및 실행 가능한 온라인 플랫폼"
            link="https://replit.com/"
          />
          <Icon
            img="/RecommendSite-img/computerWorld.png"
            name="Computer World"
            exp="IT 최신 뉴스 및 인사이트 제공 사이트"
            link="https://www.computerworld.com/"
          />
          <Icon
            img="/RecommendSite-img/w3Schools.png"
            name="W3 Schools"
            exp="다양한 웹 개발 언어 정보 및 문제 풀어볼 수 있는 곳"
            link="https://www.w3schools.com/"
          />
          <Icon
            img="/RecommendSite-img/mdn.png"
            name="MDN Web Docs"
            exp="웹 기술에 대한 문서와 예제를 제공하는 사이트"
            link="https://developer.mozilla.org/"
          />
        </div>
      </div>
    </div>
  );
}

function Icon({ img, name, link, exp }) {
  const [isListHover, setIsListHover] = useState(false);

  return (
    <div
      onMouseOver={() => setIsListHover(true)}
      onMouseOut={() => setIsListHover(false)}
      onFocus={() => setIsListHover(true)}
      onBlur={() => setIsListHover(false)}
      className="recommend-site__icon"
      onClick={() => {
        window.open(link, '_blank');
      }}
    >
      <div className="recommend-site__icon--top1">
        <p style={{ color: '#FF5F56', marginTop: '4px', marginLeft: '10px', fontSize: '10px' }}>
          ●
        </p>
        <p style={{ color: '#FEBC2E', marginLeft: '7px', marginTop: '4px', fontSize: '10px' }}>●</p>
        <p style={{ color: '#28C840', marginLeft: '7px', marginTop: '4px', fontSize: '10px' }}>●</p>
      </div>
      <div className="recommend-site__icon--top2"></div>
      <div className="recommend-site__icon--body">
        <img src={process.env.PUBLIC_URL + img} alt={name}></img>
        <div>
          <p style={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '10px' }}>{name}</p>
          {isListHover ? <p style={{ fontSize: '12px', marginLeft: '10px' }}>{exp}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default RecommendSite;
