import RegForm from "../components/RegForm";
// import Header from "../components/Header/Header";
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
                        <RegForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterPage;