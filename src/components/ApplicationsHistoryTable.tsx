import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import { Response } from "../config/interfaces";
import moment from "moment";
import Cookies from "universal-cookie";

import "../styles/ArticlesHistory.css";


import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules/store/store';
import { setStatus, setStartDate, setEndDate } from '../modules/store/actions';

import { ChangeEvent } from 'react';




import { MdDone } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';

import { useNavigate } from "react-router-dom";

export type Status = '' | 'Moderating' | 'Approved' | 'Denied';


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



const cookies = new Cookies();


const ApplicationsHistoryTable = () => {


    const navigate = useNavigate();


    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isModerator = useSelector((state: RootState) => state.auth.isModerator);

    // const [status, setStatus] = useState("");
    // const [selectedStartDate, setSelectedStartDate] = useState("");
    // const [selectedEndDate, setSelectedEndDate] = useState("");











    const status = useSelector((state: RootState) => state.status);
    const selectedStartDate = useSelector((state: RootState) => state.dateRange.startDate);
    const selectedEndDate = useSelector((state: RootState) => state.dateRange.endDate);
    const dispatch = useDispatch();

    const handleStatusArticles = (event: ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        dispatch(setStatus(newStatus as Status));
        // fetchAppsData();
    };

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = event.target.value;
        dispatch(setStartDate(newStartDate));
        // fetchAppsData();
    };

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEndDate = event.target.value;
        dispatch(setEndDate(newEndDate));
        // fetchAppsData();
    };














    const [application, setApplication] = useState([]);

    const [article, setArticle] = useState<Article>();


    const getArticle = async (articleID: number) => {
        fetch(`http://127.0.0.1:8000/api/articles/${articleID}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${cookies.get("access_token")}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                // const registeredArticles = data.filter((article: Article) => article.status === 'Registered');
                setArticle(data);
            })
            .catch(error => {
                console.error('Ошибка при получении заявки:', error);
            });
    }




    const fetchAppsData = async () => {
        let url = 'http://127.0.0.1:8000/api/articles/';

        if (status || selectedStartDate || selectedEndDate) {
            const params = [];
            console.log(status)


            if (status) {
                params.push(`status=${status}`);
                // console.log(status)
            }
            if (selectedStartDate) {
                params.push(`start_date=${selectedStartDate}`);
            }
            if (selectedEndDate) {
                params.push(`end_date=${selectedEndDate}`);
            }

            url += `?${params.join('&')}`;
        }

        try {
            axios.defaults.withCredentials = true;
            const response: Response = await axios(
                url,
                {
                    method: "GET",
                    withCredentials: true,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: `Bearer ${cookies.get("access_token")}`,
                    },
                }
            );
            if (response.status == 200) {
                setApplication(response.data);
            }
        } catch (e) {
            console.log('Ошибка при получении списка заявок:', e);
        }
    };


    const handleClickApprovedArticle = async (articleID: Number) => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleID}/confirm/`, {
                method: "PUT",
                //   withCredentials: true,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
                body: JSON.stringify({ "status": "Approved" }),
            });
            if (response.status === 200) {
                console.log("Заявка принята");
                fetchAppsData()
            }
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };

    const handleClickDeniedArticle = async (articleID: Number) => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleID}/confirm/`, {
                method: "PUT",
                //   withCredentials: true,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
                body: JSON.stringify({ "status": "Denied" }),
            });
            if (response.status === 200) {
                console.log("Заявка отказана");
                fetchAppsData()
            }
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };





    // const searchArticles = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedValue = event.target.value;
    //     setStatus(selectedValue === "All" ? '' : selectedValue);
    //     console.log('Выбранное значение:', selectedValue);
    //     fetchAppsData();
    // };

    // const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSelectedStartDate(event.target.value);
    // };

    // const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSelectedEndDate(event.target.value);
    // };

    // const handleSearchButtonClick = () => {
    //     fetchAppsData()
    // }

    const handleArticleViewClick = (articleID: number) => {
        // Перенаправление на страницу редактирования
        navigate(`/article/${articleID}/`);
    };


    const [modal, setModal] = useState(false);

    const toggleModal = (articleID: number) => {
        getArticle(articleID)
        setModal(!modal);
    };

    const mainToggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    useEffect(() => {
        const interval = setInterval(fetchAppsData, 1000); // Проверка каждую секунду
        return () => clearInterval(interval);
    }, [status, selectedStartDate, selectedEndDate]);

    useEffect(() => {
        fetchAppsData();
    }, [status, selectedStartDate, selectedEndDate]);


    const data = application;
    const columns: Array<Column<{}>> = React.useMemo(
        () => [
            {
                Header: "Номер заявки",
                accessor: "id",
            },
            {
                Header: "Статус",
                accessor: "status",
                Cell: ({ value }) => {
                    let statusText = "";
                    switch (value) {
                        case 'Registered':
                            statusText = "Зарегистрирована";
                            break;
                        case 'Moderating':
                            statusText = "Проверяется";
                            break;
                        case 'Approved':
                            statusText = "Принято";
                            break;
                        case 'Denied':
                            statusText = "Отказано";
                            break;
                        case 'Deleted':
                            statusText = "Удалена";
                            break;
                        default:
                            statusText = "";
                    }
                    return <span>{statusText}</span>;
                },
            },
            {
                Header: "Дата создания",
                accessor: "creation_date",
                Cell: ({ value }) => (
                    <span>
                        {value ? moment(value).format("DD.MM.YYYY HH:mm:ss") : "пока пусто"}
                    </span>
                ),
            },
            {
                Header: "Дата формирования",
                accessor: "approving_date",
                Cell: ({ value }) => (
                    <span>
                        {value ? moment(value).format("DD.MM.YYYY HH:mm:ss") : "пока пусто"}
                    </span>
                ),
            },
            {
                Header: "Дата завершения",
                accessor: "publication_date",
                Cell: ({ value }) => (
                    <span>
                        {value ? moment(value).format("DD.MM.YYYY HH:mm:ss") : "пока пусто"}
                    </span>
                ),
            },
        ],

        []
    );

    columns.push({
        Header: "Рецензирование",
        accessor: "review",
        Cell: ({ value }) => (
            <span className="table-reviev-span">
                {value ? value : " "}
            </span>
        ),
    })

    if (isAuth && !isModerator) {
        columns.push({
            Header: "Просмотр",
            accessor: "check_button",
            Cell: ({ cell: { row } }) => (
                <div className="history-check-icon" onClick={() => handleArticleViewClick(parseInt(row.values.id))}>
                    <MdVisibility className="icon" style={{ color: '#1871f8' }} />
                </div>

            ),
        })
    }



    if (isModerator) {
        columns.push({
            Header: "",
            accessor: "check_button",
            Cell: ({ cell: { row } }) => (
                <div className="history-check-icon" onClick={() => toggleModal(parseInt(row.values.id))}>
                    <MdVisibility className="icon" style={{ color: '#1871f8' }} />
                </div>

            ),
        })

        columns.push({
            Header: "Прием",
            accessor: "accept_button",
            Cell: ({ cell: { row } }) => (
                isModerator && row.values.status == 'Moderating' && (
                    <div className="history-accept-icon" onClick={() => handleClickApprovedArticle(parseInt(row.values.id))}>
                        <MdDone className="icon" style={{ color: 'white' }} /> Принять
                    </div>
                )
            )
        })

        columns.push({
            Header: "Отказ",
            accessor: "dismiss_button",
            Cell: ({ cell: { row } }) => (
                isModerator && row.values.status == 'Moderating' && (
                    <div className="history-delete-icon" onClick={() => handleClickDeniedArticle(parseInt(row.values.id))}>
                        <MdClose className="icon" style={{ color: 'red' }} /> Отклонить
                    </div>)
            )
        })
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="article-history-main-block">
            <div className="history">

                {modal && (
                    <div className="modal">
                        <div className="overlay"></div>
                        <div className="modal-content">
                            {/* <h2>Hello Modal</h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                                perferendis suscipit officia recusandae, eveniet quaerat assumenda
                                id fugit, dignissimos maxime non natus placeat illo iusto!
                                Sapiente dolorum id maiores dolores? Illum pariatur possimus
                                quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                                placeat tempora vitae enim incidunt porro fuga ea.
                            </p> */}


                            <div className='article-info-block'>

                                <h4 className='head-text-article'>Основная информация:</h4>

                                <p><span className='second-text-article'>ID:</span> {article && article.id}</p>
                                <p><span className='second-text-article'>Название статьи:</span>  {article && article.title}</p>
                                <p><span className='second-text-article'>Аннотация:</span> {article && article.annotation}</p>
                                <p><span className='second-text-article'>Содержание:</span> {article && article.description}</p>
                                <p><span className='second-text-article'>Результат рецензирования:</span> {article && article.review}</p>
                                {/* <p><span className='second-text-article'>Статус:</span> {article && article.status}</p> */}
                                <p><span className='second-text-article'>Дата создания:</span> {article && article.creation_date}</p>
                                <p><span className='second-text-article'>Дата формирования:</span> {article && article.approving_date}</p>


                                <ul>

                                    <h4 className='head-text-article'>Авторы:</h4>
                                    {article && article.authors.length > 0 ? (
                                        article && article.authors.map(author => (
                                            <li key={author.id}>
                                                <div className="modal-second-author-article">
                                                    <img className="second-img-article" src={author.image}></img>
                                                    <span>{author.first_name} {author.last_name}</span>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p style={{ textAlign: 'center' }}>У данной статьи авторов нет</p>
                                    )}
                                </ul>
                            </div>


                            <button className="close-modal" onClick={mainToggleModal}>
                                <MdClose className="icon" style={{ color: 'white', fontSize: "16px" }} />

                            </button>
                        </div>
                    </div>
                )}



                {isModerator && (
                    <div className="article-filter">


                        <div className="article-filter-container">
                            <h5 className="article-filter-head-text">Фильтр по диапазону даты формирования</h5>

                            <div className="main-article-date-container">
                                <div className="article-date-container">
                                    <label className="start-date">Начальная дата</label>
                                    <input id="start-date" type="date"
                                        value={selectedStartDate}
                                        onChange={handleStartDateChange}
                                    ></input>
                                </div>
                                <div className="article-date-container">
                                    <label className="end-date">Конечная дата</label>
                                    <input id="end-date" type="date"
                                        value={selectedEndDate}
                                        onChange={handleEndDateChange}></input>
                                </div>
                            </div>
                            <hr></hr><br></br>
                            <h5 className="article-filter-head-text">Фильтр по статусу</h5>
                            <select id="status_select" className="article-select" value={status} onChange={handleStatusArticles}>
                                <option value="">Любой</option>
                                {isAuth && !isModerator && (
                                    <option value="Registered">Зарегистрировано</option>
                                )}
                                <option value="Moderating">Проверяется</option>
                                <option value="Approved">Принято</option>
                                <option value="Denied">Отказано</option>
                            </select>
                            <hr></hr><br></br>
                            {/* <button type="button" className="article-search-button" onClick={() => handleSearchButtonClick()}>
                                Найти
                            </button> */}
                        </div>
                    </div>
                )}




                {isAuth ? (
                    <section className="table__body">
                        <table {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>{column.render("Header")} </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr className="tbody-article-tr" {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}
                                                > {cell.render("Cell")} </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>

                ) : (
                    <p className='history-no-auth-text'>Вы не авторизованы</p>
                )}

            </div>
        </div>
    );
};

export default ApplicationsHistoryTable;