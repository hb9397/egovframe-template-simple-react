import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import URL from "../../context/url";
import {default as EgovLeftNav} from 'egov/common/leftmenu/EPRLeftExcPerRep';
import ExcPerRepCreateModal from "./modal/ExcPerRepCreateModal";

// 임시 데이터
const data = [
    {id: 3, name: "전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037", downloads: 100, size: "16Mb", date: "2021-7-24"},
    {id: 2, name: "전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037", downloads: 100, size: "16Mb", date: "2021-7-24"},
    {id: 1, name: "전자정부표준프레임워크 인스톨러(Egovframework installer) V1.037", downloads: 100, size: "16Mb", date: "2021-7-24"},
    {id: 0, name: "테스트 소프트웨어", downloads: 50, size: "8Mb", date: "2022-1-10"},
];

// 페이지 네이션
const itemsPerPage = 3; // 한 페이지당 표시할 개수

const ExcPerRepList = () => {
    /* 페이지 네이션 시작 */

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // 현재 페이지에 해당하는 데이터 필터링
    const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    /* 페이지 네이션 끝 */

    /* 모달 시작 */

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    // 모달 열기
    const openModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };
    /* 모달 끝 */

    // 년도 선택 셀렉트 박스
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10}, (_, i) => currentYear - 10 + i);


    return (
        <div className="container">

            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to="" className="home">Home</Link></li>
                        <li><Link to="">수행실적신고관리</Link></li>
                        <li>수행실적신고</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents PDS_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">수행실적신고관리</h1>
                        </div>

                        <h2 className="tit_2">수행실적신고</h2>

                        {/* <!-- 검색조건 --> */}
                        <div className="condition">
                            <ul>
                                <li className="third_1 L">
                                    {/* <!-- 210806 수정 --> */}
                                    <p style={{
                                        padding: '1rem 1.9rem',
                                        color: '#454545',
                                        fontSize: '20px',
                                        lineHeight: '1rem',

                                    }}>
                                        수행년도
                                    </p>
                                </li>
                                <li className="third_1 L">
                                    <label className="f_select w_500" htmlFor="year_select">
                                        <select name="year_select" id="year_select">
                                            <option value="">선택안함</option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </li>

                            </ul>
                            <ul className="mt10">
                                <li className="third_1 L">
                                    {/* <!-- 210806 수정 --> */}
                                    <p style={{
                                        padding: '1rem 2.2rem',
                                        color: '#454545',
                                        fontSize: '20px',
                                        lineHeight: '1rem',

                                    }}>
                                        용역 명
                                    </p>
                                </li>
                                <li className="third_2 R">
                                    {/* <!-- 210806 수정 --> */}
                                    <span className="f_search w_500">
                                        <input type="text" name="" placeholder=""/>
                                    </span>
                                </li>
                            </ul>
                            <ul className="mt10" style={{width: "71%"}}>
                                <li className="w_full">
                                    <Link to={URL.SUPPORT_DOWNLOAD_CREATE}
                                          className="btn btn_blue_h46 pd35 w_full">검색</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="board_btn_area" style={{ marginTop: '20px' }}>
                            <div className="left_col btn1">
                            </div>

                            <div className="right_col btn1">
                                {!isModalOpen && <button onClick={openModal}>모달 열기</button>}
                            </div>
                        </div>

                        {isModalOpen && <ExcPerRepCreateModal closeModal={closeModal} />}

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD007" style={{ marginTop: '20px' }}>
                            <div className="head">
                                <span>수행년도</span>
                                <span>수행 명</span>
                                <span>진행상태</span>
                                <span>수정일시</span>
                            </div>
                            <div className="result">
                                {currentItems.length > 0 ? (
                                    currentItems.map((item) => (
                                        <Link to={`/support/download/${item.id}`} key={item.id} className="list_item">
                                            <div>{item.id}</div>
                                            <div className="al">{item.name}</div>
                                            <div>{item.downloads}</div>
                                            <div>{item.size}</div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="no_data">검색된 결과가 없습니다.</p>
                                )}
                            </div>

                            {/* 페이지네이션 */}
                            <div className="board_bot">
                                <div className="paging">
                                    <ul>
                                        {/* "처음" - First page button */}
                                        <li className="btn">
                                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}
                                                    className="first">
                                                처음
                                            </button>
                                        </li>

                                        {/* "이전" - Previous page button */}
                                        <li className="btn">
                                            <button disabled={currentPage === 1}
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    className="prev">
                                                이전
                                            </button>
                                        </li>

                                        {/* Pagination buttons for each page */}
                                        {Array.from({length: totalPages}, (_, i) => (
                                            <li key={i}>
                                                <button
                                                    className={currentPage === i + 1 ? "cur" : ""}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}

                                        {/* "다음" - Next page button */}
                                        <li className="btn">
                                            <button disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    className="next">
                                                다음
                                            </button>
                                        </li>

                                        {/* "마지막" - Last page button */}
                                        <li className="btn">
                                            <button disabled={currentPage === totalPages}
                                                    onClick={() => setCurrentPage(totalPages)} className="last">
                                                마지막
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcPerRepList;