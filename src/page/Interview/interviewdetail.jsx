import React from 'react';
import './interviewdetail.css';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegSmileWink } from 'react-icons/fa';

function InterviewDetail({ index, profile, closeModal }) {
  return (
    <div className="interview-modal">
      <div className="interview-modal-content">
        {profile && (
          <>
            <div className="interview-modal-header">
              <div className="interview-modal-header-introduce">
                <img
                  src={process.env.PUBLIC_URL + `/Interview-img/first/${profile.img}`}
                  alt={profile.name}
                />
                <div className="header-name-text">
                  <h2>
                    {index + 1}기 {profile.name}님
                    <FaRegSmileWink />
                  </h2>
                  <p>{profile.title}</p>
                </div>
              </div>
              <IoCloseOutline className="interview-modal-close" onClick={closeModal} />
            </div>
            <div className="interview-modal-body">
              <h1>자기소개</h1>
              <p>{profile.introduction}</p>
              <h1>활동후기</h1>
              <p>
                {profile.review.map((element, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />}
                    {index > 0 && <br />}
                    {element}
                  </React.Fragment>
                ))}
              </p>
              <h1>프로젝트 이력</h1>
              <p>
                {profile.project.map((element, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <br />}
                    {element}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InterviewDetail;
