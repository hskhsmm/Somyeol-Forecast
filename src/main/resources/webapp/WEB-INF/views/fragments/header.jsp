<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<header class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="/">
                <span class="material-icons me-2 text-danger">location_city</span>
                <span class="fw-bold">소멸예보제</span>
                <span class="ms-2 badge bg-danger fs-6">BETA</span>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="/">
                            <span class="material-icons align-middle fs-5 me-1">map</span>지도
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/top10">
                            <span class="material-icons align-middle fs-5 me-1">trending_down</span>TOP 10
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="bookmarkBtn">
                            <span class="material-icons align-middle fs-5 me-1">bookmarks</span>즐겨찾기
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">
                            <span class="material-icons align-middle fs-5 me-1">info</span>소개
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>

<!-- 프로젝트 소개 모달 -->
<div class="modal fade" id="aboutModal" tabindex="-1" aria-labelledby="aboutModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="aboutModalLabel">
                    <span class="material-icons align-middle me-2">info</span>
                    소멸예보제 프로젝트 소개
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4 text-center mb-4 mb-md-0">
                        <div class="bg-light p-3 rounded h-100 d-flex flex-column justify-content-center">
                            <span class="material-icons text-danger" style="font-size: 5rem;">location_city</span>
                            <h4 class="mt-3">소멸예보제</h4>
                            <p class="text-muted">City Disappearance Forecast System</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <h4>프로젝트 개요</h4>
                        <p>소멸예보제는 대한민국 지방 도시의 인구 감소 추세를 분석하여 미래 도시 소멸 위험도를 시각화하는 서비스입니다.</p>

                        <h5 class="mt-4">주요 기능</h5>
                        <ul>
                            <li>인구 감소 위험도에 따른 지도 시각화</li>
                            <li>지역별 상세 정보 및 인구 감소 추세 그래프 제공</li>
                            <li>지역 특산물, 축제, 관광지 정보 제공</li>
                            <li>인구 감소율 상위 10개 지역 분석</li>
                        </ul>

                        <h5 class="mt-4">소멸 위험도 분류</h5>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="risk-badge danger me-2"></span>
                                    <span><strong>위험:</strong> 2100년 이전 소멸 예상</span>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <span class="risk-badge warning me-2"></span>
                                    <span><strong>주의:</strong> 2100-2199년 소멸 예상</span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="risk-badge caution me-2"></span>
                                    <span><strong>경고:</strong> 2200-2299년 소멸 예상</span>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <span class="risk-badge safe me-2"></span>
                                    <span><strong>안전:</strong> 2300년 이후 소멸 예상</span>
                                </div>
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