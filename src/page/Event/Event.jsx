import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RecruitBoard, RouletteItem, splitSegment } from '../../component/event';
import { canParticipation, getResult, sendKakaoId } from '../../api/event_api';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import Error from '../Error/Error';
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
    try {
      const response = await canParticipation();

      if (response.status === 200) {
        const remain_goods = response.data;
        navigate('/event/quiz', { state: remain_goods });
      } else if (response.status === 403) {
        alert('상품이 모두 소진되었습니다. 죄송합니다ㅠㅠ');
      } else {
        alert('서버 에러입니다. 다시 시도 후 퀴푸에 문의해주세요.');
      }
    } catch (error) {
      alert('서버에 문제가 발생했습니다. 다시 시도해 주세요.');
    }
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
            퀴즈를 맞히고 룰렛을 돌리세요!
          </p>
        </div>
        <RouletteItem segments={splitSegments} />
        <div className="roulette-gift-container">
          <div className="roulette-gift">
            <div>
              <p>60</p>
            </div>
            <img src={process.env.PUBLIC_URL + '/Event-img/drink.png'} alt="drink" />
          </div>
          <div className="roulette-gift">
            <div>
              <p>02</p>
            </div>
            <img src={process.env.PUBLIC_URL + '/Event-img/chicken.png'} alt="chicken" />
          </div>
          <div className="roulette-gift">
            <div style={{ right: '0px' }}>
              <p>04</p>
            </div>
            <img src={process.env.PUBLIC_URL + '/Event-img/coupon.png'} alt="coupon" />
          </div>
          <div className="roulette-gift">
            <div style={{ right: '0px' }}>
              <p>06</p>
            </div>
            <img src={process.env.PUBLIC_URL + '/Event-img/hamburger.png'} alt="hamburger" />
          </div>
        </div>
      </div>
      <div className="event-small-block-container">
        <div className="event-small-block">서울시립대 학부생 모두 참여가능합니다!</div>
        <div className="event-bridge-block">
          <div></div>
          <div></div>
        </div>
        <div className="event-small-block">상품이 소진될 때까지 계속 됩니다!</div>
        <div className="event-bridge-block">
          <div></div>
          <div></div>
        </div>
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
  const remain_goods = location.state || null;
  const [isAnswer, setIsAnswer] = useState(0);
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  if (!remain_goods || Object.keys(remain_goods).length === 0) {
    return <Error />;
  }

  const isFormValid = () => {
    const studentIdValid = /^\d{10}$/.test(studentId);
    const nameValid = /^[가-힣]{2,4}$/.test(name);
    return studentIdValid && nameValid;
  };

  const handleAnswer = (num) => {
    setIsAnswer(num);
  };

  const handleSubmit = async () => {
    if (isAnswer === 0) {
      alert('답을 선택해주세요.');
    } else {
      if (isFormValid()) {
        setIsWaiting(true);

        try {
          const response = await canParticipation();

          if (response.status !== 200) {
            alert('다시 시도해 주세요. 권한이 없습니다.');
            setIsWaiting(false);
            return;
          }

          setTimeout(() => {
            if (isAnswer === 3) {
              navigate('/event/roulette', {
                state: { remain_goods: remain_goods, apply_form: { name, studentId } },
              });
            } else {
              navigate('/event/result', {
                state: { result: 'incorrect', goods: null, apply_form: { name, studentId } },
              });
            }
          }, 10000);
        } catch (error) {
          alert('서버에 문제가 발생했습니다. 다시 시도해 주세요.');
          setIsWaiting(false);
        }
      } else {
        alert('학번과 이름을 다시 확인해주세요.');
      }
    }
  };

  if (isWaiting) {
    return (
      <div className="event-big-block loading">
        <h4>결과를 기다리고 있어요 . . .</h4>
        <div className="loading-images">
          <img src={process.env.PUBLIC_URL + '/Event-img/loading1.png'} alt="로딩 이미지 1" />
          <img src={process.env.PUBLIC_URL + '/Event-img/loading2.png'} alt="로딩 이미지 2" />
          <img src={process.env.PUBLIC_URL + '/Event-img/loading3.png'} alt="로딩 이미지 3" />
          <img src={process.env.PUBLIC_URL + '/Event-img/loading4.png'} alt="로딩 이미지 4" />
        </div>
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
            <button onClick={() => navigate('/')}>
              <img />
              퀴푸 웹 사이트 둘러보기
            </button>
          </p>
        </div>
        <h5 className="quiz-title">
          QUIZ.&nbsp;<div>퀴푸의 웹 개발팀 이름은 무엇일까요?</div>
          <img />
        </h5>
        <div className="quiz-block" onClick={() => handleAnswer(1)}>
          <div style={isAnswer === 1 ? { backgroundColor: '#98ded9' } : undefined}>1</div>{' '}
          QUIPU-CODE
        </div>
        <div className="quiz-block" onClick={() => handleAnswer(2)}>
          <div style={isAnswer === 2 ? { backgroundColor: '#98ded9' } : undefined}>2</div>{' '}
          QUIPU-TECH
        </div>
        <div className="quiz-block" onClick={() => handleAnswer(3)}>
          <div style={isAnswer === 3 ? { backgroundColor: '#98ded9' } : undefined}>3</div> QUIPU-DEV
        </div>
        <div className="quiz-block" onClick={() => handleAnswer(4)}>
          <div style={isAnswer === 4 ? { backgroundColor: '#98ded9' } : undefined}>4</div>{' '}
          QUIPU-DEVELOPERS
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
        *중복 참여를 방지하기 위함입니다.&nbsp;<br></br>이벤트 종료 후 모두 삭제할 예정입니다.
      </p>
      <button onClick={handleSubmit} className="event-custom-button">
        <p>정답은?</p>
      </button>
    </>
  );
}

