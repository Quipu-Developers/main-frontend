import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './Activity.css';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

function Activity() {
  const titles = ['Study', 'Friendship', 'MT'];
  const images = [
    [
      '/ActivityDetail-img/2024/Study/리액트스터디3.jpeg',
      '/ActivityDetail-img/2024/Study/새싹해커톤2.jpeg',
      '/ActivityDetail-img/2023/Study/퀴푸메인웹개발3.jpg',
    ],
    [
      '/ActivityDetail-img/2023/FriendShip/친목11.jpg',
      '/ActivityDetail-img/2024/FriendShip/친목10.jpeg',
      '/ActivityDetail-img/2023/FriendShip/친목10.jpg',
    ],
    [
      '/ActivityDetail-img/2023/MT/엠티3.jpg',
      '/ActivityDetail-img/2024/MT/엠티2.jpeg',
      '/ActivityDetail-img/2023/MT/엠티1.jpg',
    ],
  ];

  return (
    <div className="activity-container">
      <h1>
        <span style={{ color: '#0066ff' }}>A</span>ctivity
      </h1>
      <ActivityBlock
        title={titles[0]}
        src1={images[0][0]}
        src2={images[0][1]}
        src3={images[0][2]}
      ></ActivityBlock>
      <ActivityBlock
        title={titles[1]}
        src1={images[1][0]}
        src2={images[1][1]}
        src3={images[1][2]}
      ></ActivityBlock>
      <ActivityBlock
        title={titles[2]}
        src1={images[2][0]}
        src2={images[2][1]}
        src3={images[2][2]}
      ></ActivityBlock>
    </div>
  );
}

function ActivityBlock(props) {
  return (
    <div className="activity-block">
      <RouterLink to={'/activity-detail'} state={{ activeTab: props.title }}>
        <p className="activity-block__title">
          {props.title}&nbsp; <MdOutlineKeyboardDoubleArrowRight style={{ fontSize: '25px' }} />
        </p>
      </RouterLink>
      <img
        className="activity-block__image--big"
        src={process.env.PUBLIC_URL + props.src1}
        alt="활동1"
      ></img>
      <img
        className="activity-block__image--small"
        src={process.env.PUBLIC_URL + props.src2}
        alt="활동2"
      ></img>
      <img
        className="activity-block__image--small"
        src={process.env.PUBLIC_URL + props.src3}
        alt="활동3"
      ></img>
    </div>
  );
}

export default Activity;
