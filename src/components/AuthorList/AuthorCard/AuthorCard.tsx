import { Link } from "react-router-dom";
import { Author } from "../../../config/interfaces";
import AuthorImage from "../../AuthorImage/AuthorImage";
import { FaPlus } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';
import { useState } from "react";
import axios from 'axios';
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules/store/store';
import { setArticleId } from "../../../modules/store/actions";

const cookies = new Cookies();


interface Article {
    id: number;
    title: string;
    annotation: string;
    description: string;
    status: string;
    review: number;
    user: number;
    moderator: number;
    creation_date: string;
    approving_date?: string;
    publication_date?: string;
    authors: Author[]; // Массив идентификаторов объектов
}




const AuthorCard = ({ author }: { author: Author }) => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isModerator = useSelector((state: RootState) => state.auth.isModerator);

    const [draftArticle, setDraftArticle] = useState<Article>();


    const dispatch = useDispatch();

    const getDraftArticle = async () => {
        try {
            const jwtTokenCookie = cookies.get("access_token");

            if (jwtTokenCookie) {
                const token = jwtTokenCookie;

                const responseArticles = await axios.get(
                    'http://127.0.0.1:8000/api/articles/',
                    {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (responseArticles.status === 200) {
                    const articlesData: Article[] = Array.isArray(responseArticles.data) ? responseArticles.data : [];
                    const articleIn = articlesData.find(article => article.status === 'Registered');
                    setDraftArticle(articleIn);
                    if (articleIn) {
                        dispatch(setArticleId(articleIn.id));
                        // setArticleId(registeredArticle.id);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }




    const addToArticle = async () => {
        try {
            const jwtTokenCookie = cookies.get("access_token");

            if (jwtTokenCookie) {
                const token = jwtTokenCookie;

                const response = await axios.post(
                    `http://127.0.0.1:8000/api/authors/${author.id}/add/`,
                    {},

                    {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {
                    getDraftArticle()
                    // navigate("/");
                } else {
                    console.error("Error: add author to article failed");
                }
                // window.location.reload();
            } else {
                console.error('Токен JWT отсутствует в куки.');
            }

        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }

    };

    const isAuthorSelected = (authorId: string) => {
        if (draftArticle) {
            const selectedAuthor = draftArticle.authors.find((author) => author.id.toString() === authorId.toString());
            return selectedAuthor !== undefined;
        }
        return false;
    };

    useEffect(() => {
        getDraftArticle()
    }, []);


    return (

        <li className="cards_item">
            <div className="card">
                <div className="card_image">
                    <AuthorImage className="" author_id={author.id} />
                </div>
                <div className="line"></div>
                <div className="card_content">
                    <h3 className="card_title">{author.middle_name} {author.first_name}  {author.last_name}</h3>
                    <div className="line"></div>

                    <ul>
                        <li className="reg-date">Дата рождения: <span>{author.date_of_birth}</span></li>
                        <li className="articles-count">Страна: <span>{author.country}</span></li>
                    </ul>

                    <div className="line"></div>


                    <div className="item-card-button">

                        {isAuth && !isModerator && (

                            <button className="btn-cart" onClick={addToArticle} disabled={isAuthorSelected(author.id.toString())}>
                                {isAuthorSelected(author.id.toString()) ? <FaCheck className="check-icon" /> : <FaPlus className="check-icon" />}
                            </button>

                        )}

                        <Link to={`/authors/${author.id}`}>
                            <button className="btn card_btn">Открыть</button>
                        </Link>
                    </div>

                </div>
            </div>
        </li>

    );
}

export default AuthorCard;