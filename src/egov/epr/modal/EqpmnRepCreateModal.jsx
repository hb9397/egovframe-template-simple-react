import React from 'react';
import {Link} from "react-router-dom";
import URL from "../../../context/url";

// 임시 데이터
const gradeCodeData = [
    { code: "0001", value: "A" },
    { code: "0002", value: "B" },
    { code: "0003", value: "C" },
    { code: "0004", value: "D" }
];

const EqpmnRepCreateModal = ({closeSecondModal}) => {
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

    return (
        <div>
            <div style={modalOverlayStyle} onClick={closeSecondModal}>
                <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                    <div className="layout">
                        {/* <!--// Navigation --> */}
                        <div className="contents PDS_REG" id="contents" style={{padding: '0 10px'}}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px"
                            }}>
                                <h2 className="tit_2">장비신고 등록</h2>
                                <button style={closeXButtonStyle} onClick={closeSecondModal}>X</button>
                            </div>

                            {/* <!-- 상세 --> */}
                            <div className="board_view3" style={{marginTop: "10px"}}>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">장비 명</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">등록번호</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">규격번호</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">등급</label></dt>
                                        <dd>
                                            <label className="f_select w_full" htmlFor="year_select">
                                                <select name="year_select" id="year_select">
                                                    <option value="">선택안함</option>
                                                    {gradeCodeData.map((grade) => (
                                                        <option key={grade.code} value={grade.code}>
                                                            {grade.value}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area" style={{marginTop: "10px"}}>
                                <div className="left_col btn1">
                                </div>
                                <div className="board_btn_area" style={{
                                    marginTop: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px"
                                }}>
                                    <button style={closeButtonStyle} onClick={closeSecondModal}>닫기</button>
                                    <button className="btn btn_blue_h46" style={{
                                        height: "46px",
                                        width: "100px",
                                        textAlign: "center",
                                        lineHeight: "46px",
                                        background: "#169bd5",
                                        color: "white",
                                        borderRadius: "5px",
                                        textDecoration: "none"
                                    }}>
                                        제출
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

export default EqpmnRepCreateModal;