import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
// import { Author } from "../config/interfaces";
// import { Dispatch } from "react";

import "../styles/Breadcrumbs.css";


const Breadcrumbs = () => {
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "authors") {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} >
                        Авторы
                    </Link>

                    <FaChevronRight className={"chevron-icon"} />

                </div>
            )
        }

        // if (currentLink.match(new RegExp('authors/(\d*)'))) {
        //     const matchResult = currentLink.match('/authors/(d*)/');
        //     return (
        //         <div className={"crumb"} key={crumb}>

        //             <Link to={currentLink}>
        //                 Автор ID
        //             </Link>

        //             <FaChevronRight className={"chevron-icon"} />

        //         </div>
        //     )
        // }


        if (crumb == "auth") {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Аккаунт
                    </Link>

                    <FaChevronRight className={"chevron-icon"} />

                </div>
            )
        }


        if (currentLink.match(new RegExp('login'))) {
            return (
                <div className="container">
                    <div className={"crumb"} key={crumb}>

                        <Link to={currentLink}>
                            Авторизация
                        </Link>

                        <FaChevronRight className={"chevron-icon"} />

                    </div>
                </div>
            )
        }

        if (currentLink.match(new RegExp('register'))) {
            return (
                <div className="container">
                    <div className={"crumb"} key={crumb}>

                        <Link to={currentLink}>
                            Регистрация
                        </Link>

                        <FaChevronRight className={"chevron-icon"} />

                    </div>
                </div>
            )
        }

        if (crumb == "article") {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} >
                        Статья
                    </Link>

                    <FaChevronRight className={"chevron-icon"} />

                </div>
            )
        }

        if (crumb == "articles") {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} >
                        Статьи
                    </Link>

                    <FaChevronRight className={"chevron-icon"} />

                </div>
            )
        }

















    });

    return (

        <div className={"breadcrumbs-wrapper"}>
            <div className={"breadcrumbs"}>

                <div className="crumb">

                    <Link to={"/"}>
                        <FaHome className={"home-icon"} />
                    </Link>

                    <FaChevronRight className={"chevron-icon"} />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;