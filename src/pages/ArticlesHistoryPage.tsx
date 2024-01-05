import ApplicationsHistoryTable from "../components/ApplicationsHistoryTable";

// import Header from "../components/Header/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";



const ArticlesHistoryPage = () => {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <section className="main">
                <div className="container">
                    <div className="main-content">
                        {/* <Sidebar /> */}
                        <ApplicationsHistoryTable />
                    </div>
                </div>
            </section>
        </>

    );
};

export default ArticlesHistoryPage;