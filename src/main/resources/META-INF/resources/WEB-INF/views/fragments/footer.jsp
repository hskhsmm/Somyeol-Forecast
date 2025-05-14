<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<footer class="bg-dark text-light py-4 mt-5">
    <!-- 기존 코드는 그대로 유지 -->
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h5>소멸예보제</h5>
                <p class="text-muted">인구 감소 추세를 기반으로 한국의 지방 도시 소멸 위험도를 예측하는 시스템</p>
            </div>
            <div class="col-md-3">
                <h5>메뉴</h5>
                <ul class="list-unstyled">
                    <li><a href="/" class="text-muted text-decoration-none">홈</a></li>
                    <li><a href="/top10" class="text-muted text-decoration-none">TOP 10</a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <h5>연락처</h5>
                <ul class="list-unstyled">
                    <li><a href="mailto:info@cityforecast.co.kr" class="text-muted text-decoration-none">info@cityforecast.co.kr</a></li>
                    <li><a href="tel:02-1234-5678" class="text-muted text-decoration-none">02-1234-5678</a></li>
                </ul>
            </div>
        </div>
        <hr class="my-3 bg-secondary">
        <div class="row">
            <div class="col text-center">
                <p class="mb-0 text-muted">© 2023 소멸예보제. All rights reserved.</p>
                <p class="text-muted small">
                    데이터 제공: 국가통계포털 | 지도 API: VWorld | 카테고리별 소멸위험지수 산출 기준: 한국고용정보원
                </p>
            </div>
        </div>
    </div>
</footer>