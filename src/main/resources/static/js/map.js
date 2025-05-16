/**
 * map.js - 소멸예보제 지도 시각화
 * Leaflet.js와 VWorld API를 활용한 지도 구현
 */

// 전역 변수
let map;
let regionLayers = [];
let allRegions = [];
let selectedRegion = null;
let regionModal;

// 지도 초기화
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    loadRegions();

    // 모달 객체 초기화
    regionModal = new bootstrap.Modal(document.getElementById('regionModal'));

    // 북마크 초기화
    renderBookmarks();

    // 이미지 에러 디버깅 코드 추가
    document.addEventListener('error', function(e) {
        if (e.target.tagName.toLowerCase() === 'img') {
            console.error('이미지 로딩 실패:', e.target.src);
        }
    }, true);
});

// Leaflet 지도 초기화
function initMap() {
    // 대한민국 중심 좌표 (북한 포함)
    const koreaCenter = [36.5, 127.5];

    // 지도 생성
    map = L.map('map-container', {
        center: koreaCenter,
        zoom: 7,
        minZoom: 6,
        maxZoom: 13,
        zoomControl: false // 기본 줌 컨트롤 제거
    });

    // 줌 컨트롤을 오른쪽 아래에 배치
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // VWorld 타일 레이어 추가
    const vworldApiKey = '36A35D56-634F-374F-8F3E-D9A478BB684C';
    const vworldBase = L.tileLayer(`https://api.vworld.kr/req/wmts/1.0.0/${vworldApiKey}/Base/{z}/{y}/{x}.png`, {
        attribution: '© <a href="https://www.vworld.kr">VWorld</a>'
    }).addTo(map);

    // 레이어 컨트롤 추가
    const baseMaps = {
        "기본 지도": vworldBase,
        "위성 지도": L.tileLayer(`https://api.vworld.kr/req/wmts/1.0.0/${vworldApiKey}/Satellite/{z}/{y}/{x}.jpg`, {
            attribution: '© <a href="https://www.vworld.kr">VWorld</a>'
        }),
        "하이브리드": L.tileLayer(`https://api.vworld.kr/req/wmts/1.0.0/${vworldApiKey}/Hybrid/{z}/{y}/{x}.png`, {
            attribution: '© <a href="https://www.vworld.kr">VWorld</a>'
        })
    };

    L.control.layers(baseMaps, null, {
        position: 'topright'
    }).addTo(map);
}

