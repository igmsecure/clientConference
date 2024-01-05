import AuthForm from "../components/AuthForm";


// import Header from "../components/Header/Header";
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
                        <AuthForm />
                    </div>
                </div>
            </section>
        </>


    );
};

export default AuthPage;