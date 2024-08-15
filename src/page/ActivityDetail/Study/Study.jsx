import React, { useState } from 'react';
import './Study.css';
import study_data from '../../../data/study_data';

function Study({ selectedYear }) {
  const studiesArray = Object.values(study_data);
  const studies = studiesArray;

  const filteredStudies = studies.filter((study) => study.year === selectedYear);

  return (
    <>
      <div className="Study-container">
        {filteredStudies.map((study) => (
          <StudyCard {...study} key={study.title} />
        ))}
        {/*카드들을 왼쪽부터 정렬한 듯 보이도록 빈 카드 추가*/}
        <div className="blank-studycard"></div>
        <div className="blank-studycard"></div>
        <div className="blank-studycard"></div>
      </div>
    </>
  );
}

function StudyCard({
  title,
  period,
  shortDescription,
  goal,
  details,
  links,
  leaders,
  members,
  allMembers,
  mainimage,
  allImgs,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="studycard">
      <div className="studycard__top">
        <img className="studycard__img" src={process.env.PUBLIC_URL + mainimage} alt="스터디" />
        <div className="studycard__content">
          <h3>{title}</h3>
          <p>{shortDescription}</p>
        </div>
      </div>
      <div className="studycard__member--container">
        {leaders.map(function (name, index) {
          return <Member key={index} name={name} backgroundColor="#1C0093" color="white"></Member>;
        })}
        {members.map(function (name, index) {
          return <Member key={index} name={name} backgroundColor="#D5D5D5" color="black"></Member>;
        })}
      </div>
      <button className="moreinfo-button" onClick={() => setModalOpen(true)}>
        📚 MORE INFORMATION
      </button>

      <StudyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        period={period}
        goal={goal}
        details={details}
        links={links}
        leaders={leaders}
        allMembers={allMembers}
        mainimage={mainimage}
        allImgs={allImgs}
      >
        <button onClick={() => setModalOpen(false)}>Close</button>
      </StudyModal>
    </div>
  );
}

function Member({ name, backgroundColor, color }) {
  return (
    <div className="studycard__member" style={{ backgroundColor, color }}>
      <p>{name}</p>
    </div>
  );
}

function StudyModal({
  isOpen,
  onClose,
  title,
  period,
  goal,
  details,
  links,
  leaders,
  allMembers,
  mainimage,
  allImgs,
}) {
  if (!isOpen) return null;

  return (
    <div className="study__modal--container" onClick={onClose}>
      <div className="study__modal">
        <div className="study__modal--bar">
          <p style={{ color: 'red' }}>●</p>
          <p style={{ color: '#ffd400' }}>●</p>
          <p style={{ color: '#09ce20' }}>●</p>
        </div>
        <div className="study__modal--content">
          <div className="study__modal--content-top">
            <div className="studycard__top" style={{ height: '70%', justifyContent: 'start' }}>
              <img
                className="studycard__img"
                src={process.env.PUBLIC_URL + mainimage}
                style={{ width: 'auto', marginRight: '20px' }}
                alt="스터디"
              />
              <div className="studycard__content" style={{ width: 'auto' }}>
                <h3>{title}</h3>
                <p>기간: {period}</p>
              </div>
            </div>
            <div className="studycard__member--container" style={{ height: '30%' }}>
              {leaders.map(function (name, index) {
                return (
                  <Member key={index} name={name} backgroundColor="#1C0093" color="white"></Member>
                );
              })}
              {allMembers.map(function (name, index) {
                return (
                  <Member key={index} name={name} backgroundColor="#D5D5D5" color="black"></Member>
                );
              })}
            </div>
          </div>
          <div className="study__modal--content-bottom">
            <p className="h10">MORE INFORMATION</p>
            <div className="h90">
              <div className="study__modal--img-container">
                {allImgs.map(function (src, index) {
                  return (
                    <img
                      key={index}
                      src={process.env.PUBLIC_URL + src}
                      className="study__modal--img"
                      alt="스터디"
                    />
                  );
                })}
              </div>
              <div className="study__modal--content-container">
                <li>Goal</li>
                <p>▪️ {goal}</p>
                <li>Details</li>
                {details.map(function (detail, index) {
                  return <p key={index}>▪️ {detail}</p>;
                })}
                {Object.entries(links || {}).map(([key, value]) => (
                  <p key={key}>
                    ▪️{' '}
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: '#8294C4' }}
                    >
                      {key}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Study;
