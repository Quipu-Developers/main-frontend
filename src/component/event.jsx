import { useRef, useEffect } from 'react';
import '../page/Event/Event.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { IoIosMail } from 'react-icons/io';

export function RecruitBoard() {
  return (
    <div className="event-big-block recruit">
      <div className="event-recruit-description">
        <p>
          퀴푸에서 새로운 회원을 모집하고 있습니다.<br></br>퀴푸 인스타
          <span>&nbsp;&#34;@uos_quipu&#34;</span>에서 모집 공고를 확인할 수 있습니다.<br></br>
          많은 관심 부탁드립니다!
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
            <p>UX/UI디자인&nbsp;프론트엔드&nbsp;백엔드</p>
          </div>
          <div style={{ backgroundColor: 'rgb(54, 194, 206, 0.3)' }}>
            <p>컴퓨터를 사랑하는 모든 재학생</p>
          </div>
        </div>
      </div>
      <div className="event-recruit-info">
        <div>
          <span>
            <BiLogoInstagramAlt />
          </span>
          <p>@uos_quipu</p>
        </div>
        <div>
          <span>
            <IoIosMail />
          </span>
          <p>quipu0316@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export function RouletteItem({ segments, spin, targetLabel }) {
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

  const rouletteRef = useRef(null);

  useEffect(() => {
    const calculateTargetSegmentRotation = (targetLabel, totalRotations) => {
      let sumCount = 0;
      let targetCount;

      for (let i = 0; i < segments.length; i++) {
        if (segments[i].label !== targetLabel) {
          sumCount += segments[i].count;
        } else {
          targetCount = segments[i].count;
          break;
        }
      }

      const halfTargetCount = targetCount / 2;

      const finalRotationDegrees =
        (360 * sumCount) / totalItems + (360 * halfTargetCount) / totalItems;

      const totalRotation = totalRotations * 360 + finalRotationDegrees;

      return totalRotation;
    };

    if (spin && targetLabel) {
      const totalRotation = calculateTargetSegmentRotation(targetLabel, 10);

      if (totalRotation !== null) {
        rouletteRef.current.style.transition = 'transform 12s cubic-bezier(0.33, 1, 0.68, 1)';
        rouletteRef.current.style.transform = `rotate(-${totalRotation}deg)`;
      }
    }
  }, [spin, targetLabel, totalItems, segments]);

  return (
    <div className="roulette-item">
      {/* Roulette Border */}
      <div className="roulette-border">
        <div className="roulette-border-inner">
          {/* Roulette Inner */}
          <div
            ref={rouletteRef}
            className="roulette-inner"
            style={{
              background: `conic-gradient(${conicGradient})`,
            }}
          />
          {/* Roulette Center */}
          <div className="roulette-center" />
        </div>
      </div>
      {/* Roulette Tip */}
      <FaMapMarkerAlt className="roulette-tip" />
    </div>
  );
}

export const splitSegment = (segment, maxCountPerSegment) => {
  const newSegments = [];
  let remainingCount = segment.count;

  while (remainingCount > 0) {
    const splitCount = Math.min(remainingCount, maxCountPerSegment);
    newSegments.push({ count: splitCount, label: segment.label });
    remainingCount -= splitCount;
  }

  return newSegments;
};
