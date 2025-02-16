import React, {useState} from 'react';

// 임시 데이터
const eqpmnRepData = [
    {
        id: 3,
        serialNumber: "SN2024003",
        name: "전자정부 서버 A",
        specification: "Intel Xeon 16-core, 32GB RAM",
        registrationNumber: "REG-003",
        grade: "A"
    },
    {
        id: 2,
        serialNumber: "SN2024002",
        name: "전자정부 스토리지 B",
        specification: "SSD 2TB, RAID 5",
        registrationNumber: "REG-002",
        grade: "B"
    },
    {
        id: 1,
        serialNumber: "SN2024001",
        name: "전자정부 네트워크 장비 C",
        specification: "1Gbps 48-port Switch",
        registrationNumber: "REG-001",
        grade: "A"
    },
    {
        id: 0,
        serialNumber: "SN2024000",
        name: "테스트 장비 D",
        specification: "8-core CPU, 16GB RAM",
        registrationNumber: "REG-000",
        grade: "C"
    },
];

const perRepData = [
    {
        id: 3,
        serialNumber: "PR2024003",
        projectName: "전자정부 시스템 구축",
        projectType: "소프트웨어 개발",
        contractAmount: "₩500,000,000",
        manager: "김철수"
    },
    {
        id: 2,
        serialNumber: "PR2024002",
        projectName: "전자정부 네트워크 개선",
        projectType: "네트워크 구축",
        contractAmount: "₩300,000,000",
        manager: "이영희"
    },
    {
        id: 1,
        serialNumber: "PR2024001",
        projectName: "전자정부 데이터베이스 최적화",
        projectType: "DB 튜닝",
        contractAmount: "₩150,000,000",
        manager: "박민준"
    },
    {
        id: 0,
        serialNumber: "PR2024000",
        projectName: "테스트 프로젝트",
        projectType: "파일럿 테스트",
        contractAmount: "₩80,000,000",
        manager: "최은지"
    },
];

// 페이지 네이션
const itemsPerPage = 3

