import React from 'react';
import {NavLink} from "react-router-dom";
import URL from "../../../context/url";

const EprLeftExcPerRep = () => {
    return (
        <div className="nav">
            <div className="inner">
                <h2>수행실적신고관리</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.EXC_PER_REP} activeClassName="cur">수행실적신고</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default EprLeftExcPerRep;