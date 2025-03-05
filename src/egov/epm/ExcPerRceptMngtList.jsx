import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {default as EgovLeftNav} from 'egov/common/leftmenu/EPMLeftExcPerRcept';
import ExcPerRceptDetailListModal from "./modal/ExcPerRceptDetailListModal";
import * as EgovNet from "../../context/egovFetch";


/*** useEffect, useState 만 사용한 데이터 조회 ***/

const ExcPerRceptListMngt = () => {

    const closeButtonStyle = {
        padding: '5px 10px',
        background: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '5px',
        textAlign: 'center',
        height: '46px',
        width: '100px',
    };

    /*** 페이지 네이션 시작 ***/
    // 페이지 네이션 정보
    const [paginationInfo, setPaginationInfo] = useState({});

    // 데이터 정보
    const [list, setList] = useState({});

    // user 정보
    const [user, setUser] = useState({});
    /*** 페이지 네이션 끝 ***/

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
        const {name, value} = e.target;
        setSearchCondition((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    /*** 데이터 검색 조건 끝 ***/

    /*** 데이터 list 불러오기 정보 시작 ***/
    const selectExcPerRepList = async () => {
        const apiUrl = "/api/v1/epr/excPerRepList.do";

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchCondition)
        }

        await EgovNet.requestFetch(apiUrl,
            requestOptions,
            (res) => {
                setUser(res.result?.user);
                setPaginationInfo(res.result?.paginationInfo);
                setList(res.result?.list);
            },
            (err) => {
                console.log("err response : ", err);
            })
        console.groupEnd("selectExcPerRepList")
    }
    /*** 데이터 list 불러오기 끝 ***/

    /*** 연도 셀렉트 박스 시작 ***/
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10}, (_, i) => currentYear - 10 + i);
    /*** 연도 셀렉트 박스 끝 ***/

    /*** 데이터 최초 조회 및 페이지네이션 시, 데이터 조회 시작 ***/
    useEffect(() => {
        selectExcPerRepList();
    }, [searchCondition.pageIndex]);
    /*** 데이터 최초 조회 및 페이지네이션 시, 데이터 조회 끝 ***/

    /*** 검색 버튼  이벤트 시작 ***/
    const onClickSearchBtn = async () => {
        setSearchCondition((prevState) => (
            {
                ...prevState,
                pageIndex: 1,
            }))
        await selectExcPerRepList()
    }
    /*** 검색 버튼  이벤트 끝 ***/

    /*** 체크박스 시작 ***/

    // 선택된 체크박스 리스트
    const [checkedItems, setCheckedItems] = useState([]);

    // 개별 체크박스 클릭 이벤트
    const handleCheckboxChange = (excPerRepSeq) => {
        setCheckedItems((prev) => prev.includes(excPerRepSeq) ?
            prev.filter((item) => item !== excPerRepSeq) : [...prev, excPerRepSeq]);
    };

    // 전체 선택/해제
    const handleSelectAll = (e) => {
        setCheckedItems(e.target.checked ? list?.map((item) => item.excPerRepSeq) : []);
    };

    /*** 체크박스 끝 ***/

    /*** 모달 시작 ***/

    const [modalStates, setModalStates] = useState({
        detailModal: false,
    }); // 모달 상태 관리

    // 모달 열기
    const openModal = (modalName, curExcPerRep) => {
        setSelectedExcPerRep(curExcPerRep);

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
    // 디테일 모달 키값
    const [selectedExcPerRep, setSelectedExcPerRep] = useState({});
    /*** 모달 끝 ***/


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
                            <h1 className="tit_1">수행실적접수관리</h1>
                        </div>

                        <h2 className="tit_2">수행실적접수</h2>

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
                                        <select name="year_select" id="year_select"
                                            onChange={(e) => handleSearchCondition({
                                                target : {
                                                    name : "searchExcDate",
                                                    value: e.target.value
                                                }
                                            })}>
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
                                        <input type="text" name="" placeholder=""
                                            onChange={(e) => handleSearchCondition({
                                                target : {
                                                    name : "searchExcPerRepName",
                                                    value: e.target.value
                                                }
                                            })}/>
                                    </span>
                                </li>
                            </ul>
                            <ul className="mt10" style={{width: "71%"}}>
                                <li className="w_full">
                                    <button
                                        className="btn btn_blue_h46 pd35 w_full"
                                        onClick={() => onClickSearchBtn()}>
                                        검색
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="board_btn_area" style={{marginTop: '20px'}}>
                            <div className="left_col btn1">
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            }}>
                                <button className="btn btn_blue_h46" style={{
                                    height: "46px",
                                    width: "100px",
                                    textAlign: "center",
                                    lineHeight: "46px",
                                    background: "#169bd5",
                                    color: "white",
                                    borderRadius: "5px",
                                    textDecoration: "none",
                                    marginRight: "0.5rem",
                                }}>
                                    승인
                                </button>
                                <button style={closeButtonStyle}>반려</button>
                            </div>
                        </div>

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD007" style={{marginTop: '20px'}}>
                            <div className="head">
                                <span>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={checkedItems.length === list.length}
                                    />
                                </span>
                                <span style={{width: '20%'}}>수행년도</span>
                                <span style={{width: '40%'}}>수행 명</span>
                                <span>진행상태</span>
                                <span>수정일시</span>
                            </div>
                            <div className="result">
                                {list.length > 0 ? (list?.map((item) => (
                                    <div key={item.excPerRepSeq} className="list_item">
                                        <div>
                                            <input
                                                type="checkbox"
                                                value={item.excPerRepSeq}
                                                checked={checkedItems.includes(item.excPerRepSeq)}
                                                onChange={() => handleCheckboxChange(item.excPerRepSeq)}
                                            />
                                        </div>
                                        <div style={{color: "blue", textDecoration: "underline", cursor: "pointer", width: '20%'}}
                                             onClick={() => openModal('detailModal', item)}>{item.excDate}</div>
                                        <div style={{width: '40%'}}>{item.excPerRepName}</div>
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
                                                    onClick={(e) => handleSearchCondition({
                                                        target:{
                                                            name : 'pageIndex',
                                                            value : 1
                                                        }
                                                    })}
                                                    className="first">
                                                처음
                                            </button>
                                        </li>

                                        {/* "이전" - Previous page button */}
                                        <li className="btn">
                                            <button disabled={searchCondition.pageIndex === 1}
                                                    onClick={(e) => handleSearchCondition({
                                                        target : {
                                                            name : 'pageIndex',
                                                            value : Math.max(searchCondition.pageIndex - 1, 1),
                                                        }
                                                    })}
                                                    className="prev">
                                                이전
                                            </button>
                                        </li>

                                        {/* Pagination buttons for each page */}
                                        {Array.from({length: paginationInfo.totalPageCount}, (_, i) => (<li key={i}>
                                            <button
                                                className={searchCondition.pageIndex === i + 1 ? "cur" : ""}
                                                onClick={(e) => handleSearchCondition({
                                                    target:{
                                                        name : 'pageIndex',
                                                        value : i + 1
                                                    }
                                                })}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>))}

                                        {/* "다음" - Next page button */}
                                        <li className="btn">
                                            <button disabled={searchCondition.pageIndex === paginationInfo?.totalPageCount}
                                                    onClick={(e) => handleSearchCondition({
                                                        target:{
                                                            name : 'pageIndex',
                                                            value: Math.min(searchCondition.pageIndex + 1, paginationInfo.totalPageCount),
                                                        }
                                                    })}
                                                    className="next">
                                                다음
                                            </button>
                                        </li>

                                        {/* "마지막" - Last page button */}
                                        <li className="btn">
                                            <button disabled={searchCondition.pageIndex === paginationInfo?.totalPageCount}
                                                    onClick={(e) => handleSearchCondition({
                                                        target:{
                                                            name : 'pageIndex',
                                                            value : paginationInfo?.totalPageCount
                                                        }
                                                    })} className="last">
                                                마지막
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {modalStates.detailModal &&
                            <ExcPerRceptDetailListModal closeModal={() => closeModal('detailModal')} excPerRep={selectedExcPerRep} reloadExcPerRepList={() => selectExcPerRepList()}/>}
                    </div>
                </div>
            </div>
        </div>);
};

export default ExcPerRceptListMngt;