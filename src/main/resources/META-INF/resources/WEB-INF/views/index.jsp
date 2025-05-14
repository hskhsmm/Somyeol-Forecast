<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>소멸예보제 - 인구소멸 위험지역 예측 시스템</title>

    <!-- 부트스트랩 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- 나머지 코드는 동일 -->

    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

    <!-- 커스텀 CSS -->
    <link rel="stylesheet" href="/css/style.css">

    <!-- 폰트어썸 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<!-- 헤더 포함 -->
<jsp:include page="fragments/header.jsp" />

<main class="container-fluid p-0">
    <!-- 지도 컨테이너 -->
    <div class="position-relative">
        <div id="map-container" class="map-container"></div>

        <!-- 정보 패널 (데스크톱) -->
        <div class="info-panel d-none d-lg-block">
            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0">소멸예보제 정보</h5>
                </div>
                <div class="card-body">
                    <p>한국의 인구 감소 추세로 인한 지역 소멸 위험도를 시각화한 시스템입니다.</p>
                    <p>지도에서 색상으로 표시된 지역은 인구 5만 미만으로 소멸 위험이 있는 지역입니다.</p>
                    <div class="map-legend mt-3">
                        <div class="legend-item">
                            <span class="legend-color danger"></span>
                            <span>위험 (2100년 이전)</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color warning"></span>
                            <span>경고 (2100-2199년)</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color caution"></span>
                            <span>주의 (2200-2299년)</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color safe"></span>
                            <span>안전 (2300년 이후)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 모바일용 정보 패널 -->
    <div class="container d-block d-lg-none my-3">
        <div class="card">
            <div class="card-header bg-dark text-white">
                <h5 class="mb-0">소멸예보제 정보</h5>
            </div>
            <div class="card-body">
                <p>한국의 인구 감소 추세로 인한 지역 소멸 위험도를 시각화한 시스템입니다.</p>
                <p>지도에서 색상으로 표시된 지역은 인구 5만 미만으로 소멸 위험이 있는 지역입니다.</p>
                <div class="map-legend mt-3">
                    <div class="legend-item">
                        <span class="legend-color danger"></span>
                        <span>위험 (2100년 이전)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color warning"></span>
                        <span>경고 (2100-2199년)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color caution"></span>
                        <span>주의 (2200-2299년)</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color safe"></span>
                        <span>안전 (2300년 이후)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 북마크된 지역 섹션 -->
    <section class="container my-5">
        <h2 class="text-center mb-4">관심 지역</h2>
        <div id="bookmark-container" class="row g-4">
            <!-- 북마크된 지역이 여기에 동적으로 추가됩니다 -->
            <div class="col-12 text-center no-bookmarks">
                <p>아직 관심 지역이 없습니다. 지도에서 지역을 클릭하고 별표 아이콘을 클릭하여 관심 지역으로 등록해보세요.</p>
            </div>
        </div>
    </section>
</main>

<!-- 지역 상세 정보 모달 -->
<div class="modal fade" id="regionModal" tabindex="-1" aria-labelledby="regionModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="regionModalLabel">지역 정보</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div id="region-image-container">
                            <img id="region-image" src="" alt="지역 이미지" class="img-fluid rounded">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h4 id="region-name"></h4>
                        <p id="region-province" class="text-muted"></p>

                        <div class="alert" id="extinction-alert"></div>

                        <div class="mt-3">
                            <h5>인구 현황</h5>
                            <p>현재 인구: <span id="current-population"></span>명</p>
                            <p>50년 전 인구: <span id="past-population"></span>명</p>
                            <p>평균 감소율: <span id="decline-rate"></span>%</p>
                        </div>

                        <div class="mt-3">
                            <button id="bookmark-btn" class="btn btn-outline-warning">
                                <i class="far fa-star"></i> 관심 지역에 추가
                            </button>
                            <a id="region-website" href="#" target="_blank" class="btn btn-outline-primary ms-2">
                                <i class="fas fa-external-link-alt"></i> 공식 웹사이트
                            </a>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <h5>인구 변화 추이</h5>
                        <canvas id="population-chart"></canvas>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-header">특산물</div>
                            <div class="card-body">
                                <div class="text-center mb-2">
                                    <img id="specialty-image" src="" alt="특산물 이미지" class="img-fluid rounded specialty-img">
                                </div>
                                <p id="specialty-text" class="text-center"></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-header">축제</div>
                            <div class="card-body">
                                <p id="festival-text" class="text-center"></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100">
                            <div class="card-header">관광지</div>
                            <div class="card-body">
                                <p id="attraction-text" class="text-center"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>

<!-- 푸터 포함 -->
<jsp:include page="fragments/footer.jsp" />

<!-- 자바스크립트 -->
<!-- jQuery 추가 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- 부트스트랩 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- VWorld API -->
<script type="text/javascript" src="https://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=36A35D56-634F-374F-8F3E-D9A478BB684C"></script>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- 커스텀 자바스크립트 -->
<script src="/js/map.js"></script>
<script src="/js/chart.js"></script>
<script src="/js/bookmark.js"></script>
</body>
</html>