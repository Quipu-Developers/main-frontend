import React, { useRef, useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { sendGeneral, sendDevelopment } from '../../api/joinquipu_api';
import './JoinQuipu.css';
import Logo from '../../component/logo';
import Footer from '../Footer/Footer';

function JoinQuipu() {
  const isRecruiting = true; //모집 기간 여부

  const location = useLocation();
  const { selectedPage } = location.state || {};

  const [hasReviewed, setHasReviewed] = useState(false);
  const [hasPaidFee, setHasPaidFee] = useState(false);

  const [name, setName] = useState('');
  const [student_id, setStudent_id] = useState();
  const [major, setMajor] = useState('');
  const [phone_number, setPhone_number] = useState();
  const [department, setDepartment] = useState('');
  const [motivation, setMotivation] = useState('');
  const [project_description, setProject_description] = useState('');
  const [github_profile, setGithub_profile] = useState('');
  const [github_email, setGithub_email] = useState('');
  const [slack_email, setSlack_email] = useState('');

  const [rows, setRows] = useState(8);

  const [pdf, setPDF] = useState(null);

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
    console.log(e.target.files[0]);
    setPDF(e.target.files[0]);
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
    let res;
    // 일반 부원 폼 전송
    if (selectedPage === 'general') {
      const formData = {
        name: name,
        student_id: student_id,
        major: major,
        phone_number: phone_number,
        motivation: motivation,
      };

      console.log(formData);

      res = await sendGeneral(formData);
    }

    //개발 부원 폼 전송
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
      console.log(formData);

      res = await sendDevelopment(formData);
    }

    if (res.status === 201) {
      setModalMessage('Welcome to Quipu!');
      setModalSubMessage('퀴푸의 회원이 되어주셔서 감사합니다.');
    } else if (res.status === 400) {
      setModalMessage(`${res.data}`);
      setModalSubMessage('다시 확인해 주세요.');
    } else if (res.status === 409) {
      setModalMessage('이미 제출하셨습니다.');
      setModalSubMessage('다른 응답을 원하시면 퀴푸에 문의해주세요.');
    } else {
      setModalMessage('서버 오류입니다.');
      setModalSubMessage('다시 시도해보신 후 퀴푸에 문의해주세요.');
    }
    setShowPopup(true);
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
                <p>지원서는 <span style={{color: 'white', textDecoration:'underline' }}>회비 납부 이후</span> 제출바랍니다.</p>
                <br />
                <p>
                  • 회비 : <span>20,000원</span>
                </p>
                <p
                  onClick={() => {
                    copyToClipboard('1234567');
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
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-field">
                <p>학번</p>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="2024xxxxxx"
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
                <br />
                <h1>{'<'} 작성방법 {'>'}</h1>
                <p>
                  <span>프론트엔드와 백엔드</span> 지원자분들은 <span>모두 작성</span>
                  해주시고,
                  <br></br>
                  <span>UX/UI 디자인</span> 지원자분들은&nbsp;
                  <span style={{ color: '#FF5580' }}>&nbsp;*</span> <span>표시된 항목</span>에만
                  답해주세요.
                </p>
                <br />
                <h1>{'<'} 제출안내 {'>'}</h1>
                <p>제출해주신 지원서는 신중히 검토한 후, </p>
                <p>
                  합격 여부를 <span>9월 7일에 문자 메세지로</span> 안내해 드릴 예정입니다.
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
                  placeholder="홍길동"
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
                  placeholder="2024xxxxxx"
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
                <input
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  placeholder={'UX/UI 디자인, 프론트엔드, 백엔드 중 하나 골라주세요.'}
                  value={department}
                />
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
            <div className="popup__icon">
              <div className="popup__icon--top"></div>
              <div className="popup__icon--body">
                <div className="popup_content">
                  <div className="popup_img">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        '/ActivityDetail-img/2023/Study/퀴푸메인웹개발1.png'
                      }
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
              answer="저희 Quipu는 이과에 국한된 동아리가 아닙니다. 현재 다양한 단과대의 부원들이 있으며 문과분들도 다수 계십니다 :) 이과 분들의 비율이 높지만, 컴퓨터에 관심이 있으신분들 혹은 이과 학우들과 친분을 쌓고 싶으신 분들 모두 환영입니다."
              emoji="🤓"
            />
            <FAQ
              question="Quipu 남녀 성비는 어떻게 되나요?"
              answer="23년 2학기 기준 남녀 성비는 남자 3 : 여자 2 였습니다! 특히나 여성 회원분들의 참여도가 높았기 때문에 성비 걱정은 크게 안 하셔도 됩니다!!"
              emoji="🤔"
            />

            <FAQ
              question="코딩 지식이 없는데 가입해도 되나요?"
              answer="전혀 상관 없습니다!! 현재 퀴푸에는 코딩 능력자분들도 계시지만 배우고자 들어오신 분들, 관심있어서 들어오신 분들이 더 많습니다! 또한 학술동아리로써 코딩이 아닌 다른 과목의 스터디도 개설 및 참여가 가능합니다 :)"
              emoji="🧐"
            />

            <FAQ
              question="동아리방 위치가 어디인가요?"
              answer="학생회관 3층 342호 입니다!"
              emoji="🥸"
            />
          </div>
        )}
        {selectedPage === 'development' && (
          <div className="faq">
            <FAQ
              question="문과인데 개발 부원으로 가입해도 되나요?"
              answer="저희 Quipu는 개발과 프로젝트에 관심이 있고, 과거 프로젝트를 진행했던 경험이 있는 분이시라면 소속과와 관계없이 모두 환영하고 있습니다!!"
              emoji="🤓"
            />

            <FAQ
              question="Quipu 남녀 성비는 어떻게 되나요?"
              answer="24년 1학기 기준 남녀 성비는 남자 0 : 여자 0 였습니다! 특히나 여성 회원분들의 참여도가 높았기 때문에 성비 걱정은 크게 안 하셔도 됩니다!!"
              emoji="🤔"
            />

            <FAQ
              question="팀 프로젝트 경험이 없는데 가입해도 되나요?"
              answer="전혀 상관없습니다!! 현재 퀴푸에는 팀 프로젝트를 여러 번 경험해 보신 능력자분들도 계시지만 배우고자 들어오신 분들, 관심 있어서 들어오신 분들이 더 많습니다! 함께 프로젝트에 참여하며 보다 체계적으로 포트폴리오도 작성해나갈 수 있을 것입니다 :)"
              emoji="🧐"
            />

            <FAQ
              question="개발 및 프로젝트 진행 시 세부적인 팀 구성은 어떻게 되나요?"
              answer="24년 1학기 기준 팀 구성은 프론트엔드, 백엔드, 기획, 디자인 팀으로 나누었습니다!!"
              emoji="😝"
            />

            <FAQ
              question="어떤 프로젝트를 진행하게 되며, 기술 스택은 어떻게 되나요?"
              answer="메뉴 바에 있는 quipu Dev를 참고하시면 됩니다!!"
              emoji="😏"
            />

            <FAQ
              question="동아리방 위치가 어디인가요?"
              answer="학생회관 3층 342호 입니다!"
              emoji="🥸"
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
