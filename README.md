# 🏙️ 소멸예보제 (City Disappearance Forecast System)
대한민국 **지방 인구 감소** 데이터를 기반으로, **도시 소멸 위험도**를 시각화해 제공하는 웹 애플리케이션입니다.  
50년치 인구 데이터를 분석해 소멸 예상 연도를 예측하고, 지역별 특산물, 축제, 관광지 정보도 함께 제공합니다.

---

## 📊 프로젝트 소개

한국은 급속한 고령화와 저출산으로 인해 지방 인구 감소 문제가 심각해지고 있습니다. 소멸예보제는 이러한 인구 데이터를 분석하여 각 지역의 소멸 위험도를 시각화하고, 소멸 예상 시점을 예측합니다. 또한 지역 활성화를 위한 특산물, 축제, 관광지 정보를 함께 제공하여 지방 소멸 문제에 대한 인식을 높이고자 합니다.


### 개발 기간
(2025. 05. 09 ~ 2025. 05. 18)
<br>

### 주요 기능

- **인구 감소율 기반 소멸 예측**: 50년간의 인구 데이터를 바탕으로 각 지역의 소멸 예상 연도 계산
- **위험도 시각화**: 4단계(위험, 경고, 주의, 안전)로 소멸 위험도 표시
- **인터랙티브 지도**: 한국 전역의 소멸 위험 지역을 한눈에 확인
- **TOP 10 분석**: 인구 감소율이 가장 높은 10개 지역 분석 및 그래프 제공
- **지역 상세 정보**: 각 지역의 특산물, 축제, 관광지 정보 제공
- **관심 지역 관리**: 원하는 지역을 북마크하여 쉽게 접근
- **강원도 지역 한정(베타테스트)**: 1박 2일 or 3박 4일 여행 코스 제공
<br><br>
## 🖼️ 스크린샷

### 메인 지도 화면
![image](https://github.com/user-attachments/assets/7aa2d989-88d3-4d01-b732-09deddaa3cd1)
<br>
![image](https://github.com/user-attachments/assets/2f071d17-2a0a-44da-8173-1cf602c3235e)
<br><br><br>



### 지역 상세 정보
![image](https://github.com/user-attachments/assets/f3d88e2c-f2f0-443a-a66d-7907a3263263)

<br><br><br>
### TOP 10 분석 화면
![image](https://github.com/user-attachments/assets/d074cc2f-2018-4510-ba99-84d1531a336c)
<br>
![image](https://github.com/user-attachments/assets/bff2b57f-2434-46a6-9ea6-ce9f2c372058)

<br><br><br>
### 여행 코스 제공 화면(ex. 양구 1박 2일 코스)
![image](https://github.com/user-attachments/assets/c5cebf9b-37bc-4246-931c-6cf825a7830b)
<br>
![image](https://github.com/user-attachments/assets/07bedef6-bbe2-4b7c-a222-46d56b7768f8)
<br>
![image](https://github.com/user-attachments/assets/25a8ad7c-5b24-4d53-857e-659774c42d1f)
<br>
![image](https://github.com/user-attachments/assets/e9c90131-f63e-4e3b-b081-898440b25387)



<br><br><br>
### 북마크 기능
![image](https://github.com/user-attachments/assets/0efdee1d-60f7-48f7-b542-0af090567ffe)

## 🌟 주요 특징

### 1. 소멸 위험도 분류 시스템

소멸 예상 연도에 따라 네 가지 위험도로 분류합니다:

- **🔴 위험 (Danger)**: 2100년 이전 소멸 예상
- **🟡 경고 (Warning)**: 2100-2199년 소멸 예상
- **🔵 주의 (Caution)**: 2200-2299년 소멸 예상
- **🟢 안전 (Safe)**: 2300년 이후 소멸 예상

### 2. 예측 알고리즘

- 50년간의 인구 감소 추세를 분석하여 평균 감소율 계산
- 현재 인구와 감소율을 기반으로 소멸 예상 시점 도출
- 인구 변화 추이를 차트로 시각화하여 직관적인 이해 지원

### 3. 지역 활성화 정보

각 지역의 고유한 매력을 알리기 위한 정보 제공:
- 지역 특산물 정보
- 대표 축제 정보
- 주요 관광지 정보

## 💻 기술 스택

- **백엔드**: Spring Boot, JPA/Hibernate, MySQL
- **프론트엔드**: HTML5, CSS3, JavaScript, Bootstrap 5
- **지도 시각화**: Leaflet.js, VWorld API
- **차트 & 그래프**: Chart.js
- **데이터 분석**: Java 데이터 처리

## 📱 반응형 디자인

PC부터 모바일까지 다양한 디바이스에서 최적화된 경험을 제공합니다:
- 데스크톱: 고해상도 지도와 상세 정보 패널
- 태블릿: 조정된 레이아웃으로 쉬운 탐색
- 모바일: 터치 친화적 인터페이스와 접근성 향상

## 🌱 추후 수정할 부분

- 인구 통계 데이터 실시간 업데이트
- 인구 소멸 대응 방안 정보 제공
- 지역별 귀농/귀촌 정보 연계
- 사용자 참여형 지역 정보 업데이트
- 지역 힐링 코스 계획 전국적으로 확대

## 📝 데이터 출처

- 인구 데이터: 국가통계포털 (KOSIS)
- 지도 API: VWorld
- 지역 정보: 각 지자체 공식 웹사이트



## 🔍 프로젝트 목적

소멸예보제를 통해 많은 지역이 처한 현실을 직시하고 함께 해결책을 모색하는 계기가 되기를 바랍니다.
