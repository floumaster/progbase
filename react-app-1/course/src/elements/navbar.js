import React from 'react';


export default function navbar(){
    return(
        <nav className="navbar dark-grey" id="menu">
            <div className="logo" id="logo">
                <a className="logo" href="#main">iDisbalance</a>
            </div>
            <ul className="link-items">
                <li className="link-item">
                    <a href="#chart">Research topic</a>
                </li>
                <li className="link-item">
                    <a href="#generate">Generate data</a>
                </li>
                <li className="link-item">
                    <a href="#about">About me</a>
                </li>
            </ul>
        </nav>
        );
}