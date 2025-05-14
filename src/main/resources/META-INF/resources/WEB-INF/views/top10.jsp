<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TOP 10 소멸 위험 지역 - 소멸예보제</title>

    <!-- 부트스트랩 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- 나머지 코드는 동일 -->

    <!-- 커스텀 CSS -->
    <link rel="stylesheet" href="/static/css/style.css">

    <!-- 폰트어썸 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<!-- 헤더 포함 -->
<jsp:include page="fragments/header.jsp" />

<main class="container mt-5">
    <div class="row mb-4">
        <div class="col-12">
            <h1 class="text-center mb-4">인구 감소율 TOP 10 지역</h1>
            <p class="text-center lead">인구 감소율이 가장 높은 10개 지역의 정보를 제공합니다.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-8">
            <!-- 그래프 영역 -->
            <div class="card mb-4">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0">인구 감소율 비교</h5>
                </div>
                <div class="card-body">
                    <canvas id="top10-chart" height="400"></canvas>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <!-- 설명 영역 -->
            <div class="card mb-4">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0">위험도 분포</h5>
                </div>
                <div class="card-body">
                    <canvas id="risk-pie-chart" height="220"></canvas>
                </div>
            </div>

            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0">정보</h5>
                </div>
                <div class="card-body">
                    <p>인구 감소율은 50년 전 대비 현재 인구의 연평균 감소율을 나타냅니다.</p>
                    <p>색상은 지역의 소멸 위험도를 나타냅니다:</p>
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

    <!-- 상세 테이블 -->
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0">TOP 10 상세 정보</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover mb-0">
                            <thead class="table-dark">
                            <tr>
                                <th>순위</th>
                                <th>지역</th>
                                <th>도/광역시</th>
                                <th>현재 인구</th>
                                <th>50년 전 인구</th>
                                <th>감소율 (%)</th>
                                <th>소멸 예상 연도</th>
                                <th>위험도</th>
                                <th>상세</th>
                            </tr>
                            </thead>
                            <tbody id="top10-table-body">
                            <!-- 데이터가 여기에 동적으로 추가됩니다 -->
                            <tr>
                                <td colspan="9" class="text-center py-4">데이터를 불러오는 중입니다...</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- 지역 상세 정보 모달 (index.jsp와 동일) -->
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

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- 커스텀 자바스크립트 -->
<script src="/static/js/chart.js"></script>
<script src="/static/js/bookmark.js"></script>
<script src="/static/js/top10.js"></script>
</body>
</html>