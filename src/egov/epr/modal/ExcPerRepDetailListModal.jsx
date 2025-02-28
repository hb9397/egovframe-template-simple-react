import React, {useEffect, useState} from 'react';
import EqpmnRepCreateModal from "./EqpmnRepCreateModal";
import PerRepCreateModal from "./PerRepCreateModal";
import * as EgovNet from "../../../context/egovFetch";

const ExcPerRepDetailListModal = ({closeModal, excPerRep}) => {

    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    };

    const modalContentStyle = {
        background: 'white',
        padding: '0 20px 20px 20px',
        width: '100%',
        maxWidth: '1500px',
        maxHeight: '90vh',
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

    /*** 페이지 네이션 정보 + 데이터 정보 시작 ***/
    // 장비 현재 페이지네이션 정보
    const [eqpmnRepPaginationInfo, setEqpmnRepPaginationInfo] = useState({});
    // 실적 현재 페이지네이션 정보
    const [perRepPaginationInfo, setPerRepPaginationInfo] = useState({});
    // 장비신고 목록
    const [eqpmnRepList, setEqpmnRepList] = useState({});
    // 실적 목록
    const [perRepList, setPerRepList] = useState({});
    /*** 페이지 네이션 정보 + 데이터 정보 끝 ***/

    /*** 데이터 조회 조건 시작***/
    // 장비
    const [inquiryEqpmnRepCondition, setInquiryEqpmnRepCondition] = useState({
            inquiryExcPerRepSeq: excPerRep?.excPerRepSeq,
            pageIndex: 1,
            pageUnit: 5,
    });
    // 실적
    const [inquiryPerRepCondition, setInquiryPerRepCondition] = useState({
        inquiryExcPerRepSeq: excPerRep?.excPerRepSeq,
        pageIndex: 1,
        pageUnit: 5,
    });
    /** 아래의 Handle 메서드들의 경우 event 를 직접받는 형태가 아닌 name, value 를 받아서 사용하도록 하거나 useCallback 으로 더 직관적으로 사용할 수 도 있음 **/
    // 장비조회 조건 상태 변경
    const handleInquiryEqpmnRepCondition = (e) => {
        const { name, value } = e.target;

        setInquiryEqpmnRepCondition((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    // 실적조회 조건 상태 변경
    const handleInquiryPerRepCondition = (e) => {
        const { name, value } = e.target;

        setInquiryPerRepCondition((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    /*** 데이터 조회 조건 끝 ***/

    /*** 데이터 list 불러오기 시작 ***/
    // 장비
    const selectEqpmnRepList = async () => {
            const apiUrl = "/api/v1/epr/eqpmnRepList.do"

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inquiryEqpmnRepCondition)
            }

            await EgovNet.requestFetch(apiUrl,
                requestOptions,
                (res) => {
                    setEqpmnRepPaginationInfo(res.result?.paginationInfo)
                    setEqpmnRepList(res.result?.list)
                },
                (err) => {
                    console.log("err response", err);
                })
            console.groupEnd("selectEqpmnRepList");
    }
    //실적
    const selectPerRepList = async () => {
        const apiUrl = "/api/v1/epr/perRepList.do";

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inquiryPerRepCondition)
        }

        await EgovNet.requestFetch(apiUrl,
            requestOptions,
            (res) => {
                setPerRepPaginationInfo(res.result?.paginationInfo);
                setPerRepList(res.result?.list);
            },
            (err) => { console.log("err response", err);
        })
        console.groupEnd("selectPerRepList");
    }
    /*** 데이터 list 불러오기 끝 ***/

    /*** 데이터 최초 조회 및 페이지네이션 시, 데이터 조회 시작 ***/
    // ExcPerRepMngtList 에서 넘어온 ExcPerRepSeq 가 업데이트 될 때, 각 조회 키워드의 excPerRepSeq 업데이트
    // 장비
    useEffect(() => {
        selectEqpmnRepList();
    }, [inquiryEqpmnRepCondition.pageIndex]);
    
    // 실적
    useEffect(() => {
        selectPerRepList();
    }, [inquiryPerRepCondition.pageIndex]);
    /*** 데이터 최초 조회 및 페이지네이션 시, 데이터 조회 끝 ***/

    /**** 데이터 삭제(SoftDelete) 시작 *****/
    /*** 체크박스 시작 ***/
    // 선택된 장비신고 체크박스 리스트
    const [checkedRegNos, setCheckedRegNos] = useState([]);

    // 개별 장비신고 체크박스 클릭 이벤트
    const handleEqpmnRepCheckboxChange = (regNo) => {
        setCheckedRegNos(
            (prevState) => prevState.includes(regNo)
                ? prevState.filter((item) => item !== regNo) : [...prevState, regNo]
        );
    };
    // 전체 장비신고 체크박스 선택/해제
    const handleSelectEqpmnRepAll = (e) => {
        setCheckedRegNos(e.target.checked ? eqpmnRepList?.map((item) => item.regNo) : []);
    };

    // 선택된 실적신고 체크박스 리스트
    const [checkedPerNos, setCheckedPerNos] = useState([]);

    // 개별 실적신고 체크박스 클릭 이벤트
    const handlePerRepCheckboxChange = (perNo) => {
        setCheckedPerNos(
            (prevState) => prevState.includes(perNo)
                ? prevState.filter((item) => item !== perNo) : [...prevState, perNo]
        );
    };

    // 전체 실적신고 체크박스 선택/해제
    const handleSelectPerRepAll = (e) => {
        setCheckedPerNos(e.target.checked ? perRepList.map((item) => item.perNo) : []);
    };
    /*** 체크박스 끝 ***/

    /*** 장비 목록 삭제 시작 ***/
    const softDeleteEqpmnReps = async () => {
        const apiUrl = "/api/v1/epr/softDelEqpmnReps.do";

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({checkedRegNos})
        }

        await EgovNet.requestFetch(apiUrl,
            requestOptions,
            (res) => {
                alert("삭제하였습니다.");
                selectEqpmnRepList();
            },
            (err) => {
                console.log("err response", err);
            });
        console.groupEnd("softDeleteEqpmnReps");
    }
    /*** 장비목록 삭제 끝 ***/

    /*** 실적목록 삭제 시작***/
    /*** 실적목록 삭제 끝***/
    /**** 데이터 삭제(SoftDelete) 끝 *****/

    /*** 모달 시작 ***/
    // 모달 상태 관리
    const [secondModalStates, setSecondModalStates] = useState({
        eqpmnRepCreateModal: false,
        perRepCreateModal: false,
    });

    // 장비, 실적 등록 모달에 넘길 excPerRepSeq
    const selectedExcPerRepSeq = excPerRep?.excPerRepSeq;

    // 모달 열기
    const openSecondModal = (modalName) => {
        setSecondModalStates((prevState) => ({
            ...prevState, [modalName]: true,
        }));
    };
    // 모달 닫기
    const closeSecondModal = (modalName) => {
        setSecondModalStates((prevState) => ({
            ...prevState, [modalName]: false,
        }));
    };
    /*** 모달 끝 ***/

    return (
        <div>
            <div style={modalOverlayStyle} onClick={closeModal}>
                <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                    <div className="layout">
                        {/* <!--// Navigation --> */}
                        <div className="contents PDS_REG" id="contents" style={{padding: '0 10px'}}>
                            <div style={{
                                position: "sticky",
                                top: 0,
                                backgroundColor: "white",
                                borderBottom: "2px solid #222",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: "80px",
                                zIndex: 10000,
                            }}>
                                <h2 className="tit_2">수행실적신고 상세보기</h2>
                                <button style={closeXButtonStyle} onClick={closeModal}>X</button>
                            </div>

                            {/* <!-- 상세 --> */}
                            <div className="board_view3" style={{marginTop: "0", borderTop: "none"}}>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">수행년도</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer" readOnly={true} defaultValue={excPerRep?.excDate}/>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="tit_edit">
                                    <dl>
                                        <dt><label htmlFor="writer">수행 명</label></dt>
                                        <dd>
                                            <input className="f_input2 w_full" type="text" name="writer"
                                                   id="writer" readOnly={true} defaultValue={excPerRep?.excPerRepName}/>
                                        </dd>
                                    </dl>
                                </div>

                                <div className="info" style={{marginBottom: "15px", borderBottom: "2px solid #222"}}>
                                    <dl>
                                        <dt>신고담당자</dt>
                                        <dd>{excPerRep?.cngId}</dd>
                                    </dl>
                                    <dl>
                                        <dt>수정일</dt>
                                        <dd>{excPerRep?.cngDate}</dd>
                                    </dl>
                                </div>
                                <div style={{border: "1px solid black", padding: "10px"}}>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <div><h3>장비신고 목록</h3></div>
                                        <div>
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
                                            }} onClick={() => openSecondModal('eqpmnRepCreateModal')}>
                                                등록
                                            </button>
                                            <button style={closeButtonStyle} onClick={softDeleteEqpmnReps}>삭제</button>
                                        </div>

                                    </div>
                                    <div className="board_list" style={{marginTop: "10px"}}>
                                        <div className="head">
                                            <span>
                                                <input
                                                    type="checkbox"
                                                    onChange={handleSelectEqpmnRepAll}
                                                    checked={checkedRegNos.length === eqpmnRepList.length}
                                                />
                                            </span>
                                            <span>장비일련번호</span>
                                            <span>장비 명</span>
                                            <span>규격</span>
                                            <span>등록번호</span>
                                            <span>등급</span>
                                        </div>

                                        <div className="result">
                                            {eqpmnRepList && eqpmnRepList.length > 0 ? (
                                                eqpmnRepList.map((item) => (
                                                    <div key={item.regNo} className="list_item">
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                value={item.regNo}
                                                                checked={checkedRegNos.includes(item.regNo)}
                                                                onChange={() => handleEqpmnRepCheckboxChange(item.regNo)}
                                                            />
                                                        </div>
                                                        <div>{item.eqpmnNo}</div>
                                                        <div>{item.eqpmnName}</div>
                                                        <div>{item.stndrd}</div>
                                                        <div>{item.regNo}</div>
                                                        <div>{item.gradeName}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no_data">검색된 결과가 없습니다.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="board_bot">
                                        <div className="paging">
                                            <ul>
                                                {/* "처음" - First page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryEqpmnRepCondition.pageIndex === 1}
                                                            onClick={(e) => handleInquiryEqpmnRepCondition(
                                                                {target : { name: "pageIndex", value: 1}}
                                                            )}
                                                            className="first">
                                                        처음
                                                    </button>
                                                </li>

                                                {/* "이전" - Previous page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryEqpmnRepCondition.pageIndex === 1}
                                                            onClick={(e) => handleInquiryEqpmnRepCondition(
                                                                {target : { name: "pageIndex", value: Math.max(inquiryEqpmnRepCondition.pageIndex - 1, 1)}}
                                                            )}
                                                            className="prev">
                                                        이전
                                                    </button>
                                                </li>

                                                {/* Pagination buttons for each page */}
                                                {Array.from({length: eqpmnRepPaginationInfo.totalPageCount}, (_, i) => (
                                                    <li key={i}>
                                                        <button
                                                            className={inquiryEqpmnRepCondition.pageIndex === i + 1 ? "cur" : ""}
                                                            onClick={(e) => handleInquiryEqpmnRepCondition(
                                                                {target : { name: "pageIndex", value: i + 1}}
                                                            )}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}

                                                {/* "다음" - Next page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryEqpmnRepCondition.pageIndex === eqpmnRepPaginationInfo.totalPageCount}
                                                            onClick={() => handleInquiryEqpmnRepCondition(
                                                                {target : { name: "pageIndex", value: Math.min(inquiryEqpmnRepCondition.pageIndex + 1, eqpmnRepPaginationInfo.totalPageCount)}}
                                                            )}
                                                            className="next">
                                                        다음
                                                    </button>
                                                </li>

                                                {/* "마지막" - Last page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryEqpmnRepCondition.pageIndex === eqpmnRepPaginationInfo.totalPageCount}
                                                            onClick={(e) => handleInquiryEqpmnRepCondition(
                                                                {target: { name: "pageIndex", value: eqpmnRepPaginationInfo.totalPageCount}}
                                                            )}
                                                            className="last">
                                                        마지막
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div style={{border: "1px solid black", padding: "10px", marginTop: "10px"}}>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <div><h3>실적신고 목록</h3></div>
                                        <div>
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
                                            }} onClick={() => openSecondModal('perRepCreateModal')}>
                                                등록
                                            </button>
                                            <button style={closeButtonStyle} onClick={closeModal}>삭제</button>
                                        </div>
                                    </div>
                                    <div className="board_list" style={{marginTop: "10px"}}>
                                        <div className="head">
                                            <span>
                                                <input
                                                    type="checkbox"
                                                    onChange={handleSelectPerRepAll}
                                                    checked={checkedPerNos.length === perRepList.length}
                                                />
                                            </span>
                                            <span>실적일련번호</span>
                                            <span>용역명</span>
                                            <span>용역구분명</span>
                                            <span>계약금액</span>
                                            <span>담당자</span>
                                        </div>

                                        <div className="result">
                                            {perRepList && perRepList.length > 0 ? (
                                                perRepList.map((item) => (
                                                    <div key={item.perNo} className="list_item">
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                value={item.perNo}
                                                                checked={checkedPerNos.includes(item.perNo)}
                                                                onChange={() => handlePerRepCheckboxChange(item.perNo)}
                                                            />
                                                        </div>
                                                        <div>{item.perNo}</div>
                                                        <div>{item.servcName}</div>
                                                        <div>{item.servcSeName}</div>
                                                        <div>{item.cntrctAmount}</div>
                                                        <div>{item.chargerName}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no_data">검색된 결과가 없습니다.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="board_bot">
                                        <div className="paging">
                                            <ul>
                                                {/* "처음" - First page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryPerRepCondition.pageIndex === 1}
                                                            onClick={(e) => handleInquiryPerRepCondition(
                                                                { target : { name: "pageIndex", value: 1} }
                                                            )}
                                                            className="first">
                                                        처음
                                                    </button>
                                                </li>

                                                {/* "이전" - Previous page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryPerRepCondition.pageIndex === 1}
                                                            onClick={(e) => handleInquiryPerRepCondition(
                                                                { target : { name: "pageIndex", value: Math.max(inquiryPerRepCondition.pageIndex - 1, 1)} }
                                                            )}
                                                            className="prev">
                                                        이전
                                                    </button>
                                                </li>

                                                {/* Pagination buttons for each page */}
                                                {Array.from({length: perRepPaginationInfo.totalPageCount}, (_, i) => (
                                                    <li key={i}>
                                                        <button
                                                            className={inquiryPerRepCondition.pageIndex === i + 1 ? "cur" : ""}
                                                            onClick={(e) => handleInquiryPerRepCondition(
                                                                {target: { name: "pageIndex", value: i + 1 }}
                                                            )}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}

                                                {/* "다음" - Next page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryPerRepCondition.pageIndex === perRepPaginationInfo.totalPageCount}
                                                            onClick={() => handleInquiryPerRepCondition(
                                                                { target: { name: "pageIndex", value: Math.min(inquiryPerRepCondition.pageIndex + 1, perRepPaginationInfo.totalPageCount)}}
                                                            )}
                                                            className="next">
                                                        다음
                                                    </button>
                                                </li>

                                                {/* "마지막" - Last page button */}
                                                <li className="btn">
                                                    <button disabled={inquiryPerRepCondition.pageIndex === perRepPaginationInfo.totalPageCount}
                                                            onClick={(e) => handleInquiryPerRepCondition(
                                                                { target: { name: "pageIndex", value: perRepPaginationInfo.totalPageCount } }
                                                            )}
                                                            className="last">
                                                        마지막
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
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
                                    <button style={closeButtonStyle} onClick={closeModal}>닫기</button>
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
            {secondModalStates.eqpmnRepCreateModal &&
                <EqpmnRepCreateModal closeSecondModal={() => closeSecondModal('eqpmnRepCreateModal')} selectedExcPerRepSeq={selectedExcPerRepSeq} reloadEqpmnList={() => selectEqpmnRepList()}/>}
            {secondModalStates.perRepCreateModal &&
                <PerRepCreateModal closeSecondModal={() => closeSecondModal('perRepCreateModal')} selectedExcPerRepSeq={selectedExcPerRepSeq} reloadPerRepList={() => selectPerRepList()}/>}
        </div>
    );
};

export default ExcPerRepDetailListModal;