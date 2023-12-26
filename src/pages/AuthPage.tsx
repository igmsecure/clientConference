import AuthForm from "../components/AuthForm";


// import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";



const AuthPage = () => {

    return (

        <>
            <Navbar />
            <Breadcrumbs />
            <section className="main">
                <div className="container">
                    <div className="main-content">
                        <Sidebar />
                        <AuthForm />
                    </div>
                </div>
            </section>
        </>


    );
};

export default AuthPage;