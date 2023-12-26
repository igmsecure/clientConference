import Article from "../components/Article";

// import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";



const ArticlePage = () => {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <section className="main">
                <div className="container">
                    <div className="main-content">
                        <Sidebar />
                        <Article />
                    </div>
                </div>
            </section>
        </>

    );
};

export default ArticlePage;