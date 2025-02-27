import React, {useState} from 'react';
import {Link} from "react-router-dom";
import URL from "../../../context/url";
import * as EgovNet from "../../../context/egovFetch";

// 임시 데이터
const gradeCodeData = [
    {code: "0001", value: "A"},
    {code: "0002", value: "B"},
    {code: "0003", value: "C"},
    {code: "0004", value: "D"}
];

const PerRepCreateModal = ({closeSecondModal, selectedExcPerRepSeq}) => {

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
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '80vh',
        borderRadius: '8px',
        position: 'relative',
        overflowY: 'auto',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
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

    /*** 등록 데이터 시작 ***/
    const [createData, setCreateData] = useState({
        excPerRepSeq :  selectedExcPerRepSeq,
        servcName : "",
        servcSeCode : "",
        cntrctAmount : "",
        chargerName : "",
        servc : ""
    })

    const handleCreateData = (e) => {
        const { name, value } = e.target;

        setCreateData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const createPerRep = async () => {
        const apiUrl = "/api/v1/epr/insertPerRep.do";

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
            , body: JSON.stringify(createData)
        }

        await EgovNet.requestFetch( apiUrl,
            requestOptions,
            (res) => {
                alert("등록되었습니다.")
                closeSecondModal();
            },
            (err) => {
                console.log("err response", err)
            }
        )
        console.log("createPerRep");
    }


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
                                <h2 className="tit_2">실적신고 등록</h2>
                                <button style={closeXButtonStyle} onClick={closeSecondModal}>X</button>
                            </div>

                            {/* <!-- 상세 --> */}
                            <div className="board_view3" style={{marginTop: "10px"}}>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">용역 명</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"
                                            onChange={(e) => handleCreateData({ target : { name : "servcName", value: e.target.value}})}/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">용역구분</label></dt>
                                        <dd>
                                            <label className="f_select w_full" htmlFor="year_select">
                                                <select name="year_select" id="year_select" onChange={(e) => handleCreateData({ target : { name : "servcSeCode", value: e.target.value}})}>
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
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">용역내용</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"
                                            onChange={(e) => handleCreateData({ target : { name : "servc", value: e.target.value}})}/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">계약금액</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"
                                            onChange={(e) => handleCreateData({ target : { name : "cntrctAmount", value: e.target.value}})}/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">담당자명</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer"
                                            onChange={(e) => handleCreateData({ target : { name : "chargerName", value: e.target.value}})}/>
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
                                    <button onClick={() => createPerRep()}
                                        className="btn btn_blue_h46" style={{
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

export default PerRepCreateModal;