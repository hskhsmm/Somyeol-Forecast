<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>소멸예보제 - 대한민국 지방 도시 소멸 위험도 시각화</title>

    <!-- 파비콘 -->
    <link rel="icon" href="/static/favicon.ico" type="image/x-icon">

    <!-- 부트스트랩 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- 구글 머티리얼 아이콘 -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- 폰트어썸 아이콘 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">

    <!-- 프리텐다드 폰트 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">

    <!-- 커스텀 CSS -->
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
<!-- 로딩 스피너 -->
<div class="loading-container" id="loadingSpinner">
    <div class="spinner-border text-danger loading-spinner" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>

<!-- 헤더 포함 -->
<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/fragments/header.jsp" />

<!-- 메인 컨텐츠 -->
<main class="main-container">
    <!-- 지도 컨테이너 -->
    <div id="map-container" class="mb-4">
        <!-- 지도가 로드되기 전 표시될 플레이스홀더 -->
        <div class="map-placeholder">
            <span class="material-icons">map</span>
            <p>지도를 불러오는 중입니다...</p>
        </div>
    </div>

    <!-- 범례 섹션 -->
    <div class="container mb-4">
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="card-title mb-3">
                    <span class="material-icons align-middle me-2">info</span>
                    소멸 위험도 범례
                </h5>
                <div class="row">
                    <div class="col-md-3 col-6 mb-2">
                        <div class="d-flex align-items-center">
                            <span class="risk-badge danger me-2"></span>
                            <span>위험 (2100년 이전)</span>
                        </div>
                    </div>
                    <div class="col-md-3 col-6 mb-2">
                        <div class="d-flex align-items-center">
                            <span class="risk-badge warning me-2"></span>
                            <span>주의 (2100-2199년)</span>
                        </div>
                    </div>
                    <div class="col-md-3 col-6 mb-2">
                        <div class="d-flex align-items-center">
                            <span class="risk-badge caution me-2"></span>
                            <span>경고 (2200-2299년)</span>
                        </div>
                    </div>
                    <div class="col-md-3 col-6 mb-2">
                        <div class="d-flex align-items-center">
                            <span class="risk-badge safe me-2"></span>
                            <span>안전 (2300년 이후)</span>
                        </div>
                    </div>
                </div>
                <p class="text-muted mt-2 mb-0 small">
                    * 인구 5만명 미만 지역만 표시됩니다. 소멸 연도는 현재 인구 감소 추세를 기반으로 예측한 값입니다.
                </p>
            </div>
        </div>
    </div>

    <!-- 상위 10개 위험 지역 섹션 -->
    <section class="region-info-section py-5 bg-light">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="mb-0">
                    <span class="material-icons align-middle me-2 text-danger">warning</span>
                    인구 감소율 상위 10개 지역
                </h2>
                <a href="/top10" class="btn btn-outline-danger btn-sm">
                    상세보기 <span class="material-icons align-middle fs-6">arrow_forward</span>
                </a>
            </div>

            <div class="row" id="top10Container">
                <!-- 카드 로딩 플레이스홀더 -->
                <div class="col-md-4 mb-4">
                    <div class="card region-card shadow-sm">
                        <div class="card-body text-center py-5">
                            <div class="spinner-border text-secondary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p class="mt-3 text-muted">데이터를 불러오는 중입니다...</p>
                        </div>
                    </div>
                </div>
                <!-- 실제 카드는 JavaScript로 동적 생성됩니다 -->
            </div>
        </div>
    </section>

    <!-- 프로젝트 정보 섹션 -->
    <section class="py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <h2 class="mb-4">소멸예보제 프로젝트</h2>
                    <p class="lead mb-4">
                        대한민국 지방 도시의 인구 감소 추세를 분석하여 미래 도시 소멸 위험도를 시각화합니다.
                    </p>
                    <p>
                        소멸예보제는 현재 인구 추세를 바탕으로 각 지역의 소멸 가능성을 예측합니다. 인구 감소율이
                        지속될 경우, 일부 지역은 2100년 이전에 소멸 위험에 직면할 수 있습니다.
                    </p>
                    <p>
                        지도에서 각 지역을 클릭하면 인구 변화 추세, 특산물, 관광지, 축제 등 다양한 정보를 확인할 수 있습니다.
                    </p>
                    <button class="btn btn-danger mt-3" data-bs-toggle="modal" data-bs-target="#aboutModal">
                        프로젝트 자세히 알아보기
                    </button>
                </div>
                <div class="col-lg-6">
                    <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
                        <div class="card-body p-0">
                            <div class="row g-0">
                                <div class="col-6 p-4 border-end">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <span class="material-icons text-danger mb-3" style="font-size: 3rem;">trending_down</span>
                                        <h4 class="mb-2">57개</h4>
                                        <p class="text-muted mb-0">분석 대상 지역</p>
                                    </div>
                                </div>
                                <div class="col-6 p-4">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <span class="material-icons text-warning mb-3" style="font-size: 3rem;">warning</span>
                                        <h4 class="mb-2">2100년</h4>
                                        <p class="text-muted mb-0">위험 기준점</p>
                                    </div>
                                </div>
                                <div class="col-6 p-4 border-end border-top">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <span class="material-icons text-success mb-3" style="font-size: 3rem;">show_chart</span>
                                        <h4 class="mb-2">50년</h4>
                                        <p class="text-muted mb-0">데이터 분석 기간</p>
                                    </div>
                                </div>
                                <div class="col-6 p-4 border-top">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <span class="material-icons text-primary mb-3" style="font-size: 3rem;">public</span>
                                        <h4 class="mb-2">인구 5만↓</h4>
                                        <p class="text-muted mb-0">분석 기준</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<!-- 상단으로 이동 버튼 -->
