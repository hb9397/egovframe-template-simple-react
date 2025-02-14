import React from 'react';
import {NavLink} from "react-router-dom";
import URL from "../../../context/url";

const EPMLeftExcPerRcept = () => {
    return (
        <div className="nav">
            <div className="inner">
                <h2>수행실적접수관리</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.EXC_PER_RCEPT} activeClassName="cur">수행실적접수</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default EPMLeftExcPerRcept;