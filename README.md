# 🏙️ 소멸예보제 (City Disappearance Forecast System)

대한민국 **지방 인구 감소** 데이터를 기반으로, **도시 소멸 위험도**를 시각화해 제공하는 웹 애플리케이션입니다.  
20년치 인구 데이터를 분석해 소멸 예상 연도를 예측하고, 지역별 특산물, 축제, 관광지 정보도 함께 제공합니다.

---

## 주요 기능

| 기능명 | 설명 |
|--------|------|
| 🗺 지도 기반 시각화 | 인구 5만 미만 지역만 노란 음영으로 표시 (Leaflet.js) |
| 👆 지역 상세 보기 | 지역 클릭 시 팝업으로 상세 정보 및 예측 결과 표시 |
| 📉 인구 그래프 출력 | 20년간 인구 데이터를 선 그래프로 출력 (Chart.js) |
| ⛔ 소멸 시점 예측 | 연도별 인구 감소율을 기반으로 소멸 위험 연도 계산 |
| 🧳 지역 정보 카드 | 특산물, 축제, 관광지 정보를 카드형 UI로 제공 |
| ⭐ 즐겨찾기 기능 | localStorage를 이용해 관심 지역 저장 가능 (비로그인) |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | JSP, JavaScript, Bootstrap 5, Leaflet.js, Chart.js |
| **Backend** | Spring Boot 3.x, Spring Data JPA, Lombok |
| **Database** | MySQL (AWS RDS) |
| **배포 환경** | Docker, AWS EC2 |
| **기타 도구** | IntelliJ, GitHub, draw.io, dbdiagram.io |

---

## 프로젝트 구조 (Backend - DDD 기반)
````
src/
└── main/
    ├── java/com/somyeol/cityforecast/
    │   ├── CityForecastApplication.java
    │   ├── domain/
    │   │   ├── region/       # 지역 이름, 위도경도, 시도 등 처리
    │   │   ├── population/   # 연도별 인구 통계 처리
    │   │   ├── forecast/     # 소멸 위험 예측 처리
    │   │   ├── info/         # 지역 설명 및 부가 정보
    │   │   └── search/       # 검색 기능
    │   └── global/           # 공통 설정 및 유틸
    └── resources/
        ├── static/js/        # JS 시각화 (지도, 차트, 북마크 등)
        └── templates/        # JSP 뷰


````


## ERD

![somyeolERD](https://github.com/user-attachments/assets/1f795970-f2c6-4924-ba12-89bd428dd15c)
<br>
<br>
## 아키텍처

![somyeol_architecture](https://github.com/user-attachments/assets/e70ba20f-8ab3-4719-af6c-e247fff61556)
