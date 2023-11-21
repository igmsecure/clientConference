import { Link, useLocation } from "react-router-dom";
import {FaHome, FaChevronRight} from "react-icons/fa";
import {Author} from "../config/interfaces";
import {Dispatch} from "react";

import "../styles/Breadcrumbs.css";


const Breadcrumbs = ({ selectedAuthor, setSelectedAuthor }: { selectedAuthor:Author | undefined, setSelectedAuthor: Dispatch<Author | undefined> }) => {
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "authors")
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={() => setSelectedAuthor(undefined)}>
                        Авторы
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('authors/(\d*)')))
        {
            return (
                <div className="container">
                    <div className={"crumb"} key={crumb}>

                        <Link to={currentLink}>
                            Автор - { selectedAuthor?.first_name}
                        </Link>

                        <FaChevronRight className={"chevron-icon"}/>

                    </div>
                </div>
            )
        }
    });

    return (

        <div className={"breadcrumbs-wrapper"}>
            <div className={"breadcrumbs"}>

                <div className="crumb">

                    <Link to={"/"}>
                        <FaHome className={"home-icon"}/>
                    </Link>

                    <FaChevronRight className={"chevron-icon"} />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;