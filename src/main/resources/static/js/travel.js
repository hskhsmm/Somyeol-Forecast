/**
 * travel.js - 소멸예보제 여행 코스 추천 기능
 */

// 여행 코스 데이터 (강원도 지역만 포함)
const travelCourses = {
    // 고성군
    1: {
        regionName: '고성군',
        courses: {
            'short': { // 1박 2일
                title: '고성 바다와 역사 힐링 코스 (1박 2일)',
                description: '동해안의 아름다운 해안선과 DMZ의 역사를 함께 체험하는 고성 여행',
                days: [
                    {
                        title: '1일차: 자연 & 해변',
                        spots: [
                            {
                                name: '화진포 해수욕장',
                                description: '에메랄드빛 투명한 바다와 울창한 송림이 어우러진 아름다운 해변',
                                imageUrl: 'https://i.ibb.co/Y8BtXMW/hwajinpo-beach.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 고성군 거진읍 화진포길 280',
                                tip: '일출 명소로 유명하니 이른 아침에 방문해보세요.'
                            },
                            {
                                name: '화진포 해양박물관',
                                description: '해양 생태계와 역사를 배울 수 있는 박물관',
                                imageUrl: 'https://i.ibb.co/QJHCtvZ/hwajinpo-museum.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 고성군 거진읍 화진포길 412',
                                tip: '아이들과 함께라면 체험 프로그램도 이용해보세요.'
                            },
                            {
                                name: '송지호 관광지',
                                description: '바다와 맞닿은 호수와 철새 도래지로 유명한 생태 관광지',
                                imageUrl: 'https://i.ibb.co/B2jZz9R/songjinho.jpg',
                                type: 'nature',
                                recommendedTime: '1시간',
                                address: '강원도 고성군 죽왕면 동해대로 6262',
                                tip: '해 질 녘 노을이 아름다우니 저녁에 방문하세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '고성 명태마을',
                                menu: '명태요리 전문점',
                                description: '고성의 대표 특산물인 명태를 다양하게 맛볼 수 있는 곳',
                                address: '강원도 고성군 거진읍 거진시장1길 32',
                                recommendedMenu: '명태구이정식, 명태찜'
                            }
                        ],
                        accommodation: {
                            name: '화진포 콘도',
                            description: '화진포해수욕장이 내려다보이는 편안한 숙소',
                            address: '강원도 고성군 거진읍 화진포길 280',
                            tip: '바다 전망 객실을 요청하면 좋습니다.'
                        }
                    },
                    {
                        title: '2일차: 역사 & 문화',
                        spots: [
                            {
                                name: 'DMZ 박물관',
                                description: '분단의 역사와 한반도 평화를 위한 노력을 배울 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/xCQj61g/dmz-museum.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 고성군 현내면 금강산로 481',
                                tip: '박물관 주변 전망대에서 북한 지역을 볼 수 있습니다.'
                            },
                            {
                                name: '통일전망대',
                                description: '북한 금강산과 동해바다를 한눈에 볼 수 있는 전망대',
                                imageUrl: 'https://i.ibb.co/GMV83mn/unification-observatory.jpg',
                                type: 'culture',
                                recommendedTime: '1시간',
                                address: '강원도 고성군 현내면 금강산로 481',
                                tip: '맑은 날 방문하면 금강산까지 볼 수 있습니다.'
                            },
                            {
                                name: '화진포 해수욕장',
                                description: '김일성, 이승만 별장이 있는 역사적 장소',
                                imageUrl: 'https://i.ibb.co/Y8BtXMW/hwajinpo-beach.jpg',
                                type: 'history',
                                recommendedTime: '1시간 30분',
                                address: '강원도 고성군 거진읍 화진포길 280',
                                tip: '역사 별장 내부 관람도 가능합니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '고성 해물촌',
                                menu: '해산물 요리 전문',
                                description: '신선한 동해 해산물로 만든 다양한 요리를 맛볼 수 있는 곳',
                                address: '강원도 고성군 현내면 금강산로 290',
                                recommendedMenu: '물회, 회덮밥'
                            }
                        ]
                    }
                ]
            },
            'long': { // 3박 4일
                title: '고성 자연과 문화 깊이 체험 코스 (3박 4일)',
                description: '고성의 자연, 역사, 문화를 깊이 체험할 수 있는 여유로운 여행',
                days: [
                    {
                        title: '1일차: 해변 & 힐링',
                        spots: [
                            {
                                name: '화진포 해수욕장',
                                description: '에메랄드빛 투명한 바다와 울창한 송림이 어우러진 아름다운 해변',
                                imageUrl: 'https://i.ibb.co/Y8BtXMW/hwajinpo-beach.jpg',
                                type: 'nature',
                                recommendedTime: '3시간',
                                address: '강원도 고성군 거진읍 화진포길 280',
                                tip: '해수욕과 산책을 함께 즐기기 좋습니다.'
                            },
                            {
                                name: '화진포 해양박물관',
                                description: '해양 생태계와 역사를 배울 수 있는 박물관',
                                imageUrl: 'https://i.ibb.co/QJHCtvZ/hwajinpo-museum.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 고성군 거진읍 화진포길 412',
                                tip: '박물관 내 체험 프로그램도 참여해보세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '고성 명태마을',
                                menu: '명태요리 전문점',
                                description: '고성의 대표 특산물인 명태를 다양하게 맛볼 수 있는 곳',
                                address: '강원도 고성군 거진읍 거진시장1길 32',
                                recommendedMenu: '명태구이정식, 명태찜'
                            }
                        ],
                        accommodation: {
                            name: '화진포 콘도',
                            description: '화진포해수욕장이 내려다보이는 편안한 숙소',
                            address: '강원도 고성군 거진읍 화진포길 280',
                            tip: '바다 전망 객실을 요청하면 좋습니다.'
                        }
                    },
                    {
                        title: '2일차: 역사 & 문화',
                        spots: [
                            {
                                name: 'DMZ 박물관',
                                description: '분단의 역사와 한반도 평화를 위한 노력을 배울 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/xCQj61g/dmz-museum.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 고성군 현내면 금강산로 481',
                                tip: '관련 다큐멘터리 상영도 관람하세요.'
                            },
                            {
                                name: '통일전망대',
                                description: '북한 금강산과 동해바다를 한눈에 볼 수 있는 전망대',
                                imageUrl: 'https://i.ibb.co/GMV83mn/unification-observatory.jpg',
                                type: 'culture',
                                recommendedTime: '1시간',
                                address: '강원도 고성군 현내면 금강산로 481',
                                tip: '맑은 날 방문하면 금강산까지 볼 수 있습니다.'
                            },
                            {
                                name: '화진포 역사 별장',
                                description: '김일성, 이승만 별장이 있는 역사적 장소',
                                imageUrl: 'https://i.ibb.co/Kj36bGq/hwajinpo-villa.jpg',
                                type: 'history',
                                recommendedTime: '1시간 30분',
                                address: '강원도 고성군 거진읍 화진포길 280',
                                tip: '해설사의 설명을 들으면 더 유익합니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '고성 해물촌',
                                menu: '해산물 요리 전문',
                                description: '신선한 동해 해산물로 만든 다양한 요리를 맛볼 수 있는 곳',
                                address: '강원도 고성군 현내면 금강산로 290',
                                recommendedMenu: '물회, 회덮밥'
                            }
                        ],
                        accommodation: {
                            name: '금강산 콘도',
                            description: '금강산 조망이 가능한 현대적인 숙소',
                            address: '강원도 고성군 현내면 금강산로 481',
                            tip: '온천 시설도 이용해보세요.'
                        }
                    },
                    {
                        title: '3일차: 자연 탐방',
                        spots: [
                            {
                                name: '건봉사',
                                description: '신라시대 창건된 고찰로 아름다운 자연 속에 위치',
                                imageUrl: 'https://i.ibb.co/7ysJVQX/geonbongsa.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 고성군 거진읍 건봉사로 723',
                                tip: '절 주변 산책로도 함께 둘러보세요.'
                            },
                            {
                                name: '송지호 해변',
                                description: '호수와 바다가 만나는 독특한 풍경의 해변',
                                imageUrl: 'https://i.ibb.co/B2jZz9R/songjinho.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 고성군 죽왕면 동해대로 6262',
                                tip: '해 질 녘 방문하면 아름다운 노을을 볼 수 있습니다.'
                            },
                            {
                                name: '왕곡마을',
                                description: '전통 한옥을 보존한 민속마을',
                                imageUrl: 'https://i.ibb.co/w4rJqCT/wanggok-village.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 고성군 죽왕면 오봉리',
                                tip: '전통 체험 프로그램도 있습니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '고성 맛나향',
                                menu: '한식',
                                description: '고성의 향토 음식을 맛볼 수 있는 전통 한식당',
                                address: '강원도 고성군 토성면 토성로 32-1',
                                recommendedMenu: '더덕구이, 산채비빔밥'
                            }
                        ],
                        accommodation: {
                            name: '송지호 리조트',
                            description: '송지호와 동해가 보이는 아름다운 전망의 숙소',
                            address: '강원도 고성군 죽왕면 동해대로 6262',
                            tip: '아침 일출 명소입니다.'
                        }
                    },
                    {
                        title: '4일차: 생태 & 체험',
                        spots: [
                            {
                                name: '고성 청간정',
                                description: '동해안 최고의 일출 명소 중 하나인 역사적인 정자',
                                imageUrl: 'https://i.ibb.co/hWgp1wd/cheongganjeong.jpg',
                                type: 'culture',
                                recommendedTime: '1시간',
                                address: '강원도 고성군 토성면 동해대로 5110',
                                tip: '일출 시간에 방문하면 장관입니다.'
                            },
                            {
                                name: '화암사',
                                description: '바다가 보이는 독특한 위치의 사찰',
                                imageUrl: 'https://i.ibb.co/DVmj7RV/hwaamsa.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 고성군 토성면 용촌리',
                                tip: '바다를 배경으로 한 사찰 풍경이 아름답습니다.'
                            },
                            {
                                name: '무궁화수목원',
                                description: '다양한 무궁화 품종과 자연을 감상할 수 있는 수목원',
                                imageUrl: 'https://i.ibb.co/2yyyR87/mugunghwa-garden.jpg',
                                type: 'nature',
                                recommendedTime: '1시간 30분',
                                address: '강원도 고성군 간성읍 수목원길 25',
                                tip: '무궁화 개화시기인 7-8월 방문이 가장 좋습니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '고성 해변 식당',
                                menu: '해산물',
                                description: '동해안 생선회와 해산물 요리 전문점',
                                address: '강원도 고성군 토성면 동해대로 5110',
                                recommendedMenu: '회정식, 매운탕'
                            }
                        ]
                    }
                ]
            }
        }
    },
    // 양구군 (계속)
    2: {
        regionName: '양구군',
        courses: {
            'short': { // 1박 2일
                title: '양구 DMZ 생태 체험 코스 (1박 2일)',
                description: '국내 유일의 이색 비무장지대 생태와 문화를 체험하는 양구 여행',
                days: [
                    {
                        title: '1일차: DMZ 생태 탐방',
                        spots: [
                            {
                                name: '을지전망대',
                                description: '북한과 가장 가까운 거리에서 볼 수 있는 전망대',
                                imageUrl: 'https://i.ibb.co/rvgZTsJ/eulji-observatory.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 양구군 해안면 해안서화로 35',
                                tip: '맑은 날 방문하면 북한 지역이 잘 보입니다. 신분증은 필수!'
                            },
                            {
                                name: '두타연',
                                description: '50년간 민간인 통제구역이었던 숨겨진 비경',
                                imageUrl: 'https://i.ibb.co/z4GLGZS/dutayeon.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 양구군 방산면 두타연로 291',
                                tip: '예약제로 운영되니 방문 전 반드시 확인하세요.'
                            },
                            {
                                name: '양구 선사박물관',
                                description: '구석기 유적과 선사시대 생활상을 볼 수 있는 박물관',
                                imageUrl: 'https://i.ibb.co/StQPNb9/prehistoric-museum.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 양구군 양구읍 중심로 207-19',
                                tip: '박물관 내 체험 프로그램도 참여해보세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '양구시래기마을',
                                menu: '시래기 요리 전문',
                                description: '양구 특산물인 시래기로 만든 다양한 건강식 메뉴',
                                address: '강원도 양구군 양구읍 중앙로 82',
                                recommendedMenu: '시래기밥상, 시래기해장국'
                            }
                        ],
                        accommodation: {
                            name: '펀치볼 펜션',
                            description: '아름다운 펀치볼 분지가 내려다보이는 펜션',
                            address: '강원도 양구군 해안면 만대길 157',
                            tip: '야외 테라스에서 맑은 공기와 함께 펀치볼의 아름다운 풍경을 감상하세요.'
                        }
                    },
                    {
                        title: '2일차: 문화 & 역사',
                        spots: [
                            {
                                name: '펀치볼(해안분지)',
                                description: '해발 400m의 분지로 철원평야, 용암대지와 함께 한국 3대 분지',
                                imageUrl: 'https://i.ibb.co/LR96tXD/punch-bowl.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 양구군 해안면 일대',
                                tip: '사진 촬영 명소이니 전망 좋은 곳에서 인생샷을 남겨보세요.'
                            },
                            {
                                name: '박수근 미술관',
                                description: '한국 근대 미술의 거장 박수근의 작품을 감상할 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/23LMq6k/park-soo-keun-museum.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 양구군 양구읍 박수근로 265-15',
                                tip: '미술관 야외 조각공원도 함께 둘러보세요.'
                            },
                            {
                                name: '양구 전쟁기념관',
                                description: '한국전쟁 당시 양구 지역의 역사와 유물을 전시',
                                imageUrl: 'https://i.ibb.co/DGsNbHm/war-memorial.jpg',
                                type: 'culture',
                                recommendedTime: '1시간',
                                address: '강원도 양구군 양구읍 상무대길 37',
                                tip: '한반도의 평화와 통일에 대해 생각해볼 수 있는 시간을 가져보세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '양구 맛집',
                                menu: '산채비빔밥',
                                description: '지역 특산물인 더덕과 산나물로 만든 건강식',
                                address: '강원도 양구군 양구읍 중앙로 102',
                                recommendedMenu: '더덕정식, 산채비빔밥'
                            }
                        ]
                    }
                ]
            },
            'long': { // 3박 4일
                title: '양구 생태 & 역사 몰입 코스 (3박 4일)',
                description: '양구의 DMZ 생태와 역사, 문화를 깊이 있게 체험하는 여유로운 여행',
                days: [
                    {
                        title: '1일차: DMZ 접경 지역 탐방',
                        spots: [
                            {
                                name: '을지전망대',
                                description: '북한과 가장 가까운 거리에서 볼 수 있는 전망대',
                                imageUrl: 'https://i.ibb.co/rvgZTsJ/eulji-observatory.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 양구군 해안면 해안서화로 35',
                                tip: '신분증을 꼭 지참하세요. 맑은 날 방문하면 북한 지역이 잘 보입니다.'
                            },
                            {
                                name: '제4땅굴',
                                description: '북한이 남침 목적으로 파 놓은 땅굴',
                                imageUrl: 'https://i.ibb.co/cLr78FZ/4th-tunnel.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 양구군 해안면 땅굴로 830',
                                tip: '안전모 착용 필수. 땅굴 내부는 춥고 습하니 얇은 겉옷을 준비하세요.'
                            },
                            {
                                name: 'DMZ 생태 평화공원',
                                description: '철책선 안쪽에 조성된 생태 관광지',
                                imageUrl: 'https://i.ibb.co/mzPJ9F5/dmz-eco-park.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 양구군 해안면 DMZ로 369',
                                tip: '해설사와 함께하는 투어 프로그램을 이용해보세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '양구시래기마을',
                                menu: '시래기 요리 전문',
                                description: '양구 특산물인 시래기로 만든 다양한 건강식 메뉴',
                                address: '강원도 양구군 양구읍 중앙로 82',
                                recommendedMenu: '시래기밥상, 시래기해장국'
                            }
                        ],
                        accommodation: {
                            name: '양구 스테이',
                            description: '아늑한 분위기의 양구 전통 숙소',
                            address: '강원도 양구군 양구읍 중심로 120',
                            tip: '주변 산책로가 잘 조성되어 있어 저녁 산책하기 좋습니다.'
                        }
                    },
                    {
                        title: '2일차: 자연 & 생태',
                        spots: [
                            {
                                name: '두타연',
                                description: '50년간 민간인 통제구역이었던 숨겨진 비경',
                                imageUrl: 'https://i.ibb.co/z4GLGZS/dutayeon.jpg',
                                type: 'nature',
                                recommendedTime: '3시간',
                                address: '강원도 양구군 방산면 두타연로 291',
                                tip: '예약제로 운영되니 방문 전 반드시 확인하세요. 트레킹 코스도 이용해보세요.'
                            },
                            {
                                name: '대암산 용늪',
                                description: '국내 유일의 고층습지로 천연기념물로 지정된 곳',
                                imageUrl: 'https://i.ibb.co/bKvyDGS/daeamsan-swamp.jpg',
                                type: 'nature',
                                recommendedTime: '3시간',
                                address: '강원도 양구군 동면 대암산길',
                                tip: '생태 해설 프로그램을 이용하면 더 깊이 있게 체험할 수 있습니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '산촌식당',
                                menu: '산채정식',
                                description: '양구 지역 산나물로 만든 건강한 한정식',
                                address: '강원도 양구군 동면 바랑길 28',
                                recommendedMenu: '산채정식, 더덕구이'
                            }
                        ],
                        accommodation: {
                            name: '펀치볼 펜션',
                            description: '아름다운 펀치볼 분지가 내려다보이는 펜션',
                            address: '강원도 양구군 해안면 만대길 157',
                            tip: '야외 테라스에서 별 보기 좋습니다.'
                        }
                    },
                    {
                        title: '3일차: 문화 & 예술',
                        spots: [
                            {
                                name: '박수근 미술관',
                                description: '한국 근대 미술의 거장 박수근의 작품을 감상할 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/23LMq6k/park-soo-keun-museum.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 양구군 양구읍 박수근로 265-15',
                                tip: '미술관 내 교육 프로그램도 참여해보세요.'
                            },
                            {
                                name: '양구 선사박물관',
                                description: '구석기 유적과 선사시대 생활상을 볼 수 있는 박물관',
                                imageUrl: 'https://i.ibb.co/StQPNb9/prehistoric-museum.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 양구군 양구읍 중심로 207-19',
                                tip: '체험 프로그램에 참여하면 더 알차게 관람할 수 있습니다.'
                            },
                            {
                                name: '양구 백자박물관',
                                description: '조선 시대 백자를 생산하던 양구 지역의 도자기 역사와 문화를 알 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/7QvzDWw/porcelain-museum.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 양구군 방산면 평화로 5182',
                                tip: '도자기 만들기 체험도 가능합니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '양구명가',
                                menu: '한정식',
                                description: '양구 지역 식재료로 만든 정갈한 한정식',
                                address: '강원도 양구군 양구읍 박수근로 265',
                                recommendedMenu: '양구정식, 더덕전골'
                            }
                        ],
                        accommodation: {
                            name: '양구 힐링스테이',
                            description: '조용하고 아늑한 분위기의 펜션',
                            address: '강원도 양구군 양구읍 중심로 150',
                            tip: '도심에서 가깝지만 조용한 환경으로 휴식에 최적화된 숙소입니다.'
                        }
                    },
                    {
                        title: '4일차: 역사 탐방',
                        spots: [
                            {
                                name: '양구 전쟁기념관',
                                description: '한국전쟁 당시 양구 지역의 역사와 유물을 전시',
                                imageUrl: 'https://i.ibb.co/DGsNbHm/war-memorial.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 양구군 양구읍 상무대길 37',
                                tip: '평화의 중요성을 배울 수 있는 교육적인 장소입니다.'
                            },
                            {
                                name: '펀치볼(해안분지)',
                                description: '해발 400m의 분지로 철원평야, 용암대지와 함께 한국 3대 분지',
                                imageUrl: 'https://i.ibb.co/LR96tXD/punch-bowl.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 양구군 해안면 일대',
                                tip: '해안면 일대를 구경하며 분지의 아름다움을 감상하세요.'
                            },
                            {
                                name: '도솔산 전투위령비',
                                description: '한국전쟁 당시 격전지였던 도솔산에 세워진 위령비',
                                imageUrl: 'https://i.ibb.co/0s0x4D8/dosolsan-memorial.jpg',
                                type: 'culture',
                                recommendedTime: '1시간',
                                address: '강원도 양구군 동면 도솔산로',
                                tip: '주변 산책로도 잘 조성되어 있어 산책하기 좋습니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '양구 맛집',
                                menu: '산채비빔밥',
                                description: '지역 특산물인 더덕과 산나물로 만든 건강식',
                                address: '강원도 양구군 양구읍 중앙로 102',
                                recommendedMenu: '더덕정식, 산채비빔밥'
                            }
                        ]
                    }
                ]
            }
        }
    },
    // 인제군 (계속)
    5: {
        regionName: '인제군',
        courses: {
            'short': { // 1박 2일
                title: '인제 자연 힐링 코스 (1박 2일)',
                description: '내설악의 아름다운 자연 속에서 힐링을 찾는 인제 여행',
                days: [
                    {
                        title: '1일차: 내설악 자연 탐방',
                        spots: [
                            {
                                name: '원대리 자작나무숲',
                                description: '한국의 대표 자작나무 군락지로 사계절 아름다운 풍경을 자랑',
                                imageUrl: 'https://i.ibb.co/1bbKgTQ/birch-forest.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 인제군 인제읍 원대리 763-67',
                                tip: '사전 예약이 필수입니다. 11~3월은 겨울 특별개방 프로그램으로만 입장 가능.'
                            },
                            {
                                name: '방동약수',
                                description: '100년 전통의 유명한 약수터로 철분이 풍부한 탄산약수',
                                imageUrl: 'https://i.ibb.co/d041wqj/bangdong-mineral-water.jpg',
                                type: 'nature',
                                recommendedTime: '1시간',
                                address: '강원도 인제군 남면 방동약수길 499',
                                tip: '약수를 마셔보고 빈 물병을 가져가면 약수를 담아갈 수 있습니다.'
                            },
                            {
                                name: '백담사',
                                description: '설악산 깊은 골짜기에 자리한 천년 고찰',
                                imageUrl: 'https://i.ibb.co/xMCjtkY/baekdamsa.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 인제군 북면 백담로 796',
                                tip: '만해 한용운 스님이 머물렀던 만해기념관도 함께 방문해보세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '인제 황태마을',
                                menu: '황태요리 전문',
                                description: '인제 지역 특산물인 황태로 만든 다양한 요리',
                                address: '강원도 인제군 북면 설악로 2180',
                                recommendedMenu: '황태구이정식, 황태해장국'
                            }
                        ],
                        accommodation: {
                            name: '내설악 펜션',
                            description: '설악산과 계곡이 보이는 아름다운 전망의 펜션',
                            address: '강원도 인제군 북면 한계리 745',
                            tip: '객실 테라스에서 설악산 풍경을 감상하며 힐링하세요.'
                        }
                    },
                    {
                        title: '2일차: 문화 & 체험',
                        spots: [
                            {
                                name: '인제 산촌민속박물관',
                                description: '산촌 지역 주민들의 생활 모습과 문화를 엿볼 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/pX9cbLG/folklore-museum.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 인제군 인제읍 인제로156번길 50',
                                tip: '전통 농기구와 생활 도구 전시가 인상적입니다.'
                            },
                            {
                                name: '내린천 래프팅',
                                description: '국내 최고의 래프팅 명소로 꼽히는 내린천에서의 짜릿한 액티비티',
                                imageUrl: 'https://i.ibb.co/VmvQLk8/rafting.jpg',
                                type: 'activity',
                                recommendedTime: '3시간',
                                address: '강원도 인제군 인제읍 내린천로',
                                tip: '여름철 래프팅 성수기에 방문하는 것이 좋습니다. 사전 예약 필수!'
                            },
                            {
                                name: '용대리 황태마을',
                                description: '인제 황태의 본고장으로 황태 덕장을 볼 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/4mGj885/yellow-corvina-village.jpg',
                                type: 'culture',
                                recommendedTime: '1시간',
                                address: '강원도 인제군 북면 용대리',
                                tip: '겨울에 방문하면 황태가 말라가는 풍경을 볼 수 있습니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '인제 맑은터',
                                menu: '송어회, 민물고기 요리',
                                description: '내린천에서 잡히는 신선한 민물고기 요리 전문점',
                                address: '강원도 인제군 인제읍 내린천로 72',
                                recommendedMenu: '송어회, 송어구이'
                            }
                        ]
                    }
                ]
            },
            'long': { // 3박 4일
                title: '인제 자연과 문화 완전 정복 코스 (3박 4일)',
                description: '내설악의 비경과 인제의 다양한 문화를 깊이 있게 체험하는 여행',
                days: [
                    {
                        title: '1일차: 자연 속 힐링',
                        spots: [
                            {
                                name: '원대리 자작나무숲',
                                description: '한국의 대표 자작나무 군락지로 사계절 아름다운 풍경을 자랑',
                                imageUrl: 'https://i.ibb.co/1bbKgTQ/birch-forest.jpg',
                                type: 'nature',
                                recommendedTime: '3시간',
                                address: '강원도 인제군 인제읍 원대리 763-67',
                                tip: '사전 예약이 필수입니다. 느린 걸음으로 숲의 소리를 들으며 걸어보세요.'
                            },
                            {
                                name: '하추자연휴양림',
                                description: '맑은 공기와 울창한 숲이 있는 자연 휴양림',
                                imageUrl: 'https://i.ibb.co/pP1wvCz/hachu-forest.jpg',
                                type: 'nature',
                                recommendedTime: '2시간',
                                address: '강원도 인제군 인제읍 원남로74번길 40',
                                tip: '산책로를 따라 숲 속 데크에서 쉬어가며 힐링하세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '인제 황태마을',
                                menu: '황태요리 전문',
                                description: '인제 지역 특산물인 황태로 만든 다양한 요리',
                                address: '강원도 인제군 북면 설악로 2180',
                                recommendedMenu: '황태구이정식, 황태해장국'
                            }
                        ],
                        accommodation: {
                            name: '설악 숲속의 집',
                            description: '설악산 자락에 위치한 편안한 통나무 휴양지',
                            address: '강원도 인제군 북면 한계리 785',
                            tip: '야외 바베큐와 함께 밤하늘의 별을 감상해보세요.'
                        }
                    },
                    {
                        title: '2일차: 설악의 비경',
                        spots: [
                            {
                                name: '백담사',
                                description: '설악산 깊은 골짜기에 자리한 천년 고찰',
                                imageUrl: 'https://i.ibb.co/xMCjtkY/baekdamsa.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 인제군 북면 백담로 796',
                                tip: '백담사에서 십이선녀탕까지 이어지는 트레킹 코스도 추천합니다.'
                            },
                            {
                                name: '십이선녀탕',
                                description: '설악산 계곡에 위치한 12개의 아름다운 소와 담',
                                imageUrl: 'https://i.ibb.co/YQvzZd0/12-fairy-pools.jpg',
                                type: 'nature',
                                recommendedTime: '3시간',
                                address: '강원도 인제군 북면 백담로',
                                tip: '백담사에서 시작하는 트레킹 코스를 따라 가면 됩니다. 적절한 등산화와 간식을 준비하세요.'
                            }
                        ],
                        foods: [
                            {
                                name: '백담촌',
                                menu: '산채정식',
                                description: '설악산 자락에서 자란 신선한 산나물로 만든 건강식',
                                address: '강원도 인제군 북면 백담로 600',
                                recommendedMenu: '산채비빔밥, 더덕구이'
                            }
                        ],
                        accommodation: {
                            name: '내설악 펜션',
                            description: '설악산과 계곡이 보이는 아름다운 전망의 펜션',
                            address: '강원도 인제군 북면 한계리 745',
                            tip: '객실 테라스에서 설악산 풍경을 감상하며 힐링하세요.'
                        }
                    },
                    {
                        title: '3일차: 액티비티 & 체험',
                        spots: [
                            {
                                name: '내린천 래프팅',
                                description: '국내 최고의 래프팅 명소로 꼽히는 내린천에서의 짜릿한 액티비티',
                                imageUrl: 'https://i.ibb.co/VmvQLk8/rafting.jpg',
                                type: 'activity',
                                recommendedTime: '3시간',
                                address: '강원도 인제군 인제읍 내린천로',
                                tip: '여름철 래프팅 성수기에 방문하는 것이 좋습니다. 사전 예약 필수!'
                            },
                            {
                                name: '방동약수',
                                description: '100년 전통의 유명한 약수터로 철분이 풍부한 탄산약수',
                                imageUrl: 'https://i.ibb.co/d041wqj/bangdong-mineral-water.jpg',
                                type: 'nature',
                                recommendedTime: '1시간',
                                address: '강원도 인제군 남면 방동약수길 499',
                                tip: '약수를 마셔보고 빈 물병을 가져가면 약수를 담아갈 수 있습니다.'
                            },
                            {
                                name: '인제 빙어축제 체험장',
                                description: '겨울철 인제의 대표 축제인 빙어축제의 체험을 연중 즐길 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/M8wD40B/smelt-festival.jpg',
                                type: 'activity',
                                recommendedTime: '2시간',
                                address: '강원도 인제군 남면 소양강로 354',
                                tip: '여름에도 실내에서 빙어 체험이 가능합니다. 가족 단위 관광객에게 인기!'
                            }
                        ],
                        foods: [
                            {
                                name: '인제 맑은터',
                                menu: '송어회, 민물고기 요리',
                                description: '내린천에서 잡히는 신선한 민물고기 요리 전문점',
                                address: '강원도 인제군 인제읍 내린천로 72',
                                recommendedMenu: '송어회, 송어구이'
                            }
                        ],
                        accommodation: {
                            name: '내린천 펜션',
                            description: '맑은 내린천이 흐르는 곳에 위치한 아늑한 펜션',
                            address: '강원도 인제군 인제읍 내린천로 130',
                            tip: '계곡 소리를 들으며 잠들 수 있는 힐링 숙소입니다.'
                        }
                    },
                    {
                        title: '4일차: 문화 & 역사',
                        spots: [
                            {
                                name: '인제 산촌민속박물관',
                                description: '산촌 지역 주민들의 생활 모습과 문화를 엿볼 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/pX9cbLG/folklore-museum.jpg',
                                type: 'culture',
                                recommendedTime: '2시간',
                                address: '강원도 인제군 인제읍 인제로156번길 50',
                                tip: '전통 문화 체험 프로그램에 참여해보세요.'
                            },
                            {
                                name: '용대리 황태마을',
                                description: '인제 황태의 본고장으로 황태 덕장을 볼 수 있는 곳',
                                imageUrl: 'https://i.ibb.co/4mGj885/yellow-corvina-village.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 인제군 북면 용대리',
                                tip: '황태 제조 과정을 직접 볼 수 있고, 시음과 구매도 가능합니다.'
                            },
                            {
                                name: '만해마을',
                                description: '독립운동가이자 시인인 만해 한용운 스님을 기리는 문화공간',
                                imageUrl: 'https://i.ibb.co/NLhgJLK/manhae-village.jpg',
                                type: 'culture',
                                recommendedTime: '1시간 30분',
                                address: '강원도 인제군 북면 만해로 91',
                                tip: '만해의 시와 사상을 배울 수 있는 문학 기행지입니다.'
                            }
                        ],
                        foods: [
                            {
                                name: '인제 토속음식점',
                                menu: '토속음식',
                                description: '인제 지역의 신선한 식재료로 만든 향토 음식',
                                address: '강원도 인제군 인제읍 인제로 140',
                                recommendedMenu: '메밀전, 도토리묵, 산채비빔밥'
                            }
                        ]
                    }
                ]
            }
        }
    },

    // 함수 및 유틸리티
    getGangwonRegions: function() {
        return [1, 2, 5]; // 현재 구현된 강원도 지역 ID (고성군, 양구군, 인제군)
    },

    getCourseTypes: function() {
        return ['short', 'long']; // 코스 유형 (short: 1박 2일, long: 3박 4일)
    },

    // 특정 지역의 여행 코스 정보 가져오기
    getCourseInfo: function(regionId, courseType) {
        if (this[regionId] && this[regionId].courses && this[regionId].courses[courseType]) {
            return this[regionId].courses[courseType];
        }
        return null;
    },

    // 지역 이름 가져오기
    getRegionName: function(regionId) {
        if (this[regionId]) {
            return this[regionId].regionName;
        }
        return null;
    },

    // 강원도 지역인지 확인
    isGangwonRegion: function(regionId) {
        return this.getGangwonRegions().includes(parseInt(regionId));
    }
};
/**
 * 여행 코스 추천 기능 구현 및 UI 처리
 */

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 여행 추천 기능 초기화
    initTravelRecommendation();

    // 스타일 추가
    addTravelCoursesStyles();
});

