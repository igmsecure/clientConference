import RegForm from "../components/RegForm";
// import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";

const RegisterPage = () => {
    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <section className="main">
                <div className="container">
                    <div className="main-content">
                        <Sidebar />
                        <RegForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterPage;