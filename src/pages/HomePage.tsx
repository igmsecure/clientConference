
// Components
// import Header from "../components/Header/Header";
import AuthorList from "../components/AuthorList/AuthorList";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";
import { useEffect } from "react";

// Получение текущего состояния хранилища Redux
import store from '../modules/store/store';

import { useSelector } from 'react-redux';
const currentState = store.getState();
console.log(currentState);








import Cookies from "universal-cookie";

const cookies = new Cookies();



import { useDispatch } from "react-redux";



import { setArticleId, clearArticleId } from "../modules/store/actions";

function HomePage() {
    // const user = useSelector((state: RootState) => state.auth);
    // const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const articleID = useSelector((state: any) => state.article.id);

    const getAuthorsData = async () => {

        let response = null;
        let url = 'http://127.0.0.1:8000/api/authors/';

        const headers: Record<string, string> = {};

        const accessToken = cookies.get("access_token");
        if (accessToken) {
            headers['Content-Type'] = 'application/json';
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        try {
            response = await fetch(url, {
                headers: headers
            });

            const jsonData = await response.json();
            const registeredArticle = jsonData.article.find((item: any) => item.status === 'Registered');
            if (registeredArticle) {
                dispatch(setArticleId(registeredArticle.id));
            } else {
                dispatch(clearArticleId());
                console.log("Черновая заявка не найдена")
            }
            // console.log(registeredArticle.id)
        } catch (e) {

            console.log("Ошибка получения авторов")
        }
    }



    useEffect(() => {
        getAuthorsData()
    }, [])

    return (
        <>
            <Navbar articleID={articleID} />

            <Breadcrumbs />
            <section className="main">
                <div className="container">
                    <div className="main-content">
                        {/* <Sidebar /> */}

                        <AuthorList />

                    </div>
                </div>
            </section>
        </>
    )
};

export default HomePage;