// 여행 추천 기능 초기화
function initTravelRecommendation() {
    // 강원도 지역 정보가 표시될 때 여행 코스 추천 버튼 추가
    document.addEventListener('regionModalOpened', function(e) {
        const regionId = e.detail.regionId;

        // 강원도 지역인지 확인
        if (travelCourses.isGangwonRegion(parseInt(regionId))) {
            addTravelRecommendButton(regionId);
        }
    });
}

// 여행 코스 추천 버튼 추가
function addTravelRecommendButton(regionId) {
    // 이미 버튼이 있으면 제거
    const existingBtn = document.getElementById('travel-recommend-btn');
    if (existingBtn) {
        existingBtn.remove();
    }

    // 모달 내 버튼 추가 위치 찾기
    const btnContainer = document.querySelector('#regionModal .modal-body .row:first-child .col-md-6:nth-child(2) .mt-3');

    if (btnContainer) {
        // 여행 코스 추천 버튼 생성
        const travelBtn = document.createElement('button');
        travelBtn.id = 'travel-recommend-btn';
        travelBtn.className = 'btn btn-info mt-2 w-100';
        travelBtn.innerHTML = '<i class="fas fa-route"></i> 여행 코스 추천 (강원도 베타)';

        // 클릭 이벤트 추가
        travelBtn.addEventListener('click', function() {
            showTravelCoursesModal(regionId);
        });

        // 버튼 추가
        btnContainer.appendChild(travelBtn);
    }
}

