import React, { useState, useEffect, useRef } from 'react';
import './RecommendSite.css';

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
        <img width="60px" height="60px" src={process.env.PUBLIC_URL + img} alt={name}></img>
        <div>
          <p style={{ fontSize: '15px', fontWeight: 'bold', margin: '5px' }}>{name}</p>
          {isListHover ? <p style={{ fontSize: '12px', margin: '5px' }}>{exp}</p> : null}
        </div>
      </div>
    </div>
  );
}

function RecommendSite() {
  const scrollContainerRef = useRef(null);

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      const { deltaY } = e;
      scrollContainerRef.current.scrollLeft += deltaY;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="recommend-site">
      <div className="recommend-site__title">Recommend Site</div>
      <div className="recommend-site__container">
        <div ref={scrollContainerRef} className="recommend-site__box">
          <div className="recommend-site__box--top">
            <Icon
              img="/RecommendSite-img/chatGPT.png"
              name="ChatGPT"
              exp="AI 챗봇, 문서 작성 및 정보 검색 지원"
              link="https://chat.openai.com/"
            />
            <Icon
              img="/RecommendSite-img/leetCode.png"
              name="LeetCode"
              exp="코딩 인터뷰 특화, 기술 기업 스타일 문제 사이트"
              link="https://leetcode.com/"
            />
            <Icon
              img="/RecommendSite-img/hackerRank.png"
              name="HackerRank"
              exp="코딩 테스트 중심의 실무 기술 평가 사이트"
              link="https://www.hackerrank.com/"
            />
            <Icon
              img="/RecommendSite-img/w3Schools.png"
              name="W3 Schools"
              exp="웹 개발 학습 자료 제공 사이트"
              link="https://www.w3schools.com/"
            />
            <div className="recommend-site__icon--blank"></div>
          </div>
          <div ref={scrollContainerRef} className="recommend-site__box--bottom">
            <Icon
              img="/RecommendSite-img/baekjoon.png"
              name="BaekJoon"
              exp="알고리즘 문제 풀이 경쟁 사이트"
              link="https://www.acmicpc.net/"
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
        </div>
      </div>
    </div>
  );
}

export default RecommendSite;
