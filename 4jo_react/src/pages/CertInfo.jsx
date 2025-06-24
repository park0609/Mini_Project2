import React, { useState } from 'react';
import { Search, MousePointerClick, ChevronsRight } from 'lucide-react';
import './CertInfo.css';

// 외부 JSON 파일 import (카테고리 > 자격증명 > 상세정보 구조)
import certJson from '../data/CertDetails.json';

// 자격증 목록 데이터를 기존 형식에 맞춰 변환하는 함수
const buildCertList = (json) => {
    const data = {};
    for (const category in json) {
        if (category === '민간자격') { // 민간자격은 하위분류있음
            data[category] = {};
            for (const sub in json[category]) {
                data[category][sub] = Object.keys(json[category][sub]);
            }
        } else {
            data[category] = {
                자격증: Object.keys(json[category])
            };
        }
    }
    return data;
};

// 자격증 목록 객체 생성
const certData = buildCertList(certJson);

// 상세 정보 가져오는 함수
const getCertDetail = (category, subCategory, certName) => {
    if (category === '민간자격') {
        return certJson[category]?.[subCategory]?.[certName];
    } else {
        return certJson[category]?.[certName];
    }
};

const CertInfo = () => {
    const [mainTab, setMainTab] = useState(null); // 대분류 선택 상태
    const [subTab, setSubTab] = useState(null);   // 민간자격 하위 분류 상태
    const [selectedCert, setSelectedCert] = useState(null); // 선택된 자격증 이름
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 리스트

    // 검색 처리 함수 (검색어가 바뀔 때 호출됨)
    const handleSearch = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        const lowerQuery = query.toLowerCase();
        const results = [];

        for (const category in certJson) {
            if (category === '민간자격') {
                for (const sub in certJson[category]) {
                    for (const certName in certJson[category][sub]) {
                        const cert = certJson[category][sub][certName];
                        if (
                            certName.toLowerCase().includes(lowerQuery) ||
                            cert.설명?.toLowerCase().includes(lowerQuery)
                        ) {
                            results.push({ name: certName, category, subCategory: sub });
                        }
                    }
                }
            } else {
                for (const certName in certJson[category]) {
                    const cert = certJson[category][certName];
                    if (
                        certName.toLowerCase().includes(lowerQuery) ||
                        cert.설명?.toLowerCase().includes(lowerQuery)
                    ) {
                        results.push({ name: certName, category });
                    }
                }
            }
        }
        setSearchResults(results);
    };

    // 메인 카테고리 클릭 시 처리
    const handleMainTabClick = (category) => {
        setMainTab(category);
        setSubTab(null);
        setSelectedCert(null);
        setSearchQuery('');
        setSearchResults([]);
    };

    // 서브 카테고리 클릭 시 처리
    const handleSubTabClick = (sub) => {
        setSubTab(sub);
        setSelectedCert(null);
    };

    // 검색창 입력 변화 처리
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        handleSearch(value);
    };

    // 검색 결과 클릭 시 처리
    const handleSearchResultClick = (result) => {
        setSelectedCert(result.name);
        setMainTab(result.category);
        setSubTab(result.subCategory || null);
        setSearchQuery('');
        setSearchResults([]);
    };

    // 선택된 자격증 상세 정보 가져오기
    const certInfo = selectedCert ? getCertDetail(mainTab, subTab, selectedCert) : null;

    return (
        <div className="cert-container">
            {/* 검색창 */}
            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="자격증명 또는 설명으로 검색..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="search-input"
                />
            </div>

            <div className="cert-layout">
                {/* 왼쪽: 대분류 탭 */}
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

                {/* 가운데: 자격증 목록 또는 검색 결과 */}
                <div className="cert-list-container">
                    {searchQuery.trim() ? (
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
                        Object.keys(certData[mainTab]).map((sub) => (
                            <button
                                key={sub}
                                onClick={() => handleSubTabClick(sub)}
                                className={`tab-button sub-tab ${subTab === sub ? 'active' : ''}`}
                            >
                                {sub} 민간자격
                            </button>
                        ))
                    ) : mainTab === '민간자격' && subTab ? (
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

                {/* 오른쪽: 상세 정보 */}
                <div className="cert-info">
                    {selectedCert && certInfo ? (
                        <>
                            <div className="cert-header">
                                <h2 className="cert-title">{selectedCert}</h2>

                                {certInfo["시행기관"] && (
                                    <div className="cert-agency-box">
                                        <div className="cert-label">시행기관</div>
                                        <div className="cert-agency">{certInfo["시행기관"]}</div>
                                    </div>
                                )}
                            </div>

                            <div className="cert-underline" />

                            {Object.entries(certInfo).map(([key, value]) =>
                                key === "시행기관" ? null : (
                                    <p className="cert-detail" key={key}>
                                        <span className="cert-label">
                                            {key === "사이트" ? (
                                                <MousePointerClick      /* 아이콘 */
                                                    size={20}
                                                    style={{ marginRight: "6px", verticalAlign: "middle" }}
                                                />
                                            ) : (
                                                <ChevronsRight          /* 아이콘 */
                                                    size={20}
                                                    style={{ marginRight: "6px", verticalAlign: "middle" }}
                                                />
                                            )}
                                            {key}
                                        </span>
                                        <br />
                                        <span className="cert-value">
                                            {key === "사이트" ? (       /* 사이트 링크 */
                                                <a href={value} target="_blank" rel="noopener noreferrer" className="cert-link">
                                                    {value}
                                                </a>
                                            ) : (                       /* json파일 내 \n 문자들 줄바꿈 처리 */
                                                String(value).split('\n').map((line, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </span>
                                    </p>
                                )
                            )}
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
