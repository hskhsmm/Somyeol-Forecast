# 🏙️ 소멸예보제 (City Disappearance Forecast System)

대한민국 **지방 인구 감소** 데이터를 기반으로, **도시 소멸 위험도**를 시각화해 제공하는 웹 애플리케이션입니다.  
50년치 인구 데이터를 분석해 소멸 예상 연도를 예측하고, 지역별 특산물, 축제, 관광지 정보도 함께 제공합니다.

---

## 주요 기능

| 기능명             | 설명                                   |
|------------------|--------------------------------------|
| 🗺 지도 기반 시각화     | 인구 5만 미만 지역만 노란 음영으로 표시 (Leaflet.js) |
| 👆 지역 상세 보기      | 지역 클릭 시 팝업으로 상세 정보 및 예측 결과 표시        |
| 📉 인구 그래프 출력    | 50년간 인구 데이터를 선 그래프로 출력 (Chart.js)    |
| ⛔ 소멸 시점 예측      | 연도별 인구 감소율을 기반으로 소멸 위험 연도 계산         |
| 🧳 지역 정보 카드     | 특산물, 축제, 관광지 정보를 카드형 UI로 제공          |
| ⭐ 즐겨찾기 기능       | localStorage를 이용해 관심 지역 저장 가능 (비로그인) |

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

## 프로젝트 구조 (Backend)

````
src/
└── main/
    ├── java/com/somyeol/cityforecast/
    │   ├── CityForecastApplication.java
    │   ├── domain/
    │   │   ├── region/              # 지역 기본 정보 엔티티/서비스/컨트롤러
    │   │   │   ├── controller/
    │   │   │   │   └── RegionController.java
    │   │   │   ├── dto/
    │   │   │   │   └── RegionResponseDto.java
    │   │   │   ├── entity/
    │   │   │   │   └── Region.java
    │   │   │   ├── repository/
    │   │   │   │   └── RegionRepository.java
    │   │   │   └── service/
    │   │   │       ├── RegionService.java
    │   │   │       └── RegionDataInitializer.java
    │   │   └── regioninfo/          # 지역 특산물/축제/관광지 정보
    │   │       ├── dto/
    │   │       │   └── RegionInfoDto.java
    │   │       ├── entity/
    │   │       │   └── RegionInfo.java
    │   │       ├── repository/
    │   │       │   └── RegionInfoRepository.java
    │   │       └── service/
    │   │           └── RegionInfoService.java
    │   ├── global/
    │   │   ├── config/
    │   │   │   └── WebConfig.java    # 웹 설정
    │   │   ├── exception/
    │   │   │   ├── GlobalExceptionHandler.java
    │   │   │   ├── ErrorResponse.java
    │   │   │   └── ResourceNotFoundException.java
    │   │   └── base/
    │   │       └── BaseTimeEntity.java
    │   └── web/
    │       └── HomeController.java   # JSP 뷰 컨트롤러
    ├── resources/
    │   ├── META-INF/
    │   │   └── resources/
    │   │       └── WEB-INF/
    │   │           └── views/        # JSP 파일 위치 (Spring Boot JAR 패키징에 필요)
    │   │               ├── index.jsp # 메인 페이지
    │   │               ├── top10.jsp # TOP10 페이지
    │   │               └── fragments/
    │   │                   ├── header.jsp
    │   │                   └── footer.jsp
    │   ├── static/
    │   │   ├── js/
    │   │   │   ├── map.js          # Leaflet 기반 지도 렌더링
    │   │   │   ├── chart.js        # Chart.js 그래프
    │   │   │   ├── bookmark.js     # 즐겨찾기 기능
    │   │   │   └── top10.js        # TOP10 페이지 JavaScript
    │   │   └── css/
    │   │       └── style.css
    │   ├── data/
    │   │   ├── population_data.csv # 지역 기본 정보 CSV
    │   │   └── region_info.tsv     # 특산물/축제/관광지 TSV
    │   └── application.yml         # DB 및 서버 설정
    └── webapp/                     # 참고용 (실제 JSP 파일은 META-INF/resources/에 있음)

간소화                    
src/main/java/com/somyeol/cityforecast/
├── domain/
│   ├── region/
│   │   ├── controller/RegionController.java
│   │   ├── dto/RegionResponseDto.java
│   │   ├── entity/Region.java
│   │   ├── repository/RegionRepository.java
│   │   └── service/
│   │       ├── RegionService.java
│   │       └── RegionDataInitializer.java
│   └── regioninfo/
│       ├── dto/RegionInfoDto.java
│       ├── entity/RegionInfo.java
│       ├── repository/RegionInfoRepository.java
│       └── service/RegionInfoService.java
└── global/
    ├── base/BaseTimeEntity.java
    ├── config/WebConfig.java
    └── exception/
        ├── ErrorResponse.java
        ├── GlobalExceptionHandler.java
        └── ResourceNotFoundException.java                    

````

## ERD

![스크린샷 2025-05-13 122857](https://github.com/user-attachments/assets/d54d29ca-37cb-4886-b121-150eea127c84)




<br>
<br>


## Architecture

![somyeol_architecture](https://github.com/user-attachments/assets/277cadd0-0f57-4f7e-a5c5-1b8455f1c705)



