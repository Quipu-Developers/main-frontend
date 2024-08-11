import { useState } from 'react';
import '../page/Event/Event.css';

export function RecruitBoard() {
  return (
    <div className="event-big-block">
      <div className="event-recruit-description">
        <p>8월 21일부터 퀴푸에서 새로운 회원을 모집합니다.</p>
        <p>
          <span>join quipu</span>에서 모집 공고를 확인할 수 있습니다.
        </p>
        <p>많은 관심 부탁드립니다!</p>
      </div>
      <div className="event-recruit-table">
        {/* 첫번째 행 */}
        <div className="event-recruit-table row">
          <div style={{ backgroundColor: 'rgb(255, 180, 194, 0.4)' }}>
            <p>개발부원</p>
          </div>
          <div style={{ backgroundColor: 'rgb(54, 194, 206, 0.5)' }}>
            <p>일반부원</p>
          </div>
        </div>
        {/* 두번째 행 */}
        <div className="event-recruit-table row">
          <div style={{ backgroundColor: 'rgb(255, 180, 194, 0.2)' }}>
            <p>UI/UX 디자인</p>
            <img />
            <p>프론트엔드</p>
            <img />
            <p>백엔드</p>
            <img />
          </div>
          <div style={{ backgroundColor: 'rgb(54, 194, 206, 0.3)' }}>
            <p>컴퓨터</p>
            <img />
            <p>를 사랑하는 모든 재학생</p>
          </div>
        </div>
      </div>
      <div className="event-recruit-info">
        <div>
          <img />
          <p>@uos_quipu</p>
        </div>
        <div>
          <img />
          <p>quipu0316@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export function RouletteItem({ segments }) {
  const labelColors = {
    chicken: '#161D6F',
    coupon: '#3797A4',
    hamburger: '#7579E7',
    drink: '#87CEEB',
    boom: '#E3F6FF',
  };

  const totalItems = segments.reduce((acc, curr) => acc + curr.count, 0);

  const percentageSegments = segments.map((segment) => ({
    ...segment,
    percentage: (segment.count / totalItems) * 100,
  }));

  const conicGradient = percentageSegments
    .map((segment, index) => {
      const start = percentageSegments
        .slice(0, index)
        .reduce((acc, curr) => acc + curr.percentage, 0);
      const end = start + segment.percentage;
      return `${labelColors[segment.label]} ${start}% ${end}%`;
    })
    .join(', ');

  return (
    <div className="roulette-item">
      {/* 룰렛 테두리 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '4px solid #071952',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* 룰렛 내부 */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `conic-gradient(${conicGradient})`,
            borderRadius: '50%',
            position: 'relative',
            zIndex: 1,
          }}
        />
        {/* 룰렛 중앙 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '15px',
            height: '15px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        />
      </div>
      {/* 룰렛 화살표 */}
      <div
        style={{
          position: 'absolute',
          top: '-29px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '9px solid transparent',
          borderRight: '9px solid transparent',
          borderTop: '30px solid #FF0060',
          zIndex: 3,
        }}
      />
    </div>
  );
}
