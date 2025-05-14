/**
 * chart.js - 소멸예보제 차트 시각화
 * Chart.js를 활용한 인구 감소 그래프 구현
 */

// 차트 객체 저장용 변수
let populationChart = null;
let top10Chart = null;
let riskPieChart = null;

// 인구 변화 차트 생성
function createPopulationChart(region) {
    const ctx = document.getElementById('population-chart').getContext('2d');

    // 차트가 이미 존재하면 파괴
    if (populationChart) {
        populationChart.destroy();
    }

    // 현재부터 미래 예측까지의 연도 계산
    const currentYear = new Date().getFullYear();
    const years50ago = currentYear - 50;

    // 데이터 포인트 계산
    const startPopulation = region.population50yrAgo;
    const currentPopulation = region.currentPopulation;
    const endPopulation = 0; // 소멸 시점
    const extinctYear = region.predictedExtinctYear;

    // 과거에서 현재까지의 데이터 포인트
    const pastData = [];
    for (let year = years50ago; year <= currentYear; year += 10) {
        const progress = (year - years50ago) / (currentYear - years50ago);
        const population = startPopulation - (startPopulation - currentPopulation) * progress;
        pastData.push({
            x: year,
            y: Math.round(population)
        });
    }

    // 현재에서 미래까지의 데이터 포인트
    const futureData = [];
    for (let year = currentYear; year <= extinctYear; year += 10) {
        if (year === currentYear) {
            futureData.push({
                x: year,
                y: currentPopulation
            });
        } else {
            const progress = (year - currentYear) / (extinctYear - currentYear);
            const population = currentPopulation - currentPopulation * progress;
            futureData.push({
                x: year,
                y: Math.round(population)
            });
        }
    }

    // 소멸 시점 추가
    futureData.push({
        x: extinctYear,
        y: 0
    });

    // 위험도에 따른 색상 설정
    let borderColor, backgroundColor;
    switch(region.riskLevel) {
        case 'DANGER':
            borderColor = '#dc3545';
            backgroundColor = 'rgba(220, 53, 69, 0.2)';
            break;
        case 'WARNING':
            borderColor = '#ffc107';
            backgroundColor = 'rgba(255, 193, 7, 0.2)';
            break;
        case 'CAUTION':
            borderColor = '#0d6efd';
            backgroundColor = 'rgba(13, 110, 253, 0.2)';
            break;
        case 'SAFE':
            borderColor = '#198754';
            backgroundColor = 'rgba(25, 135, 84, 0.2)';
            break;
    }

    // 차트 생성
    populationChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: '과거 인구',
                    data: pastData,
                    borderColor: '#6c757d',
                    backgroundColor: 'rgba(108, 117, 125, 0.2)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: '#6c757d',
                    fill: true
                },
                {
                    label: '예측 인구',
                    data: futureData,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 3,
                    pointBackgroundColor: borderColor,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // 이 옵션을 true로 설정하여 비율 유지
            height: 300, // 높이 고정
            plugins: {
                title: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw.y.toLocaleString() + '명';
                        }
                    }
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: '연도'
                    },
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value.toString();
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '인구 (명)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000
            }
        }
    });
}

// TOP 10 차트 생성 (top10.jsp에서 사용)
function createTop10Chart(regions) {
    const ctx = document.getElementById('top10-chart').getContext('2d');

    // 차트가 이미 존재하면 파괴
    if (top10Chart) {
        top10Chart.destroy();
    }

    // 데이터 준비
    const labels = regions.map(region => region.name);
    // 감소율 표시시 절대값으로 변환
    const declineRates = regions.map(region => Math.abs(region.avgDeclineRate * 100).toFixed(2));
    const predictedYears = regions.map(region => region.predictedExtinctYear);

    // 위험도별 색상 설정
    const backgroundColors = regions.map(region => {
        switch(region.riskLevel) {
            case 'DANGER': return 'rgba(220, 53, 69, 0.7)';
            case 'WARNING': return 'rgba(255, 193, 7, 0.7)';
            case 'CAUTION': return 'rgba(13, 110, 253, 0.7)';
            case 'SAFE': return 'rgba(25, 135, 84, 0.7)';
        }
    });

    const borderColors = regions.map(region => {
        switch(region.riskLevel) {
            case 'DANGER': return '#dc3545';
            case 'WARNING': return '#ffc107';
            case 'CAUTION': return '#0d6efd';
            case 'SAFE': return '#198754';
        }
    });

    // 차트 생성
    top10Chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '평균 감소율 (%)',
                    data: declineRates,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '인구 감소율 TOP 10 지역',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `감소율: ${context.raw}%`;
                        },
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            return `소멸 예상: ${predictedYears[index]}년`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '지역'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '평균 감소율 (%)'
                    },
                    beginAtZero: true
                }
            },
            animation: {
                duration: 1000
            }
        }
    });
}

// 위험도 분포 파이 차트 생성 (top10.jsp에서 사용)
function createRiskPieChart(regions) {
    const ctx = document.getElementById('risk-pie-chart').getContext('2d');

    // 차트가 이미 존재하면 파괴
    if (riskPieChart) {
        riskPieChart.destroy();
    }

    // 위험도별 카운트
    const riskCounts = {
        DANGER: 0,
        WARNING: 0,
        CAUTION: 0,
        SAFE: 0
    };

    regions.forEach(region => {
        riskCounts[region.riskLevel]++;
    });

    // 데이터 및 색상 설정
    const data = [
        riskCounts.DANGER,
        riskCounts.WARNING,
        riskCounts.CAUTION,
        riskCounts.SAFE
    ];

    const backgroundColors = [
        'rgba(220, 53, 69, 0.7)',
        'rgba(255, 193, 7, 0.7)',
        'rgba(13, 110, 253, 0.7)',
        'rgba(25, 135, 84, 0.7)'
    ];

    const borderColors = [
        '#dc3545',
        '#ffc107',
        '#0d6efd',
        '#198754'
    ];

    // 차트 생성
    riskPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['위험', '경고', '주의', '안전'],
            datasets: [
                {
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'TOP 10 지역의 위험도 분포',
                    font: {
                        size: 14
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value}개 (${percentage}%)`;
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            animation: {
                duration: 1000
            }
        }
    });
}