// import React from "react";
import { useState } from "react";
import { Author } from "../config/interfaces";


import Sidebar from "../components/Sidebar";
import AuthorList from "../components/AuthorList/AuthorList";
import Breadcrumbs from "../components/Breadcrumbs";



function HomePage() {

    const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined)


    return (
        <>
            {/* <Navbar/> */}
            <Breadcrumbs selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} />
            <section className="main">
                <div className="container">
                    <div className="main-content">
                        <Sidebar />
                        <AuthorList />
                    </div>
                </div>
            </section>
        </>
    )
};

export default HomePage;