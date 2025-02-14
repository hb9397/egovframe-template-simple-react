import React, {useState} from 'react';
import {Link} from "react-router-dom";
import URL from "../../../context/url";

const ExcPerRepCreateModal = ({closeModal}) => {

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)', // 반투명한 배경
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    };

    const modalContentStyle = {
        background: 'white',
        padding: '20px',
        width: '90%', // 기본적으로 넓게 설정
        maxWidth: '1000px', // 최대 크기 제한
        maxHeight: '80vh', // 화면의 80% 이상을 넘지 않도록 제한
        borderRadius: '8px',
        position: 'relative',
        overflowY: 'auto', // 내용이 많을 경우 스크롤 가능하도록
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', // 그림자 추가
    };

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

    const closeXButtonStyle = {
        background: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '5px',
        textAlign: 'center',
        height: '2rem',
        width: '2rem',
    };

    // 년도 선택 셀렉트 박스
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10}, (_, i) => currentYear - 10 + i);


    return (
        <div>
            <div style={modalOverlayStyle} onClick={closeModal}>
                <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                    <div className="layout">
                        {/* <!--// Navigation --> */}
                        <div className="contents PDS_REG" id="contents" style={{padding: '0 10px'}}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                <h2 className="tit_2">수행실적신고 등록</h2>
                                <button style={closeXButtonStyle} onClick={closeModal}>X</button>
                            </div>

                            {/* <!-- 상세 --> */}
                            <div className="board_view3" style={{marginTop: "10px"}}>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">수행년도</label></dt>
                                        <dd>
                                            <label className="f_select w_full" htmlFor="year_select">
                                                <select name="year_select" id="year_select">
                                                    <option value="">선택안함</option>
                                                    {years.map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">수행 명</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"/>
                                        </dd>
                                    </dl>
                                </div>

                                {/*<div className="info">
                                    <dl>
                                        <dt>작성자</dt>
                                        <dd>innovate</dd>
                                    </dl>
                                    <dl>
                                        <dt>작성일</dt>
                                        <dd>2011-08-01 23:22:11</dd>
                                    </dl>
                                </div>*/}

                                {/*<div className="info2">
                                    <div className="left_col">
                                        <img src="/assets/images/sample_pds_list.png" alt=""/>
                                        <p className="guide">
                                            썸네일 이미지는<br/>
                                            width : 160px, height : 109px<br/>
                                            크기의 이미지를 올려주세요
                                        </p>
                                    </div>
                                    <div className="right_col">
                                        <dl>
                                            <dt><label htmlFor="ip1">운영체제</label></dt>
                                            <dd>
                                                <input className="f_input2 w_full" type="text" name="writer"
                                                       id="ip1"/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><label htmlFor="ip2">권장사양</label></dt>
                                            <dd>
                                                <input className="f_input2 w_full" type="text" name="writer"
                                                       id="ip2"/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><label htmlFor="ip4">파일정보</label></dt>
                                            <dd>
                                                <input className="w_full" type="file" name="" id="ip4"/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><label htmlFor="ip5">등록일자</label></dt>
                                            <dd>
                                                <input className="f_input2 w_full" type="text" name="writer"
                                                       id="ip5"/>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt><label htmlFor="ip6">언어</label></dt>
                                            <dd>
                                                <input className="f_input2 w_full" type="text" name="writer"
                                                       id="ip6"/>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>*/}
                            </div>
                            {/* <!--// 상세 --> */}

                            {/*<h3 className="tit_5"><label htmlFor="pdsnm">자료설명 입력</label></h3>

                            <div className="pds_desc_edit">
                                            <textarea className="f_txtar w_full" name="" id="pdsnm" cols="30"
                                                      rows="10"></textarea>
                            </div>*/}

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area" style={{marginTop: "10px"}}>
                                <div className="left_col btn1">
                                </div>
                                <div className="board_btn_area" style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
                                    <button style={closeButtonStyle} onClick={closeModal}>닫기</button>
                                    <button className="btn btn_blue_h46" style={{ height: "46px", width: "100px", textAlign: "center", lineHeight: "46px", background: "#169bd5", color: "white", borderRadius: "5px", textDecoration: "none" }}>
                                        등록
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcPerRepCreateModal;
