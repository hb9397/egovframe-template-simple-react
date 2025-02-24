import React, {useState} from 'react';
import {Link} from "react-router-dom";
import URL from "../../../context/url";
import * as EgovNet from "../../../context/egovFetch";

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

    /*** User 정보 ***/
    const [user, setUser] = useState({});

    /*** 연도 셀렉트 박스 시작 ***/
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10}, (_, i) => currentYear - 10 + i);
    /*** 연도 셀렉트 박스 끝 ***/


    /*** 등록 데이터 시작***/
    const [createData, setCreateData] = useState({
        excDate: '', // 수행일자
        excPerRepName: ''  // 수행 실적 신고 명
    })

    const handelCreateData = async (e) => {
        const { name, value } = e.target;
        await setCreateData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    /*** 데이터 등록 시작***/
    const createExcPerRep = async () => {
        const apiUrl = "/api/v1/epr/insertExcPerRep.do";

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createData)
        }

        await EgovNet.requestFetch(apiUrl,
            requestOptions,
            (res)=>{
                setUser(res.result?.user);
                alert("등록되었습니다.")
                closeModal();
                window.location.reload();
            },
            (err) => {
                console.log("err response : ", err);
            })
        console.groupEnd("createExcPerRep");
    }
    /*** 데이터 등록 끝 ***/

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
                                                <select name="year_select" id="year_select" onChange={
                                                    (e) => handelCreateData({target: {name: 'excDate', value: e.target.value}})
                                                }>
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
                                                   id="writer"
                                            onChange={(e) => handelCreateData({target: {name: 'excPerRepName', value: e.target.value}})}/>
                                        </dd>
                                    </dl>
                                </div>
                            </div>

                            {/* <!-- 버튼영역 --> */}
                            <div className="board_btn_area" style={{marginTop: "10px"}}>
                                <div className="left_col btn1">
                                </div>
                                <div className="board_btn_area" style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
                                    <button style={closeButtonStyle} onClick={closeModal}>닫기</button>
                                    <button onClick={() => createExcPerRep()} className="btn btn_blue_h46" style={{ height: "46px", width: "100px", textAlign: "center", lineHeight: "46px", background: "#169bd5", color: "white", borderRadius: "5px", textDecoration: "none" }}>
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