// 여행 코스 모달 표시
function showTravelCoursesModal(regionId) {
    // 기존 모달이 있으면 제거
    let existingModal = document.getElementById('travelCoursesModal');
    if (existingModal) {
        existingModal.remove();
    }

    // 지역 이름 가져오기
    const regionName = travelCourses.getRegionName(regionId);

    // 모달 생성
    const modalHTML = `
    <div class="modal fade" id="travelCoursesModal" tabindex="-1" aria-labelledby="travelCoursesModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title" id="travelCoursesModalLabel">${regionName} 여행 코스 추천</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center mb-4">
                        <div class="btn-group" role="group" aria-label="여행 코스 유형">
                            <button type="button" class="btn btn-outline-primary active" id="short-course-btn">1박 2일 코스</button>
                            <button type="button" class="btn btn-outline-primary" id="long-course-btn">3박 4일 코스</button>
                        </div>
                    </div>
                    
                    <div id="course-container">
                        <!-- 여행 코스 정보가 여기에 동적으로 추가됨 -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>
    `;

    // 모달 추가
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 모달 객체 생성
    const travelModal = new bootstrap.Modal(document.getElementById('travelCoursesModal'));

    // 코스 유형 버튼 이벤트 설정
    document.getElementById('short-course-btn').addEventListener('click', function() {
        document.getElementById('short-course-btn').classList.add('active');
        document.getElementById('long-course-btn').classList.remove('active');
        renderTravelCourse(regionId, 'short');
    });

    document.getElementById('long-course-btn').addEventListener('click', function() {
        document.getElementById('short-course-btn').classList.remove('active');
        document.getElementById('long-course-btn').classList.add('active');
        renderTravelCourse(regionId, 'long');
    });

    // 초기 1박 2일 코스 렌더링
    renderTravelCourse(regionId, 'short');

    // 모달 표시
    travelModal.show();
}

