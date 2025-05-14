/**
 * top10.js - 소멸예보제 TOP 10 페이지
 * 인구 감소율 TOP 10 지역 데이터 표시
 */

// localStorage에서 북마크 가져오기 함수
function getBookmarks() {
    const bookmarks = localStorage.getItem('cityforecast-bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
}

// 북마크 여부 확인 함수
function isBookmarked(regionId) {
    const bookmarks = getBookmarks();
    return bookmarks.some(bookmark => bookmark.id === regionId);
}

// 북마크 추가 함수
function addBookmark(region) {
    const bookmarks = getBookmarks();

    // 이미 존재하는지 확인
    if (!bookmarks.some(bookmark => bookmark.id === region.id)) {
        // 필요한 정보만 저장
        const bookmarkData = {
            id: region.id,
            name: region.name,
            province: region.province,
            currentPopulation: region.currentPopulation,
            population50yrAgo: region.population50yrAgo,
            avgDeclineRate: region.avgDeclineRate,
            predictedExtinctYear: region.predictedExtinctYear,
            riskLevel: region.riskLevel,
            latitude: region.latitude,
            longitude: region.longitude
        };

        // 지역 정보가 있으면 이미지 URL 저장
        if (region.regionInfo) {
            bookmarkData.imageUrl = region.regionInfo.imageUrl;
            bookmarkData.specialtyImageUrl = region.regionInfo.specialtyImageUrl;
            bookmarkData.specialty = region.regionInfo.specialty;
            bookmarkData.festival = region.regionInfo.festival;
            bookmarkData.attraction = region.regionInfo.attraction;
            bookmarkData.websiteUrl = region.regionInfo.websiteUrl;
        }

        bookmarks.push(bookmarkData);
        localStorage.setItem('cityforecast-bookmarks', JSON.stringify(bookmarks));
    }
}

// 북마크 제거 함수
function removeBookmark(regionId) {
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== regionId);
    localStorage.setItem('cityforecast-bookmarks', JSON.stringify(bookmarks));
}

// 북마크 토글 함수
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
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    loadTop10Data();

    // 모달 객체 초기화
    regionModal = new bootstrap.Modal(document.getElementById('regionModal'));
});

// TOP 10 지역 데이터 로드
function loadTop10Data() {
    fetch('/api/regions/top10')
        .then(response => {
            if (!response.ok) {
                throw new Error('TOP 10 데이터를 불러오는데 실패했습니다');
            }
            return response.json();
        })
        .then(data => {
            // TOP 10 데이터 저장
            allRegions = data;

            // 테이블 렌더링
            renderTop10Table(data);

            // 차트 생성
            createTop10Chart(data);
            createRiskPieChart(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('TOP 10 데이터를 불러오는데 실패했습니다: ' + error.message);
        });
}

// TOP 10 테이블 렌더링
function renderTop10Table(regions) {
    const tableBody = document.getElementById('top10-table-body');

    // 테이블 초기화
    tableBody.innerHTML = '';

    // 각 지역에 대한 행 생성
    regions.forEach((region, index) => {
        // 위험도에 따른 배지 클래스 및 텍스트 설정
        let badgeClass, riskText;
        switch(region.riskLevel) {
            case 'DANGER':
                badgeClass = 'danger';
                riskText = '위험';
                break;
            case 'WARNING':
                badgeClass = 'warning';
                riskText = '경고';
                break;
            case 'CAUTION':
                badgeClass = 'caution';
                riskText = '주의';
                break;
            case 'SAFE':
                badgeClass = 'safe';
                riskText = '안전';
                break;
        }

        // 행 HTML 생성
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${region.name}</td>
            <td>${region.province}</td>
            <td>${region.currentPopulation.toLocaleString()}</td>
            <td>${region.population50yrAgo.toLocaleString()}</td>
            <td>${Math.abs(region.avgDeclineRate * 100).toFixed(2)}</td>
            <td>${region.predictedExtinctYear}</td>
            <td><span class="status-badge ${badgeClass}">${riskText}</span></td>
            <td>
                <button class="btn btn-sm btn-primary view-details-btn" data-region-id="${region.id}">
                    상세
                </button>
            </td>
        `;

        // 상세 정보 버튼 클릭 이벤트 추가
        const detailsBtn = row.querySelector('.view-details-btn');
        detailsBtn.addEventListener('click', function() {
            const regionId = this.getAttribute('data-region-id');
            fetchRegionDetails(regionId);
        });

        tableBody.appendChild(row);
    });
}

// 지역 상세 정보 가져오기 (북마크에서 상세 정보 버튼 클릭 시)
function fetchRegionDetails(regionId) {
    fetch(`/api/regions/${regionId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('지역 정보를 불러오는데 실패했습니다');
            }
            return response.json();
        })
        .then(region => {
            selectedRegion = region;
            showRegionDetails(region);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('지역 정보를 불러오는데 실패했습니다: ' + error.message);
        });
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
        // placeholder 이미지 URL
        const placeholderImage = 'https://via.placeholder.com/300x200?text=이미지+없음';

        if (info.imageUrl) {
            regionImage.src = info.imageUrl;
            regionImage.onerror = function() {
                this.src = placeholderImage;
            };
        } else {
            regionImage.src = placeholderImage;
        }

        // 특산물, 축제, 관광지 정보
        document.getElementById('specialty-text').textContent = info.specialty;
        document.getElementById('festival-text').textContent = info.festival;
        document.getElementById('attraction-text').textContent = info.attraction;

        // 특산물 이미지 - 오류 처리 추가
        const specialtyImage = document.getElementById('specialty-image');
        // 특산물 placeholder 이미지
        const specialtyPlaceholder = 'https://via.placeholder.com/200x150?text=특산물+이미지+없음';

        if (info.specialtyImageUrl) {
            specialtyImage.src = info.specialtyImageUrl;
            specialtyImage.onerror = function() {
                this.src = specialtyPlaceholder;
            };
        } else {
            specialtyImage.src = specialtyPlaceholder;
        }
    }

    // 인구 변화 차트 생성
    createPopulationChart(region);

    // 모달 열기
    regionModal.show();
}