<div class="scroll-to-top" id="scrollTopBtn">
    <span class="material-icons">arrow_upward</span>
</div>

<!-- 지역 상세 정보 모달 (JavaScript로 동적 생성) -->
<div class="modal fade region-modal" id="regionDetailModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <!-- 모달 내용은 JavaScript로 동적 생성됩니다 -->
        </div>
    </div>
</div>

<!-- 즐겨찾기 모달 -->
<div class="modal fade" id="bookmarkModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-warning text-white">
                <h5 class="modal-title">
                    <span class="material-icons align-middle me-2">bookmarks</span>
                    즐겨찾기한 지역
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="bookmarkContainer">
                    <!-- 즐겨찾기 항목은 JavaScript로 동적 생성됩니다 -->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                <button type="button" class="btn btn-danger" id="clearBookmarksBtn">모두 삭제</button>
            </div>
        </div>
    </div>
</div>

<!-- 푸터 포함 -->
<jsp:include page="${pageContext.request.contextPath}/WEB-INF/views/fragments/footer.jsp" />
<!-- 부트스트랩 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- 커스텀 JS -->
<script src="/static/js/map.js"></script>
<script src="/static/js/chart.js"></script>
<script src="/static/js/bookmark.js"></script>

<script>
    // 페이지 로드 완료 후 로딩 스피너 숨기기
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('loadingSpinner').style.display = 'none';
        }, 500);
    });

    // 상위 10개 지역 데이터 로드
    document.addEventListener('DOMContentLoaded', function() {
        loadTop10Regions();
    });

    // 상단으로 스크롤 버튼
    window.addEventListener('scroll', function() {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    document.getElementById('scrollTopBtn').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 상위 10개 지역 데이터 로드 함수
    function loadTop10Regions() {
        fetch('/api/regions/top10')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('top10Container');
                container.innerHTML = ''; // 기존 내용 비우기

                // 상위 3개 지역만 표시
                data.slice(0, 3).forEach(region => {
                    const riskClass = getRiskLevelClass(region.riskLevel);
                    const regionInfo = region.regionInfo || { imageUrl: '', specialty: '정보 없음', festival: '정보 없음' };

                    const card = `
              <div class="col-md-4 mb-4">
                <div class="card region-card shadow-sm h-100">
                  <div class="position-relative">
                    <img src="${regionInfo.imageUrl || '/static/images/placeholder.jpg'}"
                         class="card-img-top region-card-img"
                         alt="${region.name || '이미지 없음'}">
                    <div class="bookmark-btn" data-id="${region.id}">
                      <span class="material-icons">bookmark_border</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">
                      ${region.name}
                      <span class="badge bg-secondary province-badge">${region.province}</span>
                    </h5>
                    <div class="d-flex mb-3">
                      <span class="risk-badge ${riskClass} me-2 mt-1"></span>
                      <div>
                        <p class="mb-0 fw-bold">${getPredictionText(region.predictedExtinctYear)}</p>
                        <p class="text-muted small mb-0">현재 인구: ${formatNumber(region.currentPopulation)}명</p>
                      </div>
                    </div>
                    <p class="card-text mb-2">
                      <span class="fw-semibold">특산물:</span> ${regionInfo.specialty || '정보 없음'}
                    </p>
                    <p class="card-text mb-0">
                      <span class="fw-semibold">유명 축제:</span> ${regionInfo.festival || '정보 없음'}
                    </p>
                  </div>
                  <div class="card-footer bg-white border-top-0">
                    <button class="btn btn-sm btn-outline-secondary w-100"
                            onclick="showRegionDetail(${region.id})">
                      상세 정보 보기
                    </button>
                  </div>
                </div>
              </div>
            `;

                    container.innerHTML += card;
                });

                // 북마크 버튼 초기화
                initBookmarkButtons();
            })
            .catch(error => {
                console.error('데이터 로드 중 오류 발생:', error);
                document.getElementById('top10Container').innerHTML = `
            <div class="col-12 text-center py-5">
              <p class="text-danger mb-0">데이터를 불러오는 중 오류가 발생했습니다.</p>
              <button class="btn btn-sm btn-outline-danger mt-3" onclick="loadTop10Regions()">다시 시도</button>
            </div>
          `;
            });
    }

    // 위험도에 따른 CSS 클래스 반환
    function getRiskLevelClass(riskLevel) {
        switch(riskLevel) {
            case 'DANGER': return 'danger';
            case 'WARNING': return 'warning';
            case 'CAUTION': return 'caution';
            case 'SAFE': return 'safe';
            default: return 'secondary';
        }
    }

    // 예측 연도에 따른 텍스트 생성
    function getPredictionText(year) {
        if (year < 2100) {
            return `${year}년 소멸 위험`;
        } else if (year < 2200) {
            return `${year}년 소멸 예상`;
        } else if (year < 2300) {
            return `${year}년 소멸 가능성`;
        } else {
            return `${year}년 이후 소멸`;
        }
    }

    // 숫자 포맷팅 (천 단위 콤마)
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 지역 상세 정보 표시
    function showRegionDetail(regionId) {
        // 로딩 상태 표시
        document.getElementById('regionDetailModal').querySelector('.modal-content').innerHTML = `
        <div class="modal-body text-center py-5">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">지역 정보를 불러오는 중입니다...</p>
        </div>
      `;

        // 모달 표시
        new bootstrap.Modal(document.getElementById('regionDetailModal')).show();

        // 데이터 로드
        fetch(`/api/regions/${regionId}`)
            .then(response => response.json())
            .then(region => {
                const regionInfo = region.regionInfo || {
                    imageUrl: '',
                    specialty: '정보 없음',
                    specialtyImageUrl: '',
                    festival: '정보 없음',
                    attraction: '정보 없음',
                    websiteUrl: '#'
                };

                const riskClass = getRiskLevelClass(region.riskLevel);
                const isBookmarked = isRegionBookmarked(region.id);

                // 모달 내용 업데이트
                document.getElementById('regionDetailModal').querySelector('.modal-content').innerHTML = `
            <div class="modal-header" style="background-image: url('${regionInfo.imageUrl || '/static/images/placeholder.jpg'}'); background-size: cover; background-position: center;">
              <div class="modal-title-overlay w-100 text-white">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="modal-title">
                    ${region.name} <span class="badge bg-light text-dark">${region.province}</span>
                  </h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
            </div>
            <div class="modal-body">
              <div class="row mb-4">
                <div class="col-md-7">
                  <div class="d-flex align-items-center mb-3">
                    <span class="risk-badge ${riskClass} me-2"></span>
                    <h5 class="mb-0">${getPredictionText(region.predictedExtinctYear)}</h5>
                  </div>

                  <div class="stats-item">
                    <span class="material-icons">people</span>
                    <div>
                      <span>현재 인구: <strong>${formatNumber(region.currentPopulation)}명</strong></span>
                    </div>
                  </div>

                  <div class="stats-item">
                    <span class="material-icons">history</span>
                    <div>
                      <span>50년 전 인구: <strong>${formatNumber(region.population50yrAgo)}명</strong></span>
                    </div>
                  </div>

                  <div class="stats-item">
                    <span class="material-icons">trending_down</span>
                    <div>
                      <span>연평균 감소율: <strong>${region.avgDeclineRate.toFixed(2)}%</strong></span>
                    </div>
                  </div>

                  <div class="chart-container">
                    <canvas id="populationChart"></canvas>
                  </div>
                </div>

                <div class="col-md-5">
                  <div class="text-center mb-3">
                    <img src="${regionInfo.specialtyImageUrl || '/static/images/placeholder.jpg'}" class="specialty-img" alt="${regionInfo.specialty}">
                    <h6 class="mt-2 mb-0">대표 특산물: ${regionInfo.specialty}</h6>
                  </div>

                  <div class="list-group list-group-flush">
                    <div class="list-group-item">
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">유명 축제</h6>
                        <small class="text-muted"><span class="material-icons fs-6">event</span></small>
                      </div>
                      <p class="mb-1">${regionInfo.festival}</p>
                    </div>

                    <div class="list-group-item">
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">대표 관광지</h6>
                        <small class="text-muted"><span class="material-icons fs-6">place</span></small>
                      </div>
                      <p class="mb-1">${regionInfo.attraction}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <a href="${regionInfo.websiteUrl}" target="_blank" class="btn btn-outline-primary btn-sm">
                  <span class="material-icons align-middle fs-6 me-1">language</span>
                  공식 웹사이트 방문
                </a>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="button" class="btn ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'}" onclick="toggleBookmark(${region.id})">
                <span class="material-icons align-middle me-1">${isBookmarked ? 'bookmark' : 'bookmark_border'}</span>
                ${isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              </button>
            </div>
          `;

                // 인구 변화 차트 생성
                createPopulationChart(region);
            })
            .catch(error => {
                console.error('데이터 로드 중 오류 발생:', error);
                document.getElementById('regionDetailModal').querySelector('.modal-content').innerHTML = `
            <div class="modal-body text-center py-5 text-danger">
              <span class="material-icons" style="font-size: 3rem;">error</span>
              <p class="mt-3">지역 정보를 불러오는 중 오류가 발생했습니다.</p>
              <button class="btn btn-outline-danger mt-3" onclick="showRegionDetail(${regionId})">다시 시도</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            </div>
          `;
            });
    }
</script>
</body>
</html>
