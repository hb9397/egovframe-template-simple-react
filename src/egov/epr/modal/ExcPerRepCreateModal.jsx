import React, {useState} from 'react';
import {Link} from "react-router-dom";
import URL from "../../../context/url";

const ExcPerRepCreateModal = ({ closeModal }) => {

    // 인라인 스타일 정의
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
        width: '80%',
        maxWidth: '800px',
        borderRadius: '8px',
        position: 'relative',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '10px',
        background: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <div>
            <div style={modalOverlayStyle} onClick={closeModal}>
                <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                    <div className="container">
                        <div className="c_wrap">
                            {/* <!--// Location --> */}
                            <div className="layout">
                                {/* <!--// Navigation --> */}
                                <div className="contents PDS_REG" id="contents">
                                    {/* <!-- 본문 --> */}
                                    <div className="top_tit">
                                        <h1 className="tit_1">고객지원</h1>
                                    </div>

                                    <h2 className="tit_2">자료실</h2>

                                    {/* <!-- 상세 --> */}
                                    <div className="board_view3">
                                        <div className="tit_edit">
                                            <dl>
                                                <dt><label htmlFor="writer">프로그램명</label></dt>
                                                <dd>
                                                    <input className="f_input2 w_full" type="text" name="writer"
                                                           id="writer"/>
                                                </dd>
                                            </dl>
                                        </div>

                                        <div className="info">
                                            <dl>
                                                <dt>작성자</dt>
                                                <dd>innovate</dd>
                                            </dl>
                                            <dl>
                                                <dt>작성일</dt>
                                                <dd>2011-08-01 23:22:11</dd>
                                            </dl>
                                        </div>

                                        <div className="info2">
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
                                        </div>
                                    </div>
                                    {/* <!--// 상세 --> */}

                                    <h3 className="tit_5"><label htmlFor="pdsnm">자료설명 입력</label></h3>

                                    <div className="pds_desc_edit">
                                            <textarea className="f_txtar w_full" name="" id="pdsnm" cols="30"
                                                      rows="10"></textarea>
                                    </div>

                                    {/* <!-- 버튼영역 --> */}
                                    <div className="board_btn_area">
                                        <div className="left_col btn1">
                                        </div>

                                        <div className="right_col btn1">
                                            <Link to={URL.SUPPORT_DOWNLOAD}
                                                  className="btn btn_blue_h46 w_100">등록</Link>
                                        </div>
                                    </div>
                                    {/* <!--// 버튼영역 --> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 모달 닫기 버튼 */}
                    <button style={closeButtonStyle} onClick={closeModal}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default ExcPerRepCreateModal;
