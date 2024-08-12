import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css';

function Error() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div className="error-container">
      <div className="error-text-container">
        <h1>ERROR</h1>
        <h2>Please Try Again</h2>
        <p>예상치 못한 오류가 발생했습니다.</p>
        <p>나중에 다시 시도하거나,</p>
        <p>
          문제가 지속될 경우 <br></br>
          <br></br>{' '}
          <span>
            <a href="https://open.kakao.com/o/sO45q17f" target="_blank" rel="noopener noreferrer">
              퀴푸 지원팀
            </a>
          </span>
          &nbsp;에 문의해 주세요
        </p>
        <button onClick={goHome}>GO TO HOME</button>
      </div>
    </div>
  );
}

export default Error;
