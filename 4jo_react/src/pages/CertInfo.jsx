import React, { useState, useEffect } from 'react';
// 검색 아이콘을 위해 lucide-react에서 Search 아이콘 가져옴
import { Search } from 'lucide-react';
// CSS 스타일 불러오기
import './CertInfo.css';

// 자격증 분류 데이터 (카테고리별로 자격증 이름 나열)
const certData = {
    국가기술자격: { 자격증: ['정보처리기사', '전기기사', '산업안전기사'] },
    민간자격: {
        국가공인: ['SQLD', 'ADsP', 'DAsP'],
        비공인: ['코딩지도사', '엑셀전문가', 'OA Master'],
    },
    국제자격: { 자격증: ['OCA', 'OCP', 'OCM', 'LPIC'] },
};

// 자격증별 상세 정보
const certDetails = {
    정보처리기사: { 설명: '정보시스템의 분석, 설계, 구현 등을 담당하는 자격증', 시행처: '한국산업인력공단' },
    전기기사: { 설명: '전기설비의 설계, 시공, 검사 등을 담당', 시행처: '한국산업인력공단' },
    산업안전기사: { 설명: '산업현장의 안전관리 및 재해예방', 시행처: '한국산업인력공단' },
    SQLD: { 설명: 'SQL 개발자 자격증', 시행처: '한국데이터산업진흥원' },
    ADsP: { 설명: '데이터분석 준전문가 자격증', 시행처: '한국데이터산업진흥원' },
    DAsP: { 설명: '데이터아키텍처 준전문가 자격증', 시행처: '한국데이터산업진흥원' },
    코딩지도사: { 설명: '초중등 SW 교육 관련 민간 자격증', 시행처: '한국코딩교육진흥협회' },
    엑셀전문가: { 설명: 'Excel 활용 능력 인증 자격증', 시행처: '대한상공회의소' },
    'OA Master': { 설명: '오피스 프로그램 종합 활용 자격증', 시행처: '한국생산성본부' },
    OCA: { 설명: 'Oracle DB 기초 자격증', 시행처: 'Oracle Corporation' },
    OCP: { 설명: 'Oracle DB 전문가 자격증', 시행처: 'Oracle Corporation' },
    OCM: { 설명: 'Oracle DB 최고 전문가 자격증', 시행처: 'Oracle Corporation' },
    LPIC: { 설명: '리눅스 시스템 관리자 자격증', 시행처: 'Linux Professional Institute' },
};

const CertInfo = () => {
    // 상태 관리: 선택된 카테고리/서브카테고리/자격증/검색어/검색결과
    const [mainTab, setMainTab] = useState(null);
    const [subTab, setSubTab] = useState(null);
    const [selectedCert, setSelectedCert] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // 검색어가 입력될 때마다 결과 필터링
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = [];

        Object.entries(certData).forEach(([category, data]) => {
            if (category === '민간자격') {
                Object.entries(data).forEach(([subCategory, certs]) => {
                    certs.forEach(cert => {
                        const info = certDetails[cert];
                        if (
                            cert.toLowerCase().includes(query) ||
                            (info && info.설명.toLowerCase().includes(query))
                        ) {
                            results.push({ name: cert, category, subCategory });
                        }
                    });
                });
            } else {
                data.자격증.forEach(cert => {
                    const info = certDetails[cert];
                    if (
                        cert.toLowerCase().includes(query) ||
                        (info && info.설명.toLowerCase().includes(query))
                    ) {
                        results.push({ name: cert, category });
                    }
                });
            }
        });

        setSearchResults(results);
    }, [searchQuery]);

    // 메인 카테고리 클릭 시 실행
    const handleMainTabClick = (category) => {
        setMainTab(category);
        setSubTab(null);
        setSelectedCert(null);
        setSearchQuery('');
    };

    // 서브 카테고리 클릭 시 실행 (민간자격만 해당)
    const handleSubTabClick = (sub) => {
        setSubTab(sub);
        setSelectedCert(null);
    };

    // 검색 결과에서 자격증 클릭 시 실행
    const handleSearchResultClick = (result) => {
        setSelectedCert(result.name);
        setMainTab(result.category);
        setSubTab(result.subCategory || null);
        setSearchQuery('');
    };

    return (
        <div className="cert-container">
            {/* 검색창 */}
            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="자격증명 또는 설명으로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="cert-layout">
                {/* 왼쪽: 메인 카테고리 목록 */}
                <div className="tab-container">
                    {Object.keys(certData).map((category) => (
                        <button
                            key={category}
                            onClick={() => handleMainTabClick(category)}
                            className={`tab-button main-tab ${mainTab === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 가운데: 검색 결과 또는 자격증 목록 */}
                <div className="cert-list-container">
                    {searchQuery.trim() ? (
                        // 검색 결과가 있을 경우
                        <>
                            <div className="search-results-header">검색 결과 ({searchResults.length}개)</div>
                            {searchResults.length === 0 ? (
                                <div className="no-results">검색 결과가 없습니다.</div>
                            ) : (
                                searchResults.map((result, index) => (
                                    <button
                                        key={`${result.name}-${index}`}
                                        onClick={() => handleSearchResultClick(result)}
                                        className={`search-result-item ${selectedCert === result.name ? 'active' : ''}`}
                                    >
                                        <div className="search-result-name">{result.name}</div>
                                        <div className="search-result-category">
                                            {result.category}{result.subCategory ? ` > ${result.subCategory}` : ''}
                                        </div>
                                    </button>
                                ))
                            )}
                        </>
                    ) : mainTab === '민간자격' && !subTab ? (
                        // 민간자격의 경우 서브 카테고리 선택
                        Object.keys(certData[mainTab]).map((type) => (
                            <button
                                key={type}
                                onClick={() => handleSubTabClick(type)}
                                className={`tab-button sub-tab ${subTab === type ? 'active' : ''}`}
                            >
                                {type} 민간자격
                            </button>
                        ))
                    ) : mainTab === '민간자격' && subTab ? (
                        // 서브 카테고리에서 자격증 목록 표시
                        certData[mainTab][subTab].map((cert) => (
                            <button
                                key={cert}
                                onClick={() => setSelectedCert(cert)}
                                className={`tab-button cert-button ${selectedCert === cert ? 'active' : ''}`}
                            >
                                {cert}
                            </button>
                        ))
                    ) : mainTab && certData[mainTab].자격증 ? (
                        // 국가기술자격 / 국제자격 등
                        certData[mainTab].자격증.map((cert) => (
                            <button
                                key={cert}
                                onClick={() => setSelectedCert(cert)}
                                className={`tab-button cert-button ${selectedCert === cert ? 'active' : ''}`}
                            >
                                {cert}
                            </button>
                        ))
                    ) : (
                        <p>카테고리를 먼저 선택해주세요</p>
                    )}
                </div>

                {/* 오른쪽: 자격증 상세 정보 표시 */}
                <div className="cert-info">
                    {selectedCert ? (
                        <>
                            <h2 className="cert-title">{selectedCert}</h2>
                            <p className="cert-detail">
                                <span className="cert-label">설명:</span> {certDetails[selectedCert]?.설명 || '정보 없음'}
                            </p>
                            <p className="cert-detail">
                                <span className="cert-label">시행처:</span> {certDetails[selectedCert]?.시행처 || '정보 없음'}
                            </p>
                        </>
                    ) : (
                        <p>자격증을 선택해주세요</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CertInfo;
