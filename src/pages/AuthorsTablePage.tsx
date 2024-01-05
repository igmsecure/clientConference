import AuthorsTable from "../components/AuthorsTable/AuthorsTable";
import Breadcrumbs from "../components/Breadcrumbs";
import { Navbar } from "../components/Navbar/Navbar";
import { useEffect } from "react";
import store from '../modules/store/store';
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { setArticleId, clearArticleId } from "../modules/store/actions";
import { useSelector } from 'react-redux';
import { RootState } from '../modules/store/store';

const currentState = store.getState();
console.log(currentState);



const cookies = new Cookies();


function AuthorsTablePage() {
    // const user = useSelector((state: RootState) => state.auth);
    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isModerator = useSelector((state: RootState) => state.auth.isModerator);

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

                        {isAuth && isModerator ? (
                            <AuthorsTable />
                        ) : (
                            <h4>У вас нет доступа к данной странице!</h4>
                        )}

                    </div>
                </div>
            </section>
        </>
    )
};

export default AuthorsTablePage;