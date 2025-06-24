import { useState, useEffect } from "react";
// npm install react-apexcharts apexcharts
import ApexCharts from 'react-apexcharts';
import './Chart.css';

// 차트 목록
const charts = [
    { filename: "사무자동화산업기사_연도별합격률.json", name: "사무자동화산업기사" },
    { filename: "정보관리기술사_연도별합격률.json", name: "정보관리기술사" },
    { filename: "정보기기운용기능사_연도별합격률.json", name: " 정보기기운용기능사" },
    { filename: "정보처리기능사_연도별합격률.json", name: "정보처리기능사" },
    { filename: "정보처리기사_연도별합격률.json", name: "정보처리기사" },
    { filename: "정보처리산업기사_연도별합격률.json", name: "정보처리산업기사" },
    { filename: "컴퓨터시스템응용기술사_연도별합격률.json", name: "컴퓨터시스템응용기술사" }
];

// 차트
const Chart = () => {
    const [current, setCurrent] = useState(0);              // current -> 화면에 보여줄(현재 선택된)차트 / 탭의 인덱스번호 저장
    const [isPaused, setIsPaused] = useState(false);        // 슬라이드, 게이지 일시정지
    const [progress, setProgress] = useState(0);            // 하단 탭 게이지바 진행정도
    const [tabStartIndex, setTabStartIndex] = useState(0);  // 시작하는 탭 인덱스 확인
    const [chartData, setChartData] = useState(null);

    const visibleTabs = charts.slice(tabStartIndex, tabStartIndex + 3); // 탭 3개씩만 보여지게 자르기

    useEffect(() => {
        fetch(`/ChartFolder/${charts[current].filename}`)
            .then((res) => res.json())                          // 받은 JSON을 JavaScript 객체로 변환
            .then((data) => setChartData(data));                // 차트 그릴 수 있게 업뎃 !
    }, [current]);

    // 슬라이드
    useEffect(() => {
        let progressInterval;
        if (!isPaused) {            // 일시정지 -> 타이머 멈춤
            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setCurrent((c) => (c + 1) % charts.length);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 30);                 // 3초 동안 0->100
        }
        return () => clearInterval(progressInterval);
    }, [isPaused]);

    // 선택된 차트가 안 보이는 범위로 벗어나면 슬라이드 이동
    useEffect(() => {
        setTabStartIndex((prev) => {
            if (current < prev) return current;
            if (current < prev) return current;                         // 왼쪽으로 밀기
            if (current >= prev + 3) return Math.max(current - 2, 0);   // 오른쪽으로 밀기
            return prev;  // 이미 보이는 범위면 그대로 유지
        });
    }, [current]);


    const handlePrev = () => {      // 이전 화살표 누를때
        setTabStartIndex((prev) => Math.max(prev - 1, 0));
    };
    const handleNext = () => {      // 다음 화살표 누를때
        setTabStartIndex((prev) =>
            Math.min(prev + 1, charts.length - 3)
        );
    };

    // chartData는 처음 컴포넌트 랜더링할때 null값이기 때문에 에러방지
    if (!chartData) return null;

    // ApexCharts에서 사용할 차트옵션
    const options = {
        chart: {
            id: "합격률 차트",
            toolbar: { show: false },
        },
        xaxis: { categories: chartData.years },
        title: {
            text: chartData.title,
            align: "center",
            style: { fontSize: "18px" },
        },
    };

    const series = [
        {
            name: "필기 합격률",
            data: chartData["필기 합격률"],
        },
        {
            name: "실기 합격률",
            data: chartData["실기 합격률"],
        },
    ];


    return (
        <div className="chart-slider">
            {/* 차트 눌렀을 때 링크 이동 */}
            <a
                href="https://www.q-net.or.kr/crf005.do?id=crf00501&gSite=Q&gId=#none"
                target="_blank"
                onMouseEnter={() => setIsPaused(true)} // 마우스 올리면 멈춤
                onMouseLeave={() => setIsPaused(false)} // 마우스 치우면 다시 재생
            >
                <ApexCharts options={options} series={series} type="line" width={750} height={350} />
            </a>

            {/* 슬라이드 하단 탭 */}
            <div className="swiper">
                {/* 맨 앞이면 왼쪽 화살표 사라지게 */}
                {tabStartIndex > 0 && (
                    <button onClick={handlePrev} className="tab-arrow">{"<"}</button>
                )}

                {/* 탭 전체 */}
                <div className="tab-slider-wrapper">
                    {/* 실제 탭들을 나열한 컨테이너 */}
                    <div
                        className="tab-slider"
                        style={{
                            transform: `translateX(-${tabStartIndex * 152}px)`, // 전체 박스를 왼쪽으로 밀어서 슬라이드 시킴 (탭 한 칸의 가로길이 110px)
                        }}
                    >
                        {charts.map((chart, index) => (                         // 전체 chart 배열을 순회하면서 탭 항목 만들기
                            <div
                                key={index}     // 탭을 구분하기 위한 고유 값
                                className={`chart-tab-div ${current === index ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrent(index);      // 해당 탭을 선택된 탭으로
                                    setProgress(0);         // 하단 진행바를 0부터 다 시작하게 함
                                }}
                            >
                                {chart.name}
                                <div
                                    className="progress-bar"
                                    style={{ width: `${current === index ? progress : 0}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 맨 뒤면 오른쪽 화살표 사라지게 */}
                {tabStartIndex + 3 < charts.length && (
                    <button onClick={handleNext} className="tab-arrow">{">"}</button>
                )}
            </div>
        </div>
    );
};

export default Chart