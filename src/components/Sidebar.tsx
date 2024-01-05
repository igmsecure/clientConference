// import React from "react";
import { FC } from 'react'
// import { Link } from "react-router-dom";
// import { SideBarItems } from "../config/sidebarItems";

import ProfileWidget from "./ProfileWidget"

import { useSelector } from 'react-redux';
import { RootState } from '../modules/store/store';

import "../styles/Sidebar.css";

const Sidebar: FC = () => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <div className="sidebar">

            {isAuth ? (
                <>
                    <h4>Ваш профиль</h4>
                    <div className="line"></div>
                    <ProfileWidget />
                </>
            ) : (
                <p className="sidibar-no-auth-text">Вы не авторизованы</p>
            )}

        </div>
    )
};

export default Sidebar;