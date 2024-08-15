import { NavHashLink as NavLink } from 'react-router-hash-link';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Interview.css';
import { interview_data } from '../../data/interview_data.jsx';
import InterviewDetail from './interviewdetail.jsx';
import { FaArrowLeftLong } from 'react-icons/fa6';

function Interview() {
  const navigate = useNavigate();
  const [IsdetailOpen, setIsdetailOpen] = useState(false);
  // const [index, setIndex] = useState(0);
  const index = 0;
  const [selectedProfile, setSelectedProfile] = useState(null); // 선택된 프로필 상태 추가

  const openDetailModal = (profile) => {
    setSelectedProfile(profile); // 클릭된 프로필 정보를 설정
    setIsdetailOpen(true);
  };

  const closeDetailModal = () => {
    setIsdetailOpen(false);
    setSelectedProfile(null); // 모달 닫을 때 선택된 프로필 초기화
  };

  return (
    <div className="interview-container">
      <div className="interview-navbar">
        <div className="interview-logo">
          <NavLink to="/#home" smooth>
            QUIPU
          </NavLink>
        </div>
        <p>Interview</p>
        <FaArrowLeftLong className="back-button" onClick={() => navigate('/')} />
      </div>
      <div className="interview-index-container">
        <div className="interview-index">
          {/* <div className="interview-left">{index !== 0 && <p>{index}기</p>}</div>
          <div className="interview-arrow">
            {index !== 0 && (
              <p
                onClick={(e) => {
                  if (index > 0) {
                    setIndex(index - 1);
                  }
                  e.stopPropagation();
                }}
              >
                &lt;
              </p>
            )}
          </div> */}
          <div className="interview-middle">
            <h4>{index + 1}기</h4>
          </div>
          {/* <div className="interview-arrow">
            {index !== 2 && (
              <p
                onClick={(e) => {
                  if (index < 3) {
                    setIndex(index + 1);
                  }
                  e.stopPropagation();
                }}
              >
                &gt;
              </p>
            )}
          </div>
          <div className="interview-right">{index !== 2 && <p>{index + 2}기</p>}</div> */}
        </div>
      </div>
      <div className="interview-profile">
        {index === 0 &&
          interview_data[0].map(function (element) {
            return (
              <div
                className="interview-profilebox"
                key={element.name}
                onClick={() => openDetailModal(element)}
              >
                <div className="interview-profile-top">
                  <div />
                  <div />
                  <div />
                </div>
                <div className="interview-profile-content">
                  <div className="interview-profile-img">
                    <img
                      src={process.env.PUBLIC_URL + `/Interview-img/first/${element.img}`}
                      alt={element.name}
                    />
                  </div>
                  <div className="interview-profile-dc">
                    <h4>{element.name}</h4>
                    <p>{element.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="interview-profilebox" style={{ visibility: 'hidden' }}></div>
        <div className="interview-profilebox" style={{ visibility: 'hidden' }}></div>
      </div>
      {IsdetailOpen && (
        <div className="modal-overlay">
          <InterviewDetail index={index} profile={selectedProfile} closeModal={closeDetailModal} />
        </div>
      )}

      <div className="interview-footer">
        <p>QUIPU-DEV</p>
      </div>
    </div>
  );
}

export default Interview;
