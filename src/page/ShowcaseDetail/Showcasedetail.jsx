import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Showcasedetail.css';
import { FiLink } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { showcase_data } from '../../data/showcase_data';

export default function Showcasedetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectname, index } = location.state || {};
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setting
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="showcasedetail-container">
      {/* 헤더 */}
      <div className="showcasedetail-header">
        {windowWidth <= 900 && <FaArrowLeftLong onClick={() => navigate(-1)} />}
        <h1>{projectname}</h1>
      </div>
      <hr className="showcasedetail-header-border" />
      {windowWidth > 900 && (
        <div className="showcasedetail-back">
          <FaArrowLeftLong onClick={() => navigate(-1)} />
        </div>
      )}

      {/* 메인 */}
      <div className="showcasedetail-main">
        <div className="showcasedetail-main-upper">
          <GoalCard index={index} />
          <DcCard index={index} />
        </div>

        <div className="showcasedetail-main-lower">
          <h4>History</h4>
          <div className="showcasedetail-main-lower-row__1">
            {windowWidth > 900 && <HistoryCard_1 index={index} />}
            {windowWidth <= 900 && <HistoryCard_1_mobile index={index} />}
            <HistoryCard_2 index={index} />
          </div>

          {index === 0 && (
            <div className="showcasedetail-main-lower-row__2">
              <div className="showcasedetail-main-lower-row__2-left">
                <HistoryCard_3 index={index} />
                <HistoryCard_4 index={index} />
              </div>
              <HistoryCard_5 index={index} />
            </div>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <div className="showcasedetail-footer">
        <h4>{projectname}</h4>
      </div>
    </div>
  );
}

export function GoalCard({ index }) {
  return (
    <div className="goal-container">
      <h4>Goal</h4>
      <p>{showcase_data[index].goal}</p>
    </div>
  );
}

