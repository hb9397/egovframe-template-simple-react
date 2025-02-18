import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {default as EgovLeftNav} from 'egov/common/leftmenu/EPRLeftExcPerRep';
import ExcPerRepCreateModal from "./modal/ExcPerRepCreateModal";
import ExcPerRepDetailListModal from "./modal/ExcPerRepDetailListModal";

import * as EgovNet from 'context/egovFetch';

const ExcPerRepMngtList = () => {

    /*** 데이터 검색 조건 시작***/
    // 검색 조건 상태 값
    const [searchCondition, setSearchCondition] = useState({
            searchExcPerRepName: '', // 용역명
            searchExcDate: '',       // 수행일자
            pageIndex: 1,            // 현재(요청한)페이지
            pageUnit: 10,            // 페이지 크기
        });

    // 검색 조건 상태 변경
    const handleSearchCondition = (e) => {
        const { name, value } = e.target;
        setSearchCondition((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    /*** 데이터 검색 조건 끝 ***/

    /*** 페이지 네이션 + 데이터 시작 ***/

    // 페이지 네이션 정보
    const [paginationInfo, setPaginationInfo] = useState({});

    // 데이터 정보
    const [list, setList] = useState({});

    // user 정보
    const [user, setUser] = useState({});

    /*** 페이지 네이션 + 데이터 끝 ***/

    /*** 데이터 list 불러오기 시작 ***/
    const selectExcPerRepList = async (searchCondition) => {
        console.groupCollapsed('selectExcPerRepList');

        const apiUrl = "/api/v1/epr/excPerRepList.do";

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({searchCondition})
        }

        await EgovNet.requestFetch(apiUrl,
            requestOptions,
            (res)=>{
                setUser(res.result?.user);
                setPaginationInfo(res.result?.paginationInfo);
                setList(res.result?.list);
            },
            (err) => {
                console.log("err response : ", err);
            })
        console.groupEnd("selectExcPerRepList");
    }

    /*** 데이터 list 불러오기 끝 ***/

    /*** 연도 셀렉트 박스 시작 ***/

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10}, (_, i) => currentYear - 10 + i);

    /*** 연도 셀렉트 박스 끝 ***/

    /*** 모달 시작 ***/

    const [modalStates, setModalStates] = useState({
        createModal: false, detailModal: false,
    }); // 모달 상태 관리

    // 모달 열기
    const openModal = (modalName) => {
        setModalStates((prevState) => ({
            ...prevState, [modalName]: true,
        }));
    };

    // 모달 닫기
    const closeModal = (modalName) => {
        setModalStates((prevState) => ({
            ...prevState, [modalName]: false,
        }));
    };

    /*** 모달 끝 ***/

    useEffect(() => {
        console.log("handleSearchCondition-1: " + searchCondition.pageIndex);
        selectExcPerRepList(searchCondition);
    }, [searchCondition.pageIndex]);


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
                                        padding: '1rem 1.9rem', color: '#454545', fontSize: '20px', lineHeight: '1rem',

                                    }}>
                                        수행년도
                                    </p>
                                </li>
                                <li className="third_1 L">
                                    <label className="f_select w_500" htmlFor="year_select">
                                        <select name="year_select" id="year_select">
                                            <option value="">선택안함</option>
                                            {years.map((year) => (<option key={year} value={year}>
                                                {year}
                                            </option>))}
                                        </select>
                                    </label>
                                </li>

                            </ul>
                            <ul className="mt10">
                                <li className="third_1 L">
                                    {/* <!-- 210806 수정 --> */}
                                    <p style={{
                                        padding: '1rem 2.2rem', color: '#454545', fontSize: '20px', lineHeight: '1rem',

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
                                    <button
                                        className="btn btn_blue_h46 pd35 w_full">검색
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="board_btn_area" style={{marginTop: '20px'}}>
                            <div className="left_col btn1">
                            </div>

                            <div className="right_col btn1">
                                <button style={{
                                    height: "46px",
                                    width: "8rem",
                                    textAlign: "center",
                                    lineHeight: "46px",
                                    background: "#169bd5",
                                    color: "white",
                                    borderRadius: "5px",
                                    textDecoration: "none"
                                }} onClick={() => openModal('createModal')}>수행실적 신고 등록
                                </button>
                            </div>
                        </div>

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD007" style={{marginTop: '20px'}}>
                            <div className="head">
                                <span>수행년도</span>
                                <span>수행 명</span>
                                <span>진행상태</span>
                                <span>수정일시</span>
                            </div>
                            <div className="result">
                                {list && list.length > 0 ? (list.map((item) => (
                                    <div key={item.excPerRepSeq} className="list_item">
                                        <div style={{color: "blue", textDecoration: "underline", cursor: "pointer"}}
                                             onClick={() => openModal('detailModal')}>{item.excDate}</div>
                                        <div>{item.excPerRepName}</div>
                                        <div>{item.progrsStatName}</div>
                                        <div>{item.cngDate}</div>
                                    </div>)
                                )) : (
                                    <p className="no_data">검색된 결과가 없습니다.</p>
                                )}
                            </div>

                            {/* 페이지네이션 */}
                            <div className="board_bot">
                                <div className="paging">
                                    <ul>
                                        {/* "처음" - First page button */}
                                        <li className="btn">
                                            <button disabled={searchCondition.pageIndex === 1}
                                                    onClick={(e) => handleSearchCondition({ target: { name: 'pageIndex', value: 1 } })}
                                                    className="first">
                                                처음
                                            </button>
                                        </li>

                                        {/* "이전" - Previous page button */}
                                        <li className="btn">
                                            <button disabled={searchCondition.pageIndex === 1}
                                                    onClick={(e) => handleSearchCondition({ target: { name: 'pageIndex', value: Math.max(searchCondition.pageIndex - 1, 1) } })}
                                                    className="prev">
                                                이전
                                            </button>
                                        </li>

                                        {Array.from({length: paginationInfo?.totalPageCount}, (_, i) => (<li key={i}>
                                            <button
                                                className={searchCondition.pageIndex === i + 1 ? "cur" : ""}
                                                onClick={(e) => handleSearchCondition({ target: { name: 'pageIndex', value: i + 1 } })}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>))}

                                        {/* "다음" - Next page button */}
                                        <li className="btn">
                                            <button disabled={searchCondition.pageIndex === paginationInfo?.totalPageCount}
                                                    onClick={(e) => handleSearchCondition({ target: { name: 'pageIndex', value: Math.min(searchCondition.pageIndex + 1, paginationInfo?.totalPageCount) } })}
                                                    className="next">
                                                다음
                                            </button>
                                        </li>

                                        {/* "마지막" - Last page button */}
                                        <li className="btn">
                                            <button disabled={searchCondition.pageIndex === paginationInfo?.totalPageCount}
                                                    onClick={(e) => handleSearchCondition({ target: { name: 'pageIndex', value: paginationInfo?.totalPageCount } })}
                                                    className="last">
                                                마지막
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {modalStates.detailModal &&
                            <ExcPerRepDetailListModal closeModal={() => closeModal('detailModal')}/>}
                        {modalStates.createModal &&
                            <ExcPerRepCreateModal closeModal={() => closeModal('createModal')}/>}
                    </div>
                </div>
            </div>
        </div>);
};

export default ExcPerRepMngtList;