// 여행 코스 렌더링
function renderTravelCourse(regionId, courseType) {
    const container = document.getElementById('course-container');
    const courseInfo = travelCourses.getCourseInfo(regionId, courseType);

    if (!courseInfo) {
        container.innerHTML = '<div class="alert alert-warning">해당 지역의 여행 코스 정보가 없습니다.</div>';
        return;
    }

    // 코스 기본 정보
    let html = `
    <div class="course-header mb-4">
        <h3 class="course-title text-center">${courseInfo.title}</h3>
        <p class="course-description text-center text-muted">${courseInfo.description}</p>
    </div>`;

    // 날짜별 코스 정보
    courseInfo.days.forEach((day, index) => {
        html += `
        <div class="card mb-4 day-card">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">${day.title}</h5>
            </div>
            <div class="card-body">
                <!-- 관광지 정보 -->
                <h6 class="card-subtitle mb-3"><i class="fas fa-map-marker-alt text-danger"></i> 추천 관광지</h6>
                <div class="row spots-container mb-4">
                    ${renderSpots(day.spots)}
                </div>
                
                <!-- 식당 정보 -->
                <h6 class="card-subtitle mb-3"><i class="fas fa-utensils text-success"></i> 추천 맛집</h6>
                <div class="row foods-container mb-4">
                    ${renderFoods(day.foods)}
                </div>
                
                <!-- 숙소 정보 (마지막 날 제외) -->
                ${day.accommodation ? renderAccommodation(day.accommodation) : ''}
            </div>
        </div>`;
    });

    // 여행 일정표 다운로드 버튼 (실제 구현은 생략)
    html += `
    <div class="text-center mb-3">
        <button class="btn btn-outline-secondary" onclick="alert('일정표 다운로드 기능은 준비 중입니다.')">
            <i class="fas fa-download"></i> 여행 일정표 다운로드
        </button>
    </div>`;

    container.innerHTML = html;
}

