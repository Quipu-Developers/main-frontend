import React, { useRef, useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { sendGeneral, sendDevelopment } from '../../api/joinquipu_api';
import './JoinQuipu.css';
import Logo from '../../component/logo';
import Footer from '../Footer/Footer';

function JoinQuipu() {
  const isRecruiting = false; // 모집 기간 여부

  const location = useLocation();
  const { selectedPage } = location.state || {};

  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasPaidFee, setHasPaidFee] = useState(false);

  const [name, setName] = useState('');
  const [student_id, setStudent_id] = useState('');
  const [major, setMajor] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [department, setDepartment] = useState('');
  const [motivation, setMotivation] = useState('');
  const [project_description, setProject_description] = useState('');
  const [github_profile, setGithub_profile] = useState('');
  const [github_email, setGithub_email] = useState('');
  const [slack_email, setSlack_email] = useState('');
  const [modalImg, setModalImg] = useState('wait');

  const [rows, setRows] = useState(8);

  const [pdf, setPDF] = useState(null);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('계좌번호가 복사되었습니다.');
  };

  const [showPopup, setShowPopup] = useState(false);

  const [modalMessage, setModalMessage] = useState('모집기간이 아닙니다.');
  const [modalSubMessage, setModalSubMessage] = useState('다음 모집을 기다려주세요!😭');

  const [reviewed, setReviewed] = useState(false);
  const [paidFee, setPaidFee] = useState(false);
  const [willing_general_member, setWilling_general_member] = useState(false);

  const canSubmit = isRecruiting && hasReviewed && hasPaidFee;

  const project_descriptionRef = useRef();

  const handlewilling_general_memberChange = (e) => {
    setWilling_general_member(e.target.checked);
  };

  const handleReviewedChange = (e) => {
    setReviewed(e.target.checked);
    setHasReviewed(e.target.checked);
  };

  const handlePaidFeeChange = (e) => {
    setPaidFee(e.target.checked);
    setHasPaidFee(e.target.checked);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleUploadPdf = (e) => {
    const file = e.target.files[0];

    // 파일 크기 제한 (예: 5MB)
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      alert(`파일 크기가 너무 큽니다. ${maxSizeInMB}MB 이하의 파일만 업로드할 수 있습니다.`);
      // 입력 필드를 초기화하여 파일을 지움
      e.target.value = null;
      return;
    }

    setPDF(file);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setRows(6);
      } else if (width > 800) {
        setRows(7);
      } else if (width > 650) {
        setRows(8);
      } else if (width > 550) {
        setRows(9);
      } else if (width > 500) {
        setRows(10);
      } else if (width > 400) {
        setRows(11);
      } else {
        setRows(13);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    let res;
    try {
      // 일반 부원 폼 전송
      if (selectedPage === 'general') {
        const formData = {
          name: name,
          student_id: student_id,
          major: major,
          phone_number: phone_number,
          motivation: motivation,
        };

        res = await sendGeneral(formData);
      }

      // 개발 부원 폼 전송
      else if (selectedPage === 'development') {
        const formData = {
          name: name,
          student_id: student_id,
          major: major,
          phone_number: phone_number,
          department: department,
          motivation: motivation,
          project_description: project_description,
          portfolio_pdf: pdf,
          github_profile: github_profile,
          github_email: github_email,
          slack_email: slack_email,
          willing_general_member: willing_general_member,
        };

        res = await sendDevelopment(formData);
      }

      if (res.status === 201) {
        setModalImg('welcome');
        setModalMessage('Welcome to Quipu!');
        setModalSubMessage('신청되었습니다.');
      } else if (res.status === 400) {
        setModalImg('sad');
        setModalMessage(`${res.data}`);
        setModalSubMessage('다시 확인해 주세요.');
      } else if (res.status === 409) {
        setModalImg('sad');
        setModalMessage('이미 제출하셨습니다.');
        setModalSubMessage('다른 응답을 원하시면 퀴푸에 문의해주세요.');
      } else {
        setModalImg('sad');
        setModalMessage('서버 오류입니다.');
        setModalSubMessage('다시 시도해보신 후 퀴푸에 문의해주세요.');
      }
    } catch (error) {
      setModalImg('sad');
      setModalMessage('오류가 발생했습니다.');
      setModalSubMessage('다시 시도해 주세요.');
    } finally {
      setLoading(false); // 로딩 종료
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (location.pathname === '/join-quipu') {
      setShowPopup(!isRecruiting);
    } else {
      setShowPopup(false);
    }
  }, [isRecruiting, location]);

  return (
    <div className="joinquipu-container">
      {loading && (
        <div className="loading-overlay">
          <img src={`${process.env.PUBLIC_URL}/JoinQuipu-img/loading.gif`} alt="Loading..." />
        </div>
      )}
      <NavLink to="/" smooth={true} duration={100}>
        <div className="joinquipu-logo">
          <Logo />
        </div>
      </NavLink>
      <div className="joinquipu-content">
        {/* 일반 부원 모집 폼 */}
        <h2>Join Quipu</h2>
        {selectedPage === 'general' && (
          <>
            <h3>일반 부원</h3>
            {/* 가입 안내 */}
            <div className="join-notice__icon">
              <div className="join-notice__icon--top1">
                <p
                  style={{
                    color: 'red',
                    marginTop: '1.5px',
                    marginLeft: '10px',
                    fontSize: '8px',
                  }}
                >
                  ●
                </p>
                <p
                  style={{
                    color: '#ffd400',
                    marginLeft: '7px',
                    marginTop: '1.5px',
                    fontSize: '8px',
                  }}
                >
                  ●
                </p>
                <p
                  style={{
                    color: '#09ce20',
                    marginLeft: '7px',
                    marginTop: '1.5px',
                    fontSize: '8px',
                  }}
                >
                  ●
                </p>
              </div>
              <div className="join-notice__icon--top2"></div>
              <div className="join-notice__icon--body">
                <p> 환영합니다!🎉</p>
                <p>
                  지원서는{' '}
                  <span style={{ color: 'white', textDecoration: 'underline' }}>
                    회비 납부 이후
                  </span>{' '}
                  제출바랍니다.
                </p>
                <br />
                <p>
                  • 회비 : <span>10,000원</span>
                </p>
                <p
                  onClick={() => {
                    copyToClipboard('3333311276288');
                  }}
                >
                  • 계좌: 카카오뱅크&nbsp;
                  <span className="account-number">3333311276288</span>
                  &nbsp;(예금주 : 김예영)
                </p>
              </div>
            </div>

            <div className="apply-title">
              <h4>Apply</h4>
            </div>

            <div className="form-container">
              <div className="form-field">
                <p>이름</p>
                <input
                  type="text"
                  placeholder="이퀴푸"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>학번</p>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="2020xxxxxx"
                  value={student_id}
                  onChange={(e) => setStudent_id(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>학과</p>
                <input
                  placeholder="전자전기컴퓨터공학부"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>전화번호</p>
                <input
                  type="tel"
                  maxLength={13}
                  placeholder="01012345678"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>지원동기 또는 바라는 점</p>
                <textarea
                  onChange={(e) => {
                    setMotivation(e.target.value);
                  }}
                  rows={2}
                  placeholder={'하고 싶은 활동이나 바라는 점을 적어주세요!'}
                  value={motivation}
                />
              </div>

              <div className="joinquipu-checkbox">
                <label id="checkbox-label">입력하신 정보가 정확한지 다시 한 번 확인해주세요!</label>
                <input
                  id="checkbox-input"
                  type="checkbox"
                  checked={reviewed}
                  onChange={handleReviewedChange}
                />
              </div>

              <div className="joinquipu-checkbox">
                <label id="checkbox-label">폼 제출 전, 회비를 미리 납부해 주시기 바랍니다!</label>
                <input
                  id="checkbox-input"
                  type="checkbox"
                  checked={paidFee}
                  onChange={handlePaidFeeChange}
                />
              </div>
            </div>
          </>
        )}

        {/* 개발 부원 모집 폼 */}
        {selectedPage === 'development' && (
          <>
            <h3>개발 부원</h3>
            {/* 가입 안내 */}
            <div className="join-notice__icon">
              <div className="join-notice__icon--top1">
                <p
                  style={{
                    color: 'red',
                    marginTop: '1.5px',
                    marginLeft: '10px',
                    fontSize: '8px',
                  }}
                >
                  ●
                </p>
                <p
                  style={{
                    color: '#ffd400',
                    marginLeft: '7px',
                    marginTop: '1.5px',
                    fontSize: '8px',
                  }}
                >
                  ●
                </p>
                <p
                  style={{
                    color: '#09ce20',
                    marginLeft: '7px',
                    marginTop: '1.5px',
                    fontSize: '8px',
                  }}
                >
                  ●
                </p>
              </div>
              <div className="join-notice__icon--top2"></div>
              <div className="join-notice__icon--body">
                <p>환영합니다!🎉</p>
                <p>저희 퀴푸 개발팀에 관심을 가져주셔서 감사합니다.</p>
                {/* <p>대면 킥오프는 9월 13일로 예정되어 있습니다.</p> */}
                <br />
                <h1>
                  {'<'} 작성방법 {'>'}
                </h1>
                <p>
                  <span>프론트엔드와 백엔드</span> 지원자분들은 <span>모두 작성</span>
                  해주시고,
                  <br></br>
                  <span>UX/UI 디자인</span> 지원자분들은&nbsp;
                  <span style={{ color: '#FF5580' }}>&nbsp;*</span> <span>표시된 항목</span>에만
                  답해주세요.
                </p>
                <br />
                <h1>
                  {'<'} 제출안내 {'>'}
                </h1>
                <p>제출해주신 지원서는 신중히 검토한 후, </p>
                <p>
                  합격 여부를 <span>1월 3일에 문자 메세지로</span> 안내해 드릴 예정입니다.
                </p>
                <p>{'('}이는 지원자분들의 역량을 평가하기 위함이 아니라, </p>
                <p>
                  <span>개발에 대한 방향성</span>을 확인하기 위한 것이니
                </p>
                <p>부담 갖지 말고 작성해 주시기 바랍니다.{')'}</p>
              </div>
            </div>

            <div className="apply-title">
              <h4>Apply</h4>
            </div>

            <div className="form-container">
              <div className="form-field">
                <p>
                  이름<span style={{ color: '#FF5580' }}>&nbsp;*</span>
                </p>
                <input
                  type="text"
                  placeholder="이퀴푸"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>
                  학번<span style={{ color: '#FF5580' }}>&nbsp;*</span>
                </p>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="2020xxxxxx"
                  value={student_id}
                  onChange={(e) => setStudent_id(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>
                  학과<span style={{ color: '#FF5580' }}>&nbsp;*</span>
                </p>
                <input
                  placeholder="전자전기컴퓨터공학부"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>
                  전화번호<span style={{ color: '#FF5580' }}>&nbsp;*</span>
                </p>
                <input
                  type="tel"
                  maxLength={13}
                  placeholder="01012345678"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>
                  지원 분야<span style={{ color: '#FF5580' }}>&nbsp;*</span>
                </p>
                <div className="form-radio-box">
                  <span
                    className={`form-radio-item ${department === 'design' ? 'selected' : ''}`}
                    onClick={() => setDepartment('design')}
                  >
                    UX/UI 디자인
                  </span>
                  <span
                    className={`form-radio-item ${department === 'frontend' ? 'selected' : ''}`}
                    onClick={() => setDepartment('frontend')}
                  >
                    프론트엔드
                  </span>
                  <span
                    className={`form-radio-item ${department === 'backend' ? 'selected' : ''}`}
                    onClick={() => setDepartment('backend')}
                  >
                    백엔드
                  </span>
                </div>
              </div>

              <div className="form-field">
                <p>
                  지원동기<span style={{ color: '#FF5580' }}>&nbsp;*</span>
                </p>
                <textarea
                  onChange={(e) => {
                    setMotivation(e.target.value);
                  }}
                  rows={rows - 2}
                  placeholder={'지원하게 된 이유와 퀴푸 개발팀에서 하고 싶은 활동을 적어주세요!'}
                  value={motivation}
                />
              </div>

              <div className="form-field">
                <p>대표적인 개발 경험 소개</p>
                <textarea
                  ref={project_descriptionRef}
                  onChange={(e) => {
                    setProject_description(e.target.value);
                  }}
                  rows={rows}
                  placeholder={
                    '경험해본 프로젝트 중 가장 대표적인 프로젝트에 대한 소개와 기여도 그리고 문제 해결 경험에 대해 구체적으로 설명해주시기 바랍니다.'
                  }
                  value={project_description}
                />
              </div>

              <div className="form-field">
                <p>
                  포트폴리오 PDF<span style={{ color: '#FF5580' }}>&nbsp;*</span>
                </p>
                <input type="file" accept=".pdf" onChange={handleUploadPdf} />
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '400',
                    color: '#1c0093',
                    wordBreak: 'keep-all',
                    display: 'flex',
                    marginTop: '10px',
                  }}
                >
                  *&nbsp;
                  <div>
                    개발 경력, 주요 프로젝트, 기술 역량을 포함한 포트폴리오를 자유형식으로 작성하여
                    PDF로 제출해주세요.
                  </div>
                </div>
                <div
                  style={{
                    color: '#1c0093',
                    fontSize: '0.85rem',
                    marginTop: '5px',
                  }}
                >
                  * 최대 파일 크기는 5MB입니다.
                </div>
              </div>

              <div className="form-field">
                <p>GitHub 프로필 주소</p>
                <input
                  type="text"
                  placeholder="https://github.com/quipu"
                  value={github_profile}
                  onChange={(e) => setGithub_profile(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>GitHub 이메일</p>
                <input
                  type="text"
                  placeholder="quipu@gmail.com"
                  value={github_email}
                  onChange={(e) => setGithub_email(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>Slack 이메일</p>
                <input
                  type="text"
                  placeholder="quipu@gmail.com"
                  value={slack_email}
                  onChange={(e) => setSlack_email(e.target.value)}
                />
              </div>

              <div className="joinquipu-checkbox">
                <label id="checkbox-label">
                  불합격 시 일반 부원으로 가입 희망하신다면 체크해주세요!
                </label>
                <input
                  id="checkbox-input"
                  type="checkbox"
                  checked={willing_general_member}
                  onChange={handlewilling_general_memberChange}
                />
              </div>

              <div className="joinquipu-checkbox">
                <label id="checkbox-label">제출 후 수정이 되지 않습니다!</label>
                <input
                  id="checkbox-input"
                  type="checkbox"
                  checked={reviewed}
                  onChange={handleReviewedChange}
                />
              </div>

              <div className="joinquipu-checkbox">
                <label id="checkbox-label">입력하신 정보가 정확한지 다시 한 번 확인해주세요!</label>
                <input
                  id="checkbox-input"
                  type="checkbox"
                  checked={paidFee}
                  onChange={handlePaidFeeChange}
                />
              </div>
            </div>
          </>
        )}

        {/* 신청 버튼 */}
        <button
          type="button"
          onClick={() => {
            handleSubmit();
          }}
          disabled={!canSubmit}
          className={`apply-button ${canSubmit ? '' : 'button-disabled'}`}
        >
          📥 Apply
        </button>

        {showPopup && (
          <div className="popup">
            <div className="popup__icon--top"></div>
            <div className="popup__icon--body">
              <div className="popup_content">
                <div className="popup_img">
                  <img
                    src={process.env.PUBLIC_URL + `/JoinQuipu-img/${modalImg}.png`}
                    alt="로고"
                  ></img>
                </div>
                <div className="popup_message">
                  <p className="head-message">{modalMessage}</p>
                  <p className="sub-message">{modalSubMessage}</p>
                </div>
              </div>
              <div className="popup__button-container">
                <button onClick={handlePopupClose}>닫기</button>
              </div>
            </div>
          </div>
        )}

        <h5 className="faq-title" style={{ color: '#1c0093' }}>
          FAQ
        </h5>

        {/* FAQ 컴포넌트 */}
        {selectedPage === 'general' && (
          <div className="faq">
            <FAQ
              question="문과인데 가입해도 되나요?"
              answer="물론입니다! Quipu는 컴퓨터를 사랑하고 배우려는 많은 문과, 이과 분들이 계십니다. 걱정말고 들어오세요!"
              emoji="🤓"
            />
            <FAQ
              question="Quipu 남녀 성비는 어떻게 되나요?"
              answer="3:2 정도로 남성 회원이 더 많이 계시지만 여성 회원들의 참여도가 높기 때문에 걱정하지 않으셔도 됩니다!"
              emoji="🤔"
            />
            <FAQ
              question="세미나에는 참여하고 싶은데, 주제 정하기가 어려워요."
              answer="동아리방에 CS 관련 책이 있습니다! 목차에서 하나를 정하여 공부한 내용을 발표해도 괜찮습니다."
              emoji="🧐"
            />
            <FAQ
              question="세미나 난이도는 어떻게 되나요?"
              answer="세미나는 다양한 난이도로 진행되며, 본인의 수준에 맞는 주제를 선택하실 수 있습니다. 중요한 것은 함께 배우고 공유하는 경험이니 부담 갖지 않고 참여하시면 됩니다!"
              emoji="🧐"
            />
            <FAQ
              question="동아리방 위치가 어디인가요?"
              answer="학생회관 3층 342호입니다."
              emoji="🥸"
            />
          </div>
        )}
        {selectedPage === 'development' && (
          <div className="faq">
            <FAQ
              question="문과인데 개발 부원으로 지원해도 되나요?"
              answer="저희 Quipu는 개발에 관심이 있고, 프로젝트 경험이 있는 분이라면 소속 학과와 관계없이 모두 환영합니다!"
              emoji="🤓"
            />

            <FAQ
              question="팀으로 하는 프로젝트 경험이 없는데 지원해도 되나요?"
              answer="팀 프로젝트 경험자를 우대하지만, 충분한 열정과 의지를 보여주신다면 문제없습니다!"
              emoji="🧐"
            />

            <FAQ
              question="개발은 어떤 방식으로 진행되나요?"
              answer="저희는 슬랙으로 소통하며 정기 회의를 잡아 개발 과정을 공유합니다. 상황에 따라 대면, 비대면 모두 가능합니다!"
              emoji="🧐"
            />

            {/* <FAQ
              question="9월 13일 킥오프에서 무슨 활동을 하며 참여가 힘든 경우 어떻게 하나요?"
              answer="한 학기 동안 진행할 프로젝트 소개와 팀 배정을 진행합니다. 함께 활동할 팀원을 처음 만나는 중요한 날이니, 가능하면 꼭 참석 부탁드립니다! 불참 시 원하는 활동을 선택하지 못할 수 있으니 양해 부탁드립니다."
              emoji="😝"
            /> */}

            {/* <FAQ
              question="다른 기술 스택을 주로 사용해왔거나 사용하고 싶다면 어떻게 하나요?"
              answer="저희는 React.js와 Node.js를 사용할 줄 아는 분들을 우선적으로 모집하고 있습니다. 이와 함께, 다른 기술 스택에 대한 수요가 많다면 추가 프로젝트를 논의할 예정입니다."
              emoji="😏"
            /> */}

            <FAQ
              question="포트폴리오 PDF는 어떤 형식이어야 하나요?"
              answer="자기소개, 기술 스택, 참여 프로젝트 소개가 포함된 자유 형식의 PDF 문서여야 합니다. PPT로 제작하거나, 기존 포트폴리오의 링크를 포함한 문서를 PDF로 변환해 제출해주세요."
              emoji="🥸"
            />

            <FAQ
              question="개발부원 회비는 얼마인가요?"
              answer="방학 기간 동안 10,000원으로 예정되어 있고 모집 후 다시 공지드릴 예정입니다!"
              emoji="🤠"
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default memo(JoinQuipu);

const FAQ = ({ question, answer, emoji }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`question ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="question-content">
        <div className="question-title">{question}</div>
        <div className="emoji">{emoji}</div>
      </div>
      {isExpanded && <div className="expanded-content">{answer}</div>}
    </div>
  );
};