export function Roulette() {
  const navigate = useNavigate();
  const location = useLocation();
  const { remain_goods, apply_form } = location.state || {};
  const [spin, setSpin] = useState(false);
  const [targetLabel, setTargetLabel] = useState(null);
  const [responseData, setResponseData] = useState();
  const [showSpinButton, setShowSpinButton] = useState(true);

  if (!remain_goods || !apply_form) {
    return <Error />;
  }

  const count_chicken = remain_goods[3].count;
  const count_coupon = remain_goods[2].count;
  const count_hamburger = remain_goods[1].count;
  const count_drink = remain_goods[0].count;
  const count_boom =
    remain_goods[0].count + remain_goods[1].count + remain_goods[2].count + remain_goods[3].count;

  const maxCountPerSegment = 3;

  const originalSegments = [
    { count: count_chicken, label: 'chicken' },
    { count: count_coupon, label: 'coupon' },
    { count: count_hamburger, label: 'hamburger' },
    { count: count_drink, label: 'drink' },
    { count: count_boom, label: 'boom' },
  ];

  let splitSegments = [];

  originalSegments.forEach((segment) => {
    if (segment.count > maxCountPerSegment) {
      const smallerSegments = splitSegment(segment, maxCountPerSegment);
      splitSegments = splitSegments.concat(smallerSegments);
    } else {
      splitSegments.push(segment);
    }
  });

  splitSegments = splitSegments.sort(() => Math.random() - 0.5);

  const handleGetGoods = async (apply_form) => {
    try {
      const { status, data } = await getResult(apply_form);
      let target_label;

      if (status === 201) {
        // 성공적으로 결과를 받아온 경우
        setResponseData(data);

        if (data.goods === '메가 커피') {
          target_label = 'drink';
        } else if (data.goods === '맘스터치') {
          target_label = 'hamburger';
        } else if (data.goods === '배민 만원권') {
          target_label = 'coupon';
        } else if (data.goods === '치킨') {
          target_label = 'chicken';
        } else if (data.goods === 'Boom') {
          target_label = 'boom';
        }

        setTargetLabel(target_label);
        setSpin(true);
        setShowSpinButton(false);
      } else if (status === 409) {
        // 중복 참여인 경우
        alert('룰렛은 한 번만 돌릴 수 있습니다. 확인 버튼을 누르면 결과 페이지로 이동됩니다.');
        const resultType = data.goods === 'Boom' ? 'correct_lose' : 'correct_win';
        navigate('/event/result', {
          state: { result: resultType, goods: data.goods, apply_form: apply_form },
        });
      } else {
        alert('서버에 문제가 생겼습니다. 다시 시도 후 퀴푸에 문의해주세요.');
        navigate('/');
      }
    } catch (error) {
      alert('서버에 문제가 생겼습니다. 다시 시도 후 퀴푸에 문의해주세요.');
      navigate('/');
    }
  };

  const handleResult = () => {
    if (responseData.winning) {
      navigate('/event/result', {
        state: { result: 'correct_win', goods: responseData.goods, apply_form: apply_form },
      });
    } else {
      navigate('/event/result', {
        state: { result: 'correct_lose', goods: null, apply_form: apply_form },
      });
    }
  };

  return (
    <>
      <div className="event-big-block-top">
        <p>
          <span>정답은 3번!&nbsp;</span> 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!
        </p>
      </div>
      <h4>
        정답입니다!{' '}
        {showSpinButton ? (
          <button className="roulette-button" onClick={() => handleGetGoods(apply_form)}>
            <p>룰렛 돌리기</p>
          </button>
        ) : (
          <button
            className="roulette-button"
            onClick={() => {
              handleResult();
            }}
          >
            <p>결과 보기</p>
          </button>
        )}
      </h4>
      <div className="count-container">
        <div className="count-block">
          <div style={{ backgroundColor: '#161D6F' }}></div>
          <p>치킨</p>
          <p>{count_chicken}</p>
        </div>
        <div className="count-block">
          <div style={{ backgroundColor: '#3797A4' }}></div>
          <p>배민 만원권</p>
          <p>{count_coupon}</p>
        </div>
        <div className="count-block">
          <div style={{ backgroundColor: '#7579E7' }}></div>
          <p>맘스터치 세트</p>
          <p>{count_hamburger}</p>
        </div>
        <div className="count-block">
          <div style={{ backgroundColor: '#87CEEB' }}></div>
          <p>메가커피</p>
          <p>{count_drink}</p>
        </div>
        <div className="count-block">
          <div style={{ backgroundColor: '#E3F6FF' }}></div>
          <p>꽝</p>
          <p>{count_boom}</p>
        </div>
      </div>
      <div className="roulette-box">
        <RouletteItem segments={splitSegments} spin={spin} targetLabel={targetLabel} />
      </div>
    </>
  );
}

