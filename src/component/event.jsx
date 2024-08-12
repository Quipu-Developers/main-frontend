import { useState } from 'react';
import '../page/Event/Event.css';

export function RecruitBoard() {
  return (
    <div className="event-big-block recruit">
      <div className="event-recruit-description">
        <p>
          퀴푸에서 새로운 회원을 모집하고 있습니다.<br></br>
          <span>join quipu</span>에서 모집 공고를 확인할 수 있습니다.<br></br>많은 관심
          부탁드립니다!
        </p>
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
            <p>UI/UX 디자인&nbsp;</p>
            <img />
            <p>프론트엔드&nbsp;</p>
            <img />
            <p>백엔드&nbsp;</p>
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
      <div className="roulette-border">
        {/* 룰렛 내부 */}
        <div
          className="roulette-inner"
          style={{
            background: `conic-gradient(${conicGradient})`,
          }}
        />
        {/* 룰렛 중앙 */}
        <div className="roulette-center" />
      </div>
      {/* 룰렛 화살표 */}
      <div className="roulette-tip" />
    </div>
  );
}