const ExcPerRceptDetailListModal = ({closeModal}) => {

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
        borderRadius: '8px', position: 'relative', overflowY: 'auto',
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

    /*** 페이지 네이션 시작 ***/
    // 현재 페이지
    const [currentEqpmnRepPage, setCurrentEqpmnRepPage] = useState(1);
    const [currentPerRepPage, setCurrentPerRepPage] = useState(1);

    // 실적신고 목록 총 페이지 수 계산
    const totalEqmnRepPages = Math.ceil(eqpmnRepData.length / itemsPerPage);
    const totalPerRepPages = Math.ceil(perRepData.length / itemsPerPage);


    // 현재 페이지에 해당하는 데이터 필터링
    const currentEqpmnRepItems = eqpmnRepData.slice((currentEqpmnRepPage - 1) * itemsPerPage, currentEqpmnRepPage * itemsPerPage);
    const currentPerRepItems = perRepData.slice((currentPerRepPage - 1) * itemsPerPage, currentPerRepPage * itemsPerPage);

    /*** 페이지 네이션 끝 ***/

    /*** 연도 선택 셀렉트 박스 시작 ***/
    // 년도 선택 셀렉트 박스
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10}, (_, i) => currentYear - 10 + i);

    /*** 연도 선택 셀렉트 박스 끝 ***/

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
                                            <label className="f_select w_full" htmlFor="year_select">
                                                <select name="year_select" id="year_select" disabled={true}
                                                        defaultValue={"2019"}>
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
                                                   id="writer" readOnly={true} defaultValue={"test"}/>
                                        </dd>
                                    </dl>
                                </div>

                                <div className="info" style={{marginBottom: "15px", borderBottom: "2px solid #222"}}>
                                    <dl>
                                        <dt>신고담당자</dt>
                                        <dd>innovate</dd>
                                    </dl>
                                    <dl>
                                        <dt>수정일</dt>
                                        <dd>2011-08-01 23:22:11</dd>
                                    </dl>
                                </div>
                                <div style={{border: "1px solid black", padding: "10px"}}>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <div><h3>장비신고 목록</h3></div>

                                    </div>
                                    <div className="board_list" style={{marginTop: "10px"}}>
                                        <div className="head">
                                            <span>장비일련번호</span>
                                            <span>장비 명</span>
                                            <span>규격</span>
                                            <span>등록번호</span>
                                            <span>등급</span>
                                        </div>

                                        <div className="result">
                                            {currentEqpmnRepItems.length > 0 ? (
                                                currentEqpmnRepItems.map((item) => (
                                                    <div key={item.id} className="list_item">
                                                        <div>{item.serialNumber}</div>
                                                        <div>{item.name}</div>
                                                        <div>{item.specification}</div>
                                                        <div>{item.registrationNumber}</div>
                                                        <div>{item.grade}</div>
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
                                                    <button disabled={currentEqpmnRepPage === 1}
                                                            onClick={() => setCurrentEqpmnRepPage(1)}
                                                            className="first">
                                                        처음
                                                    </button>
                                                </li>

                                                {/* "이전" - Previous page button */}
                                                <li className="btn">
                                                    <button disabled={currentEqpmnRepPage === 1}
                                                            onClick={() => setCurrentEqpmnRepPage((prev) => Math.max(prev - 1, 1))}
                                                            className="prev">
                                                        이전
                                                    </button>
                                                </li>

                                                {/* Pagination buttons for each page */}
                                                {Array.from({length: totalEqmnRepPages}, (_, i) => (
                                                    <li key={i}>
                                                        <button
                                                            className={currentEqpmnRepPage === i + 1 ? "cur" : ""}
                                                            onClick={() => setCurrentEqpmnRepPage(i + 1)}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}

                                                {/* "다음" - Next page button */}
                                                <li className="btn">
                                                    <button disabled={currentEqpmnRepPage === totalEqmnRepPages}
                                                            onClick={() => setCurrentEqpmnRepPage((prev) => Math.min(prev + 1, totalEqmnRepPages))}
                                                            className="next">
                                                        다음
                                                    </button>
                                                </li>

                                                {/* "마지막" - Last page button */}
                                                <li className="btn">
                                                    <button disabled={currentEqpmnRepPage === totalEqmnRepPages}
                                                            onClick={() => setCurrentEqpmnRepPage(totalEqmnRepPages)}
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
                                    </div>
                                    <div className="board_list" style={{marginTop: "10px"}}>
                                        <div className="head">
                                            <span>실적일련번호</span>
                                            <span>용역명</span>
                                            <span>용역구분명</span>
                                            <span>계약금액</span>
                                            <span>담당자</span>
                                        </div>

                                        <div className="result">
                                            {currentPerRepItems.length > 0 ? (
                                                currentPerRepItems.map((item) => (
                                                    <div key={item.id} className="list_item">
                                                        <div>{item.serialNumber}</div>
                                                        <div>{item.projectName}</div>
                                                        <div>{item.projectType}</div>
                                                        <div>{item.contractAmount}</div>
                                                        <div>{item.manager}</div>
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
                                                    <button disabled={currentPerRepPage === 1}
                                                            onClick={() => setCurrentPerRepPage(1)}
                                                            className="first">
                                                        처음
                                                    </button>
                                                </li>

                                                {/* "이전" - Previous page button */}
                                                <li className="btn">
                                                    <button disabled={currentPerRepPage === 1}
                                                            onClick={() => setCurrentPerRepPage((prev) => Math.max(prev - 1, 1))}
                                                            className="prev">
                                                        이전
                                                    </button>
                                                </li>

                                                {/* Pagination buttons for each page */}
                                                {Array.from({length: totalPerRepPages}, (_, i) => (
                                                    <li key={i}>
                                                        <button
                                                            className={currentPerRepPage === i + 1 ? "cur" : ""}
                                                            onClick={() => setCurrentPerRepPage(i + 1)}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}

                                                {/* "다음" - Next page button */}
                                                <li className="btn">
                                                    <button disabled={currentPerRepPage === totalPerRepPages}
                                                            onClick={() => setCurrentPerRepPage((prev) => Math.min(prev + 1, totalPerRepPages))}
                                                            className="next">
                                                        다음
                                                    </button>
                                                </li>

                                                {/* "마지막" - Last page button */}
                                                <li className="btn">
                                                    <button disabled={currentPerRepPage === totalPerRepPages}
                                                            onClick={() => setCurrentPerRepPage(totalPerRepPages)}
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
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcPerRceptDetailListModal;