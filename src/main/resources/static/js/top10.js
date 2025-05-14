/**
 * top10.js - 소멸예보제 TOP 10 페이지
 * 인구 감소율 TOP 10 지역 데이터 표시
 */

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
            <td>${(region.avgDeclineRate * 100).toFixed(2)}</td>
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

// 지역 상세 정보 표시 (bookmark.js에 동일한 함수가 있음)
// TOP 10 페이지에서는 이 함수만 사용하므로 중복해서 정의
function showRegionDetails(region) {
    // 지역 기본 정보 설정
    document.getElementById('region-name').textContent = region.name;
    document.getElementById('region-province').textContent = region.province;
    document.getElementById('current-population').textContent = region.currentPopulation.toLocaleString();
    document.getElementById('past-population').textContent = region.population50yrAgo.toLocaleString();
    document.getElementById('decline-rate').textContent = (region.avgDeclineRate * 100).toFixed(2);

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

        // 지역 이미지
        document.getElementById('region-image').src = info.imageUrl;

        // 특산물, 축제, 관광지 정보
        document.getElementById('specialty-text').textContent = info.specialty;
        document.getElementById('festival-text').textContent = info.festival;
        document.getElementById('attraction-text').textContent = info.attraction;

        // 특산물 이미지
        document.getElementById('specialty-image').src = info.specialtyImageUrl;
    }

    // 인구 변화 차트 생성
    createPopulationChart(region);

    // 모달 열기
    regionModal.show();
}