export const showcase_data = [
  {
    project_name: 'Main Web',
    project_summary: 'Quipu의 활동과 목표를 소개하고, 동아리 활동을 지원하는 웹사이트입니다.',
    main_img: [
      '/ShowcaseMain-img/main-web/1.png',
      '/ShowcaseMain-img/main-web/2.png',
      '/ShowcaseMain-img/main-web/3.png',
      '/ShowcaseMain-img/main-web/4.png',
      '/ShowcaseMain-img/main-web/5.png',
    ],
    goal: 'Quipu에서 진행하는 스터디, 친목, 웹 개발 활동을 소개하고, 다양한 이벤트를 통해 Quipu의 열정과 그 결실을 널리 알리기 위해 제작되었습니다.',
    this_project:
      'Quipu는 잉카 제국과 안데스 지역에서 사용되었던 매듭을 통한 의사소통 체계에서 영감을 받은 이름으로, 다양한 지식과 경험을 엮어내는 컴퓨터 학술 동아리입니다. 우리는 스터디와 웹 프로젝트를 통해 실무 역량을 키우며, 끈기와 열정으로 함께 성장합니다. 이 웹사이트는 Quipu의 성장 과정을 기록하고, 새로운 회원들이 동아리에 쉽게 지원할 수 있도록 돕는 지원 폼을 포함하고 있습니다. 또한, Quipu의 최신 활동과 성과를 한눈에 볼 수 있도록 설계되었습니다.',
    this_project_for: '앞으로 Quipu와 함께 지식과 경험을 엮어갈 서울시립대 학우분들',
    web_url: 'https://quipu.uos.ac.kr/',
    github_url: [
      'https://github.com/Quipu-Developers/main-frontend',
      'https://github.com/Quipu-Developers/main-backend',
    ],
    history: [
      {
        card_type: 'history_card1',
        date: '2024.03.01',
        content: [
          'Join Quipu 지원 폼을 통해 새로운 동아리 회원을 모집합니다.',
          '스터디, 친목 활동, MT 등 매년 진행된 활동을 사진과 함께 기록합니다.',
        ],
        tech_stack_img: ['html','css'],
        tech_stack: ['HTML', 'CSS'],
        history_img: ['/ShowcaseMain-img/main-web/8.png', '/ShowcaseMain-img/main-web/4.png'],
      },
      {
        card_type: 'history_card2',
        date: '2024.08.17',
        content: [
          '모바일 환경에서 더 나은 UX를 위해 상단 메뉴 대신 하단 플로팅 액션 버튼으로 변경했습니다.',
          '사용자들이 한 손으로 웹사이트를 탐색하기가 훨씬 수월해졌습니다.',
        ],
        tech_stack_img: ['mysql','react'],
        tech_stack: ['JavaScript', 'CSS'],
        history_img: '/ShowcaseMain-img/main-web/7.png',
      },
      {
        card_type: 'history_card3',
        date: '2024.08.17',
        content: [
          'About 섹션에 인터랙티브 요소를 추가하여, 퀴푸의 활동과 목표를 더 생동감 있게 소개하고 있습니다.',
          '사용자가 동아리의 주요 키워드와 사용 기술을 직관적으로 이해할 수 있도록 표현하였습니다.',
        ],
        tech_stack_img: 'nodejs',
        tech_stack: 'Nodejs',
        history_img: [''],
      },
      {
        card_type: 'history_card4',
        date: '2024.08.17',
        content: [
          '퀴푸의 개발팀인 Quipu-Dev를 소개하는 섹션을 추가했습니다.',
          'Showcase에서는 팀이 개발한 프로젝트를, Interview에서는 프로젝트에 참여한 사람들의 이야기를 볼 수 있습니다.',
        ],
        tech_stack_img: [''],
        tech_stack: '',
        history_img: '/ShowcaseMain-img/main-web/6.png',
      },
      {
        card_type: 'history_card5',
        date: '2024.08.17',
        content: [
          'Join Quipu에서 일반 부원과 개발 부원의 지원 폼을 분리하여,',
          '하나의 폼에서 지원을 받던 예전 방식에서 발생한 혼란을 개선하였습니다.',
        ],
        tech_stack_img: 'js',
        tech_stack: 'JavaScript',
        history_img: '/ShowcaseMain-img/main-web/5.png',
      },
    ],
  },
  {
    project_name: 'Backoffice Web',
    main_img: [
      '/ShowcaseMain-img/backoffice-web/1.png',
      '/ShowcaseMain-img/backoffice-web/2.png',
      '/ShowcaseMain-img/backoffice-web/2.png',
      '/ShowcaseMain-img/backoffice-web/2.png',
      '/ShowcaseMain-img/backoffice-web/5.png',
    ],
    goal: 'Main Web의 Join Quipu를 통해 받은 지원 폼의 내용을 실시간으로 편하게 확인하고 관리하기 위해 관리자 서비스 웹페이지를 만들었습니다.',
    this_project:
      'Join Quipu와 관련된 데이터베이스에 저장된 지원 데이터를 불러오고, 엑셀 파일로 데이터를 저장할 수 있는 기능이 포함되어 있습니다.',
    this_project_for: '동아리 내 지원 데이터를 확인해야 하는 임원진',
    web_url: '',
    github_url: [
      'https://github.com',
      'https://github.com'
    ],
    history: [
      {
        card_type: 'history_card1',
        date: '2024.08.17',
        content: [
          '실시간으로 지원 데이터가 담긴 DB에서 내용을 불러와 웹페이지를 통해 확인할 수 있습니다.',
          '기존에 AWS의 DB에 직접 접속하여 데이터를 확인하던 불편함을 개선하였습니다.',
        ],
        tech_stack_img: ['html','css'],
        tech_stack: ['HTML', 'CSS'],
        history_img: ['/ShowcaseDetail-img/image 1.png', '/ShowcaseDetail-img/image 2.png'],
      },
      {
        card_type: 'history_card2',
        date: '2024.07.24',
        content: [
          '내용이 긴 필드는 모달을 통해 추가적으로 확인할 수 있게 하여, 더 직관적인 테이블을 렌더링합니다.',
          '클릭 이벤트를 통해 필요한 데이터를 쉽게 복사하여 회원 모집 과정에 도움을 줍니다.',
        ],
        tech_stack_img: ['react','mysql'],
        tech_stack: ['JavaScript', 'CSS'],
        history_img: '/ShowcaseDetail-img/image 3.png',
      },
      {
        card_type: 'history_card3',
        date: '2024.07.24',
        content: [
          'ac lacus, varius ipsum luctus lobortis, lacus elit. elit. sit eget non libero, adipiscing urna. urna. dui. tincidunt diam ',
          'non. malesuada In Lorem ipsum varius cursus at, est. non quis placerat at nibh ex. sit quam elementum odio diam Ut sit quam',
        ],
        tech_stack_img: 'nodejs',
        tech_stack: 'nodejs',
        history_img: [''],
      },
      {
        card_type: 'history_card4',
        date: '2024.07.24',
        content: [
          'ac lacus, varius ipsum luctus lobortis, lacus elit. elit. sit eget non libero, adipiscing urna. urna. dui. tincidunt diam ',
          'non. malesuada In Lorem ipsum varius cursus at, est. non quis placerat at nibh ex. sit quam elementum odio diam Ut sit quam',
        ],
        tech_stack_img: [''],
        tech_stack: '',
        history_img: '/ShowcaseDetail-img/image 4.png',
      },
      {
        card_type: 'history_card5',
        date: '2024.07.24',
        content: [
          'ac lacus, varius ipsum luctus lobortis, lacus elit. elit. sit eget non libero, adipiscing urna. urna. dui. tincidunt diam ',
          'non. malesuada In Lorem ipsum varius cursus at, est. non quis placerat at nibh ex. sit quam elementum odio diam Ut sit quam',
        ],
        tech_stack_img: 'js',
        tech_stack: 'https://javascript.com',
        history_img: '/ShowcaseDetail-img/image 5.png',
      },
    ],
  },
];
