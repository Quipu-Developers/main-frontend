import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RecruitBoard, RouletteItem } from '../../component/event';
import { canParticipation, getResult } from '../../api/event_api';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Logo from '../../component/logo';
import './Event.css';

export function Event() {
  return (
    <div className="event-container">
      <div className="event-nav">
        <NavLink to="/" smooth={true} duration={100}>
          <Logo />
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export function Start() {
  const navigate = useNavigate();

  const handleEnter = async () => {
    const response = await canParticipation();
    if (response.status === 200) {
      console.log(response.data);
      const remain_goods = response.data;
      navigate('/event/quiz', { state: remain_goods });
    } else if (response.status === 403) {
      alert('상품이 모두 소진되었습니다. 죄송합니다ㅠㅠ');
    } else {
      alert('서버 에러입니다. 다시 시도 후 퀴푸에 문의해주세요.');
    }
  };

  const splitSegment = (segment, maxCountPerSegment) => {
    const newSegments = [];
    let remainingCount = segment.count;

    while (remainingCount > 0) {
      const splitCount = Math.min(remainingCount, maxCountPerSegment);
      newSegments.push({ count: splitCount, label: segment.label });
      remainingCount -= splitCount;
    }

    return newSegments;
  };

  let splitSegments = [];
  const maxCountPerSegment = 6;

  const originalSegments = [
    { count: 2, label: 'chicken' },
    { count: 4, label: 'coupon' },
    { count: 6, label: 'hamburger' },
    { count: 60, label: 'drink' },
    { count: 72, label: 'boom' },
  ];

  originalSegments.forEach((segment) => {
    if (segment.count > maxCountPerSegment) {
      const smallerSegments = splitSegment(segment, maxCountPerSegment);
      splitSegments = splitSegments.concat(smallerSegments);
    } else {
      splitSegments.push(segment);
    }
  });

  splitSegments = splitSegments.sort(() => Math.random() - 0.5);

  return (
    <>
      <h2>랜덤 룰렛 이벤트</h2>
      <h3>새 학기를 맞이하여 특별한 이벤트를 준비했습니다!</h3>
      <div className="event-big-block">
        <div
          className="event-big-block-top"
          style={{
            position: 'absolute',
            top: '0px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p>
            <span>새 학기를 맞이하여 특별한 이벤트를 준비했습니다!&nbsp;</span>
            퀴즈를 맞추고 룰렛을 돌리세요!
          </p>
        </div>
        <RouletteItem segments={splitSegments} />
      </div>
      <div className="event-small-block-container">
        <div className="event-small-block">서울시립대 학부생 모두 참여가능합니다!</div>
        <div className="event-small-block">상품이 소진될 때까지 계속 됩니다!</div>
        <div className="event-small-block">상품 수령은 카카오톡을 통해 해드릴게요!</div>
      </div>
      <button onClick={() => handleEnter()} className="event-custom-button">
        <p>START EVENT</p>
      </button>
    </>
  );
}

export function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const remain_goods = location.state || {};
  const [isAnswer, setIsAnswer] = useState(false);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const isFormValid = () => {
    const studentIdValid = /^\d{10}$/.test(studentId);
    const nameValid = /^[가-힣]{2,4}$/.test(name);
    return studentIdValid && nameValid;
  };

  const handleAnswer = (tf) => {
    setIsAnswer(tf);
    console.log('상품: ', tf);
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      setIsWaiting(true);

      setTimeout(() => {
        if (isAnswer) {
          navigate('/event/roulette', {
            state: { remain_goods: remain_goods, apply_form: { name, studentId } },
          });
        } else {
          navigate('/event/result', { state: { result: 'incorrect', goods: null } });
        }
      }, 10000);
    } else {
      alert('학번과 이름을 다시 확인해주세요.');
    }
  };

  if (isWaiting) {
    return (
      <div className="event-big-block">
        <h4>결과를 기다리고 있어요 . . .</h4>
        <img />
      </div>
    );
  }

  return (
    <>
      <div className="event-big-block">
        <div
          className="event-big-block-top"
          style={{
            position: 'absolute',
            top: '0px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p>
            정답은 이 웹사이트 속에 있어요!
            <button>
              <img />
              퀴푸 웹 사이트 둘러보기
            </button>
          </p>
        </div>
        <h5 className="quiz-title">
          QUIZ.&nbsp;<div>퀴푸의 웹 개발팀 이름은 무엇일까요?</div>
          <img />
        </h5>
        <div className="quiz-block" onClick={() => handleAnswer(false)}>
          <div>1</div> QUIPU-CODE
        </div>
        <div className="quiz-block" onClick={() => handleAnswer(false)}>
          <div>2</div> QUIPU-TECH
        </div>
        <div className="quiz-block" onClick={() => handleAnswer(true)}>
          <div>3</div> QUIPU-DEV
        </div>
        <div className="quiz-block" onClick={() => handleAnswer(false)}>
          <div>4</div> QUIPU-DEVELOPERS
        </div>
      </div>
      <div className="event-input-block">
        <label>학번: </label>
        <input onChange={(e) => setStudentId(e.target.value)} placeholder="2020xxxxxx"></input>
      </div>
      <div className="event-input-block">
        <label>이름: </label>
        <input onChange={(e) => setName(e.target.value)} placeholder="이퀴푸"></input>
      </div>
      <p className="event-input-text">
        *중복 참여를 방지하기 위함입니다.<br></br>이벤트 종료 후 모두 삭제할 예정입니다.
      </p>
      <button onClick={handleSubmit} className="event-custom-button">
        <p>정답은?</p>
      </button>
    </>
  );
}

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, goods } = location.state || {};
  console.log(result, goods);

  let content;

  //오답일 경우
  if (result === 'incorrect') {
    content = (
      <>
        <h3>새 학기를 맞이하여 특별한 이벤트를 준비했습니다!</h3>
        <div className="event-big-block-top">
          <p>
            <span>정답은 3번!&nbsp;</span> 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!
          </p>
        </div>
        <div className="event-result-text">
          <img />
          <p>
            아쉽게도 정답이 아닙니다! <img />
          </p>
        </div>
      </>
    );
  }
  //정답이고 상품을 받을 경우
  else if (result === 'correct_win') {
    content = (
      <>
        <div className="event-big-block-top">
          <p>정답은 3번! 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!</p>
        </div>
        <div className="event-result-text">
          <img />
          <p>
            축하합니다! <img />
          </p>
          <p>카카오톡 아이디를 남겨주시면 이벤트 종료 후 수령해드리겠습니다.</p>
          <div className="event-input-block">
            <label>카카오톡 ID: </label>
            <input></input>
          </div>
          <button>제출하기</button>
        </div>
      </>
    );
  }
  //정답이고 꽝일 경우
  else if (result === 'correct_lose') {
    content = (
      <>
        <div className="event-big-block-top">
          <p>정답은 3번! 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!</p>
        </div>
        <div className="event-result-text">
          <img />
          <p>
            아쉽게도 꽝입니다!
            <img />
          </p>
        </div>
      </>
    );
  } else {
    content = <div className="event-big-block-top">결과를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {content}
      <RecruitBoard />
      <button onClick={() => navigate('/')} className="event-custom-button">
        <p>home으로 가기</p>
      </button>
    </>
  );
}

export function Roulette() {
  const navigate = useNavigate();
  const location = useLocation();
  const { remain_goods, apply_form } = location.state || {};
  console.log(remain_goods, apply_form);

  const handleGetGoods = async (apply_form) => {
    const { status, data } = await getResult(apply_form);
    if (status === 201) {
      if (data.winning) {
        navigate('/event/result', { state: { result: 'correct_win', goods: data.goods } });
      } else {
        navigate('/event/result', { state: { result: 'correct_lose', goods: null } });
      }
    } else if (status === 409) {
      alert('이미 참여하셨습니다. 룰렛은 한 번만 돌릴 수 있습니다.');
    } else {
      alert('서버에 문제가 생겼습니다. 다시 시도 후 퀴푸에 문의해주세요.');
    }
  };

  return (
    <>
      <div className="event-big-block-top">
        <p>정답은 3번! 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!</p>
      </div>
      <p>정답입니다!</p>
      <div>
        <div></div>
        <p>치킨</p>
        <p>2</p>
      </div>
      <img />
      <button onClick={() => handleGetGoods(apply_form)} className="event-custom-button">
        <p>룰렛 돌리기</p>
      </button>
    </>
  );
}