// 지역 데이터 로드
function loadRegions() {
    fetch('/api/regions')
        .then(response => {
            if (!response.ok) {
                throw new Error('지역 데이터를 불러오는데 실패했습니다');
            }
            return response.json();
        })
        .then(data => {
            allRegions = data;
            renderRegionsOnMap(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('지역 데이터를 불러오는데 실패했습니다: ' + error.message);
        });
}

// 지도에 지역 표시
function renderRegionsOnMap(regions) {
    // 기존 레이어 제거
    if (regionLayers.length > 0) {
        regionLayers.forEach(layer => map.removeLayer(layer));
        regionLayers = [];
    }

    // 지역별로 마커 생성
    regions.forEach(region => {
        if (region.currentPopulation < 50000) {
            // 인구 5만 미만 지역만 처리
            const marker = createRegionMarker(region);
            marker.addTo(map);
            regionLayers.push(marker);
        }
    });
}

// 지역 마커 생성
function createRegionMarker(region) {
    // 위험도에 따른 클래스 결정
    let markerClass = 'region-marker ';

    switch(region.riskLevel) {
        case 'DANGER':
            markerClass += 'danger';
            break;
        case 'WARNING':
            markerClass += 'warning';
            break;
        case 'CAUTION':
            markerClass += 'caution';
            break;
        case 'SAFE':
            markerClass += 'safe';
            break;
    }

    // 커스텀 아이콘 생성
    const icon = L.divIcon({
        className: markerClass,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    // 마커 생성
    const marker = L.marker([region.latitude, region.longitude], {
        icon: icon,
        title: region.name
    });

    // 툴팁 설정
    marker.bindTooltip(
        `<strong>${region.name}</strong><br>
        인구: ${region.currentPopulation.toLocaleString()}명<br>
        소멸 예상: ${region.predictedExtinctYear}년`,
        { className: 'region-tooltip' }
    );

    // 클릭 이벤트 추가
    marker.on('click', function() {
        selectedRegion = region;
        showRegionDetails(region);
    });

    return marker;
}

// 지역 상세 정보 표시
function showRegionDetails(region) {
    // 지역 기본 정보 설정
    document.getElementById('region-name').textContent = region.name;
    document.getElementById('region-province').textContent = region.province;
    document.getElementById('current-population').textContent = region.currentPopulation.toLocaleString();
    document.getElementById('past-population').textContent = region.population50yrAgo.toLocaleString();
    document.getElementById('decline-rate').textContent = Math.abs(region.avgDeclineRate * 100).toFixed(2);

    // 위험도에 따른 알림 설정
    const alertElement = document.getElementById('extinction-alert');
    let alertClass = 'alert ';
    let alertText = '';

    switch(region.riskLevel) {
        case 'DANGER':
            alertClass += 'alert-danger';
            alertText = `⚠️ 위험: 이 지역은 ${region.predictedExtinctYear}년에 소멸 위험에 도달할 것으로 예측됩니다.`;
            break;
        case 'WARNING':
            alertClass += 'alert-warning';
            alertText = `⚠️ 경고: 이 지역은 ${region.predictedExtinctYear}년에 소멸 위험에 도달할 것으로 예측됩니다.`;
            break;
        case 'CAUTION':
            alertClass += 'alert-primary';
            alertText = `🔔 주의: 이 지역은 ${region.predictedExtinctYear}년에 소멸 위험에 도달할 것으로 예측됩니다.`;
            break;
        case 'SAFE':
            alertClass += 'alert-success';
            alertText = `✅ 안전: 이 지역은 ${region.predictedExtinctYear}년에 소멸 위험에 도달할 것으로 예측됩니다.`;
            break;
    }

    alertElement.className = alertClass;
    alertElement.textContent = alertText;

    // 북마크 버튼 상태 설정
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (isBookmarked(region.id)) {
        bookmarkBtn.innerHTML = '<i class="fas fa-star"></i> 관심 지역에서 제거';
        bookmarkBtn.classList.remove('btn-outline-warning');
        bookmarkBtn.classList.add('btn-warning');
    } else {
        bookmarkBtn.innerHTML = '<i class="far fa-star"></i> 관심 지역에 추가';
        bookmarkBtn.classList.remove('btn-warning');
        bookmarkBtn.classList.add('btn-outline-warning');
    }

    // 북마크 버튼 이벤트 연결
    bookmarkBtn.onclick = function() {
        toggleBookmark(region);
    };

    // 지역 부가 정보 설정
    if (region.regionInfo) {
        const info = region.regionInfo;

        // 웹사이트 링크
        document.getElementById('region-website').href = info.websiteUrl;

        // 지역 이미지 - 오류 처리 추가
        const regionImage = document.getElementById('region-image');
        const placeholderImage = 'https://via.placeholder.com/300x200?text=이미지+없음';

        if (info.imageUrl) {
            regionImage.src = info.imageUrl;
            regionImage.onerror = function() {
                this.src = placeholderImage;
            };
        } else {
            regionImage.src = placeholderImage;
        }

        // 특산물, 축제, 관광지 정보 (아이콘 추가 및 스타일 적용)
        // 특산물 정보
        document.getElementById('specialty-text').textContent = info.specialty;

        // 특산물 이미지 - 오류 처리 추가
        const specialtyImage = document.getElementById('specialty-image');
        const specialtyPlaceholder = 'https://via.placeholder.com/200x150?text=특산물+이미지+없음';

        if (info.specialtyImageUrl) {
            specialtyImage.src = info.specialtyImageUrl;
            specialtyImage.onerror = function() {
                this.src = specialtyPlaceholder;
            };
        } else {
            specialtyImage.src = specialtyPlaceholder;
        }

        // 축제 정보 - 아이콘 추가 및 스타일링
        const festivalText = document.getElementById('festival-text');
        festivalText.innerHTML = `
            <div class="text-center mb-3">
                <i class="fas fa-calendar-alt fa-3x text-primary"></i>
            </div>
            <div class="festival-name fw-bold mb-2">${info.festival}</div>
            <div class="festival-desc small text-muted">
                ${region.name}의 대표 축제로, 지역 문화와 특색을 경험할 수 있습니다.
            </div>
        `;

        // 관광지 정보 - 아이콘 추가 및 스타일링
        const attractionText = document.getElementById('attraction-text');
        attractionText.innerHTML = `
            <div class="text-center mb-3">
                <i class="fas fa-mountain fa-3x text-success"></i>
            </div>
            <div class="attraction-name fw-bold mb-2">${info.attraction}</div>
            <div class="attraction-desc small text-muted">
                ${region.name}의 주요 관광 명소로, 방문객들에게 인기가 있습니다.
            </div>
        `;
    }

    // 인구 변화 차트 생성
    createPopulationChart(region);

    // 모달 열기
    regionModal.show();
}

// 북마크 여부 확인
function isBookmarked(regionId) {
    const bookmarks = getBookmarks();
    return bookmarks.some(bookmark => bookmark.id === regionId);
}

// 북마크 토글
function toggleBookmark(region) {
    if (isBookmarked(region.id)) {
        removeBookmark(region.id);
        const bookmarkBtn = document.getElementById('bookmark-btn');
        bookmarkBtn.innerHTML = '<i class="far fa-star"></i> 관심 지역에 추가';
        bookmarkBtn.classList.remove('btn-warning');
        bookmarkBtn.classList.add('btn-outline-warning');
    } else {
        addBookmark(region);
        const bookmarkBtn = document.getElementById('bookmark-btn');
        bookmarkBtn.innerHTML = '<i class="fas fa-star"></i> 관심 지역에서 제거';
        bookmarkBtn.classList.remove('btn-outline-warning');
        bookmarkBtn.classList.add('btn-warning');
    }

    // 북마크 목록 업데이트
    renderBookmarks();
}