// 관광지 정보 렌더링
/**
 * travel.js - 소멸예보제 여행 코스 추천 기능 (아이콘 버전)
 */

// 여행 코스 데이터 (강원도 지역만 포함) - 기존 데이터는 그대로 유지

// ...

// 관광지 정보 렌더링 - 이미지 대신 아이콘 사용
function renderSpots(spots) {
    let html = '';

    spots.forEach(spot => {
        // 관광지 유형에 따른 아이콘 및 색상 설정
        let typeIcon = '';
        let iconClass = '';
        let bgColor = '';

        switch(spot.type) {
            case 'nature':
                typeIcon = '<i class="fas fa-tree fa-3x mb-3"></i>';
                iconClass = 'text-success';
                bgColor = 'bg-light';
                break;
            case 'culture':
                typeIcon = '<i class="fas fa-landmark fa-3x mb-3"></i>';
                iconClass = 'text-primary';
                bgColor = 'bg-light';
                break;
            case 'activity':
                typeIcon = '<i class="fas fa-hiking fa-3x mb-3"></i>';
                iconClass = 'text-warning';
                bgColor = 'bg-light';
                break;
            case 'history':
                typeIcon = '<i class="fas fa-university fa-3x mb-3"></i>';
                iconClass = 'text-secondary';
                bgColor = 'bg-light';
                break;
            default:
                typeIcon = '<i class="fas fa-map-marker-alt fa-3x mb-3"></i>';
                iconClass = 'text-danger';
                bgColor = 'bg-light';
        }

        html += `
        <div class="col-md-4 mb-3">
            <div class="card h-100 spot-card">
                <div class="card-body text-center">
                    <div class="spot-icon-container ${bgColor} py-4 rounded mb-3">
                        <div class="${iconClass}">${typeIcon}</div>
                    </div>
                    <h6 class="card-title">${spot.name}</h6>
                    <p class="card-text small">${spot.description}</p>
                    <p class="card-text small text-muted">
                        <i class="fas fa-clock"></i> 추천 소요시간: ${spot.recommendedTime}<br>
                        <i class="fas fa-map-marker-alt"></i> 주소: ${spot.address}
                    </p>
                </div>
                <div class="card-footer bg-light">
                    <small class="text-muted"><i class="fas fa-lightbulb text-warning"></i> Tip: ${spot.tip}</small>
                </div>
            </div>
        </div>`;
    });

    return html;
}

