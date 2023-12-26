import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { useEffect } from "react";

import "../styles/Article.css";
import { useState } from "react";









interface Author {
    id: number;
    middle_name: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    status: string;
    country: string | null;
    city: string | null;
    affiliation: string | null;
    biography: string;
    image: string;
    time_create: string;
    last_modified: string;
}

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
    authors: Author[];
}


import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../modules/store/store';




import { clearArticleId } from "../modules/store/actions";



import { useDispatch } from "react-redux";


const Article = () => {

    const navigate = useNavigate();

    const { id } = useParams<{ id?: string }>();


    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isModerator = useSelector((state: RootState) => state.auth.isModerator);


    const [articles, setArticles] = useState<Article[]>([]);

    const dispatch = useDispatch();




    const getArticle = async (articleID: number) => {
        fetch(`http://127.0.0.1:8000/api/articles/${articleID}/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${cookies.get("access_token")}`,
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Ошибка при получении статьи");
                }
            })
            .then((data: Article) => {
                setArticles([data]);
                console.log([data]);
            })
            .catch(error => {
                console.error('Ошибка при получении заявки:', error);
            });

    }


    const handleClickAcceptArticle = async (articleID: string) => {

        try {
            fetch(`http://127.0.0.1:8000/api/articles/${articleID}/accept/`, {
                method: "PUT",
                //   withCredentials: true,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
                body: JSON.stringify({ "status": "Moderating" }),
            });
            dispatch(clearArticleId()); // очистка ID статьи
            navigate("/articles");
            // console.log(response.data);
        } catch (error) {
            console.error('Error accept application:', error);
        }
    };

    const handleClickDeleted = async (articleID: string) => {

        try {
            fetch(`http://127.0.0.1:8000/api/articles/${articleID}/delete/`, {
                method: "DELETE",
                //   withCredentials: true,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
            });
            dispatch(clearArticleId()); // очистка ID статьи
            navigate("/");
            // console.log(response.data);
        } catch (error) {
            console.error('Error deleted application:', error);
        }
    };

    const handleClickDeletedAuthorFromArticle = async (articleID: string, authorID: string) => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleID}/delete_author/${authorID}/`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
            });

            if (response.status === 200) {
                getArticle(parseInt(articleID));
            } else {
                console.error("Error: Deleting author from article failed");
            }

        } catch (error) {
            console.error('Error updating application:', error);
        }
    };


    const updateArticle = async (formData: FormData, articleID: string) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/articles/${articleID}/update/`, formData, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
            });

            if (response.status === 200) {
                console.log("Статья успешно обновлена");
                getArticle(parseInt(articleID))
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleArticleSubmit = async (e: React.FormEvent<HTMLFormElement>, articleID: string) => {
        e.preventDefault();
        const formData: FormData = new FormData(e.target as HTMLFormElement);
        await updateArticle(formData, articleID);
    };


    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    useEffect(() => {
        getArticle(parseInt(id))
    }, [])


    if (articles.length === 0) {
        return (
            <div className='right-block'>
                <div className='article'>
                    <div className="article-not-found">
                        <h3>Статья не найдена!</h3>
                    </div>
                </div>
            </div>
        )
    }


    return (

        <div className='right-block'>
            <div className='article'>
                <h3>Статья</h3>

                {isAuth ? (
                    <div className='article-item'>
                        {articles.map(article => (
                            <div key={article.id}>


                                {article.status === 'Registered' && !isModerator && (

                                    <form className="update-article-form" onSubmit={(e) => handleArticleSubmit(e, article.id.toString())}>
                                        <div className="article-input-label">Название статьи</div>
                                        <input
                                            name="title"
                                            type="text"
                                            placeholder="Введите название статьи"
                                            defaultValue={article.title}
                                        ></input>
                                        <div className="article-input-label">Аннотация статьи</div>

                                        <input
                                            name="annotation"
                                            type="text"
                                            placeholder="Введите аннотацию статьи"
                                            defaultValue={article.annotation}
                                        ></input>
                                        <div className="article-input-label">Cодержание статьи</div>

                                        <textarea
                                            name="description"
                                            placeholder="Введите содержание статьи"
                                            defaultValue={article.description}
                                        ></textarea>
                                        <button className="update-article-btn">
                                            Сохранить
                                        </button>
                                    </form>
                                )}

                                <hr></hr>
                                <br></br>

                                <div className='article-info-block'>

                                    {article.status != 'Registered' && (
                                        <div className="">
                                            <h4 className='head-text-article'>Основная информация:</h4>

                                            <p><span className='second-text-article'>ID:</span> {article.id}</p>
                                            <p><span className='second-text-article'>Название статьи:</span>  {article.title}</p>
                                            <p><span className='second-text-article'>Аннотация:</span> {article.annotation}</p>
                                            <p><span className='second-text-article'>Содержание:</span> {article.description}</p>
                                            <p><span className='second-text-article'>Результат рецензирования:</span> {article.review}</p>
                                        </div>
                                    )}

                                    <ul>
                                        {article.status === 'Registered' && (
                                            <p><span className='second-text-article'>ID статьи:</span> {article.id}</p>
                                        )}
                                        <h4 className='head-text-article'>Авторы:</h4>

                                        {article.authors.length > 0 ? (
                                            article.authors.map(author => (
                                                <li key={author.id}>
                                                    <div className="second-author-article">
                                                        <div className="second-author-article-info">
                                                            <img className="second-img-article" src={author.image}></img>
                                                            {author.middle_name} {author.first_name}
                                                        </div>
                                                        {article.status === 'Registered' && !isModerator && (
                                                            <button className="author-delete-btn" onClick={() => handleClickDeletedAuthorFromArticle(article.id.toString(), author.id.toString())}>Удалить</button>
                                                        )}
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p style={{ textAlign: 'center' }}>У данной статьи авторов нет</p>
                                        )}
                                    </ul>


                                    {article.status === 'Registered' && isAuth && !isModerator && (
                                        <div className="btn-article">
                                            <button className="accept-btn" onClick={() => handleClickAcceptArticle(article.id.toString())}>Сформировать</button>
                                            <button className="delete-btn" onClick={() => handleClickDeleted(article.id.toString())}>Удалить</button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="header-text">
                        Неавторизован
                    </div>
                )}

            </div>
        </div>

    )
}

export default Article;