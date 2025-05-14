/**
 * bookmark.js - 소멸예보제 즐겨찾기 기능
 * localStorage를 활용한 관심 지역 저장/관리
 */

// localStorage에서 북마크 가져오기
function getBookmarks() {
    const bookmarks = localStorage.getItem('cityforecast-bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
}

// localStorage에 북마크 저장
function saveBookmarks(bookmarks) {
    localStorage.setItem('cityforecast-bookmarks', JSON.stringify(bookmarks));
}

// 북마크 추가
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
        saveBookmarks(bookmarks);
    }
}

// 북마크 제거
function removeBookmark(regionId) {
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== regionId);
    saveBookmarks(bookmarks);
}

// 북마크 목록 렌더링
function renderBookmarks() {
    const bookmarks = getBookmarks();
    const container = document.getElementById('bookmark-container');

    // 컨테이너가 없으면 종료 (다른 페이지일 수 있음)
    if (!container) return;

    // 컨테이너 초기화
    container.innerHTML = '';

    // 북마크가 없을 경우 메시지 표시
    if (bookmarks.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center no-bookmarks">
                <p>아직 관심 지역이 없습니다. 지도에서 지역을 클릭하고 별표 아이콘을 클릭하여 관심 지역으로 등록해보세요.</p>
            </div>
        `;
        return;
    }

    // 북마크 카드 생성
    bookmarks.forEach(bookmark => {
        // 위험도에 따른 색상 및 텍스트 설정
        let badgeClass, riskText;
        switch(bookmark.riskLevel) {
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

        // 기본 이미지 설정 (이미지가 없는 경우)
        const imageUrl = bookmark.imageUrl || 'https://via.placeholder.com/300x200?text=이미지+없음';

        // 북마크 카드 HTML 생성
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card bookmark-card h-100">
                <div class="card-img-container">
                    <img src="${imageUrl}" class="card-img-top" alt="${bookmark.name}">
                    <span class="badge status-badge ${badgeClass} risk-badge">${riskText}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${bookmark.name}</h5>
                    <p class="card-text text-muted">${bookmark.province}</p>
                    <p class="card-text">인구: ${bookmark.currentPopulation.toLocaleString()}명</p>
                    <p class="card-text">소멸 예상: ${bookmark.predictedExtinctYear}년</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <button class="btn btn-sm btn-primary view-details-btn" data-region-id="${bookmark.id}">
                        상세 정보
                    </button>
                    <button class="btn btn-sm btn-outline-danger remove-bookmark-btn" data-region-id="${bookmark.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;

        // 카드 클릭 이벤트 - 지역 상세 정보 표시
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', function() {
            const regionId = this.getAttribute('data-region-id');
            fetchRegionDetails(regionId);
        });

        // 북마크 제거 버튼 클릭 이벤트
        const removeBtn = card.querySelector('.remove-bookmark-btn');
        removeBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // 카드 클릭 이벤트 방지
            const regionId = parseInt(this.getAttribute('data-region-id'));
            removeBookmark(regionId);
            renderBookmarks();
        });

        container.appendChild(card);
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