// 식당 정보 렌더링 - 아이콘 추가
function renderFoods(foods) {
    let html = '';

    foods.forEach(food => {
        html += `
        <div class="col-md-4 mb-3">
            <div class="card h-100 food-card">
                <div class="card-body text-center">
                    <div class="food-icon-container bg-light py-4 rounded mb-3">
                        <div class="text-success"><i class="fas fa-utensils fa-3x mb-3"></i></div>
                    </div>
                    <h6 class="card-title">${food.name}</h6>
                    <p class="card-text small">${food.description}</p>
                    <p class="card-text small text-muted">
                        <i class="fas fa-utensils"></i> 추천 메뉴: ${food.recommendedMenu}<br>
                        <i class="fas fa-map-marker-alt"></i> 주소: ${food.address}
                    </p>
                </div>
            </div>
        </div>`;
    });

    return html;
}

// 숙소 정보 렌더링 - 아이콘 추가
function renderAccommodation(accommodation) {
    return `
    <h6 class="card-subtitle mb-3"><i class="fas fa-bed text-info"></i> 추천 숙소</h6>
    <div class="row accommodation-container">
        <div class="col-md-4 mb-3">
            <div class="card h-100 accommodation-card">
                <div class="card-body text-center">
                    <div class="accommodation-icon-container bg-light py-4 rounded mb-3">
                        <div class="text-info"><i class="fas fa-bed fa-3x mb-3"></i></div>
                    </div>
                    <h6 class="card-title">${accommodation.name}</h6>
                    <p class="card-text small">${accommodation.description}</p>
                    <p class="card-text small text-muted">
                        <i class="fas fa-map-marker-alt"></i> 주소: ${accommodation.address}
                    </p>
                </div>
                <div class="card-footer bg-light">
                    <small class="text-muted"><i class="fas fa-lightbulb text-warning"></i> Tip: ${accommodation.tip}</small>
                </div>
            </div>
        </div>
    </div>`;
}

