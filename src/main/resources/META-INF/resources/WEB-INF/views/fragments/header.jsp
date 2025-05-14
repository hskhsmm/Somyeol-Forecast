<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<header class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- 기존 코드는 그대로 유지 -->
    <div class="container">
        <a class="navbar-brand" href="/">
            <span class="text-warning fw-bold">소멸예보제</span>
            <span class="text-muted small">City Disappearance Forecast</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="/">홈</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/top10">TOP 10</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="about-link" data-bs-toggle="modal" data-bs-target="#aboutModal">소개</a>
                </li>
            </ul>
        </div>
    </div>
</header>

<!-- 소개 모달 -->
<div class="modal fade" id="aboutModal" tabindex="-1" aria-labelledby="aboutModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="aboutModalLabel">소멸예보제란?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>소멸예보제는 인구 통계 데이터를 기반으로 한국의 지방 도시 소멸 위험도를 예측하고 시각화하는 시스템입니다.</p>
                <p>인구 5만 명 미만의 지역을 대상으로 50년간의 인구 감소 추세를 분석하여 미래 소멸 위험 시점을 예측합니다.</p>
                <p>위험도 분류:</p>
                <ul>
                    <li><strong class="text-danger">위험</strong>: 2100년 이전 소멸 예상</li>
                    <li><strong class="text-warning">경고</strong>: 2100-2199년 소멸 예상</li>
                    <li><strong class="text-primary">주의</strong>: 2200-2299년 소멸 예상</li>
                    <li><strong class="text-success">안전</strong>: 2300년 이후 소멸 예상</li>
                </ul>
                <p>각 지역의 특산물, 축제, 관광지 정보도 함께 제공하여 지역 홍보와 관광 활성화에 도움이 되고자 합니다.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>