export function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, goods, apply_form } = location.state || {};

  const [kakaoId, setKakaoId] = useState('');
  let goods_img;
  let content;

  console.log(result, apply_form);
  if (!result || !apply_form) {
    return <Error />;
  }

  if (goods === '메가 커피') {
    goods_img = 'drink';
  } else if (goods === '맘스터치') {
    goods_img = 'hamburger';
  } else if (goods === '배민 만원권') {
    goods_img = 'coupon';
  } else if (goods === '치킨') {
    goods_img = 'chicken';
  }

  const handleKakaoID = async () => {
    if (kakaoId.trim() !== '') {
      try {
        const { status } = await sendKakaoId(apply_form, kakaoId);
        if (status === 200) {
          alert('제출되었습니다.');
          navigate('/');
        } else if (status === 404) {
          alert('해당 학번을 가진 참여자를 찾을 수 없습니다.');
        } else {
          alert('서버에 문제가 생겼습니다. 다시 시도 후 퀴푸에 문의해주세요.');
        }
      } catch (error) {
        alert('서버에 문제가 생겼습니다. 다시 시도 후 퀴푸에 문의해주세요.');
      }
    } else {
      alert('전화번호를 입력해주세요.');
    }
  };

  if (result === 'incorrect') {
    content = (
      <>
        <div className="event-big-block-top">
          <p>
            <span>정답은 3번!&nbsp;</span> 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!
          </p>
        </div>
        <div className="event-result">
          <div className="event-result-img">
            <img src={process.env.PUBLIC_URL + '/Event-img/lose.png'} alt="lose" />
          </div>
          <div className="event-result-text" style={{ width: '50%' }}>
            <p>
              아쉽게도 정답이 아닙니다! <img />
            </p>
            <p>
              다시 도전해보세요! <img />
            </p>
          </div>
        </div>
      </>
    );
  }
  //정답이고 상품을 받을 경우
  else if (result === 'correct_win') {
    content = (
      <>
        <div className="event-big-block-top">
          <p>
            <span>정답은 3번!&nbsp;</span> 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!
          </p>
        </div>
        <div className="event-result">
          <div className="event-result-img">
            <img src={process.env.PUBLIC_URL + `/Event-img/${goods_img}.png`} alt="goods" />
          </div>
          <div className="event-result-text">
            <p>
              {apply_form.name}님 축하합니다! <img />
            </p>
            <p>
              전화번호를 남겨주시면<br></br>이벤트 종료 후 수령해드리겠습니다.
            </p>
            <div className="event-input-block result">
              <label>전화번호: </label>
              <input onChange={(e) => setKakaoId(e.target.value)}></input>
            </div>
          </div>
        </div>
      </>
    );
  }
  //정답이고 꽝일 경우
  else if (result === 'correct_lose') {
    content = (
      <>
        <div className="event-big-block-top">
          <p>
            <span>정답은 3번!&nbsp;</span> 퀴푸의 웹 개발팀 이름은 QUIPU-DEV 입니다!
          </p>
        </div>
        <div className="event-result">
          <div className="event-result-img">
            <img src={process.env.PUBLIC_URL + '/Event-img/lose.png'} alt="lose" />
          </div>
          <div className="event-result-text" style={{ width: '50%' }}>
            <p>
              아쉽게도 꽝입니다! <img />
            </p>
          </div>
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
      {result === 'correct_win' ? (
        <button onClick={() => handleKakaoID()} className="event-custom-button">
          <p>제출하고 home으로 가기</p>
        </button>
      ) : (
        <button onClick={() => navigate('/')} className="event-custom-button">
          <p>home으로 가기</p>
        </button>
      )}
    </>
  );
}