// 여행 코스 CSS 스타일 추가
function addTravelCoursesStyles() {
    const styleElement = document.createElement('style');
    styleElement.id = 'travel-courses-styles';
    styleElement.innerHTML = `
    /* 여행 코스 모달 스타일 */
    #travelCoursesModal .modal-xl {
        max-width: 90%;
    }
    
    .day-card {
        border-left: 4px solid #0d6efd;
    }
    
    .spot-card, .food-card, .accommodation-card {
        transition: transform 0.3s;
    }
    
    .spot-card:hover, .food-card:hover, .accommodation-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .spot-icon-container, .food-icon-container, .accommodation-icon-container {
        border-radius: 8px;
        transition: all 0.3s;
    }
    
    .spot-card:hover .spot-icon-container,
    .food-card:hover .food-icon-container,
    .accommodation-card:hover .accommodation-icon-container {
        transform: scale(1.05);
    }
    
    .food-card {
        background-color: #f8f9fa;
    }
    
    .accommodation-card {
        background-color: #e9f7fd;
    }
    
    @media (max-width: 768px) {
        #travelCoursesModal .modal-xl {
            max-width: 100%;
        }
        
        .fa-3x {
            font-size: 2em !important;
        }
    }
    `;

    // 스타일이 아직 추가되지 않았다면 추가
    if (!document.getElementById('travel-courses-styles')) {
        document.head.appendChild(styleElement);
    }
}

// 이벤트 발생 시 여행 코스 추천 기능 연결하기 위한 커스텀 이벤트
// 지역 모달이 열릴 때 발생시킬 이벤트 정의
function dispatchRegionModalOpenedEvent(regionId) {
    const event = new CustomEvent('regionModalOpened', {
        detail: { regionId: regionId }
    });
    document.dispatchEvent(event);
}

// map.js 파일의 showRegionDetails 함수를 수정하기 위한 코드
// 원본 함수를 저장
const originalShowRegionDetails = window.showRegionDetails;

// 함수 오버라이드
window.showRegionDetails = function(region) {
    // 원본 함수 호출
    originalShowRegionDetails(region);

    // 스타일 추가
    addTravelCoursesStyles();

    // 모달이 완전히 열린 후 이벤트 발생
    setTimeout(() => {
        dispatchRegionModalOpenedEvent(region.id);
    }, 500);
};