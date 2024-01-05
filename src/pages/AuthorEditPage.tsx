// import Header from "../components/Header/Header";
import AuthorEdit from "../components/AuthorEdit";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";



function AuthorEditPage() {


    return (
        <>

            <Navbar />
            <section className="main">
                <div className="container">
                    <Breadcrumbs />
                    <div className="main-content">
                        <AuthorEdit />
                    </div>
                </div>
            </section>

        </>
    );
}

export default AuthorEditPage;
