import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import { Response } from "../config/interfaces";
import moment from "moment";
import Cookies from "universal-cookie";
import "../styles/ArticlesHistory.css";


import { useSelector } from 'react-redux';
import { RootState } from '../modules/store/store';

import { MdVisibility } from 'react-icons/md';

import { useNavigate } from "react-router-dom";

export type Status = '' | 'Moderating' | 'Approved' | 'Denied';

const cookies = new Cookies();


const ApplicationsHistoryTable = () => {

    const navigate = useNavigate();


    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

    const status = useSelector((state: RootState) => state.status);
    const selectedStartDate = useSelector((state: RootState) => state.dateRange.startDate);
    const selectedEndDate = useSelector((state: RootState) => state.dateRange.endDate);


    const [application, setApplication] = useState([]);


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




    const handleArticleViewClick = (articleID: number) => {
        // Перенаправление на страницу редактирования
        navigate(`/article/${articleID}/`);
    };


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
        Header: "Ревью",
        accessor: "review",
        Cell: ({ value }) => (
            <span className="table-reviev-span">
                {value ? value : " "}
            </span>
        ),
    })

    if (isAuth) {
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



    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="right-block">
            <div className="history">

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