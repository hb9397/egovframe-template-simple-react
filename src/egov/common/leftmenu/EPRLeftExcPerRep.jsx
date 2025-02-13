import React from 'react';
import {NavLink} from "react-router-dom";
import URL from "../../../context/url";

const EprLeftExcPerRep = () => {
    return (
        <div className="nav">
            <div className="inner">
                <h2>고객지원</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.EXC_PER_REP} activeClassName="cur">수행실적신고</NavLink></li>
                    {/*<li><NavLink to={""} activeClassName="cur">ㅅㄷㄴㅅ</NavLink></li>
                    <li><NavLink to={""} activeClassName="cur">서비스신청</NavLink></li>*/}
                </ul>
            </div>
        </div>
    );
};

export default EprLeftExcPerRep;