export function DcCard({ index }) {
  return (
    <div className="dc-container">
      <div className="dc-img-container">
        <img
          src={process.env.PUBLIC_URL + showcase_data[index].main_img[0]}
          alt="description card 사진"
        />
      </div>
      <div className="dc-description-container">
        <h4>This project...</h4>
        <p>{showcase_data[index].this_project}</p>
        <p style={{ marginBottom: '3%' }}>
          <span>for</span> {showcase_data[index].this_project_for}
        </p>
        {(showcase_data[index].web_url !== '') | (showcase_data[index].github_url !== '') && (
          <div className="dc-description-button">
            <div
              className="dc-button-container"
              style={{ display: showcase_data[index].web_url === '' ? 'none' : 'flex' }}
            >
              <div className="dc-button">
                <FiLink onClick={() => window.open(showcase_data[index].web_url)} />
              </div>
              <p>Web</p>
            </div>
            <div
              className="dc-button-container"
              style={{ display: showcase_data[index].github_url[0] === '' ? 'none' : 'flex' }}
            >
              <div className="dc-button">
                <FaGithub onClick={() => window.open(showcase_data[index].github_url[0])} />
              </div>
              <p>Frontend</p>
            </div>
            <div
              className="dc-button-container"
              style={{ display: showcase_data[index].github_url[1] === '' ? 'none' : 'flex' }}
            >
              <div className="dc-button">
                <FaGithub onClick={() => window.open(showcase_data[index].github_url[1])} />
              </div>
              <p>Backend</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function HistoryCard_1({ index }) {
  return (
    <div className="history__1-container">
      <div className="history__1-img">
        <img
          src={process.env.PUBLIC_URL + showcase_data[index].history[0].history_img[0]}
          alt="historycard 1-1"
        />
      </div>

      <div className="history__1-card-container">
        <h4>{showcase_data[index].history[0].date}</h4>
        <p>{showcase_data[index].history[0].content[0]}</p>
        <div className="history__1-card-link">
          {showcase_data[index].history[0].tech_stack.map(
            (element, techIndex) =>
              element && (
                <div key={techIndex} className="history__1-button-container">
                  <img
                    src={process.env.PUBLIC_URL + `/ShowcaseDetail-img/${element}.png`}
                    alt="techstack"
                  />
                </div>
              )
          )}
          <p>{showcase_data[index].history[0].content[1]}</p>
        </div>
        <div className="history__1-card-img">
          <img
            src={process.env.PUBLIC_URL + showcase_data[index].history[0].history_img[1]}
            alt="historycard 1-2"
          />
        </div>
      </div>
    </div>
  );
}

export function HistoryCard_1_mobile({ index }) {
  return (
    <div className="history__1-mobile-container">
      <div className="history__1-mobile-middle">
        <div className="history__1-mobile-middle-content">
          <h4>{showcase_data[index].history[0].date}</h4>
          <p>{showcase_data[index].history[0].content[0]}</p>
        </div>
        <img
          src={process.env.PUBLIC_URL + showcase_data[index].history[0].history_img[0]}
          alt="historycard 1-1"
        />
      </div>
      <div className="history__1-mobile-bottom">
        {showcase_data[index].history[0].tech_stack.map(
          (element, techIndex) =>
            element && (
              <div key={techIndex} className="history__1-button-container">
                <img
                  src={process.env.PUBLIC_URL + `/ShowcaseDetail-img/${element}.png`}
                  alt="techstack"
                />
              </div>
            )
        )}
        <p>{showcase_data[index].history[0].content[1]}</p>
      </div>
      <img
        className="history__1-mobile-img"
        src={process.env.PUBLIC_URL + showcase_data[index].history[0].history_img[1]}
        alt="historycard 1-2"
      />
    </div>
  );
}

export function HistoryCard_2({ index }) {
  return (
    <div className="history__2-container">
      <div className="history__2-card-container">
        <h4>{showcase_data[index].history[1].date}</h4>
        <p>{showcase_data[index].history[1].content[0]}</p>
        <div className="history__2-card-link">
          {showcase_data[index].history[1].tech_stack.map(
            (element, techIndex) =>
              element && (
                <div key={techIndex} className="history__1-button-container">
                  <img
                    src={process.env.PUBLIC_URL + `/ShowcaseDetail-img/${element}.png`}
                    alt="techstack"
                  />
                </div>
              )
          )}
          <p>{showcase_data[index].history[1].content[1]}</p>
        </div>
      </div>

      <div className="history__2-img">
        <img
          className="history__2-img-base"
          src={process.env.PUBLIC_URL + showcase_data[index].history[1].history_img}
          alt="historycard 2"
        />
        <img
          className="history__2-img-overlay"
          src={process.env.PUBLIC_URL + '/ShowcaseDetail-img/pin.png'}
          alt="historycard 2 pin"
        />
      </div>
    </div>
  );
}

export function HistoryCard_3({ index }) {
  return (
    <div className="history__3-container">
      <h4>{showcase_data[index].history[2].date} </h4>
      <p>{showcase_data[index].history[2].content[0]}</p>
      <div className="history__3-link">
        <p>{showcase_data[index].history[2].content[1]}</p>
        {showcase_data[index].history[2].tech_stack.map(
          (element, techIndex) =>
            element && (
              <div key={techIndex} className="history__1-button-container">
                <img
                  src={process.env.PUBLIC_URL + `/ShowcaseDetail-img/${element}.png`}
                  alt="techstack"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export function HistoryCard_4({ index }) {
  return (
    <div className="history__4-container">
      <div className="history__4-card-container">
        <h4>{showcase_data[index].history[3].date} </h4>
        <p>{showcase_data[index].history[3].content[0]}</p>
        <p className="history__4-mobile-text">{showcase_data[index].history[3].content[1]}</p>
      </div>

      <div className="history__4-img">
        <img
          className="history__4-img-base"
          src={process.env.PUBLIC_URL + showcase_data[index].history[3].history_img}
          alt="historycard 4"
        />
        <img
          className="history__4-img-overlay"
          src={process.env.PUBLIC_URL + '/ShowcaseDetail-img/pin.png'}
          alt="historycard 4 pin"
        />
      </div>
    </div>
  );
}

export function HistoryCard_5({ index }) {
  return (
    <div className="history__5-container">
      <div className="history__5-img">
        <img
          src={process.env.PUBLIC_URL + showcase_data[index].history[4].history_img}
          alt="historycard 5"
        />
      </div>

      <div className="history__5-card-container">
        <h4>{showcase_data[index].history[4].date} </h4>
        <p>{showcase_data[index].history[4].content[0]}</p>
        <div className="history__5-card-link">
          <p>{showcase_data[index].history[4].content[1]}</p>
          {showcase_data[index].history[4].tech_stack.map(
            (element, techIndex) =>
              element && (
                <div key={techIndex} className="history__1-button-container">
                  <img
                    src={process.env.PUBLIC_URL + `/ShowcaseDetail-img/${element}.png`}
                    alt="techstack"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
