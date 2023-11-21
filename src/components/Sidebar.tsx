// import React from "react";
import { FC } from 'react'
import { Link } from "react-router-dom";
import { SideBarItems } from "../config/sidebarItems";


import "../styles/Sidebar.css";

const Sidebar: FC = () => {
    return (
        <div className="sidebar">
            <h2>Навигация</h2>
            <div className="line"></div>
                 
            <div className="line"></div>

            {SideBarItems.map((item: any, index: any) => {
            return(
                // className="btn", чтоб стили правильно работали
                <Link key = {index} className={item.cName} to = {item.url}> 
                    {item.title}
                </Link>   
            )
          })}
            {/* <a href="#" className="btn">Учебный материал №1</a>
            <a href="#" className="btn">Учебный материал №2</a>
            <a href="#" className="btn">Учебный материал №3</a> */}
        </div>
    )
};

export default Sidebar;