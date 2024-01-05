import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import axios from "axios";
import moment from "moment";
import Cookies from "universal-cookie";
import "../../styles/ArticlesHistory.css";
import "../../styles/AuthorsTable.css";
import { iAuthorsMock } from "../../config/authorsData";
import { Author } from "../../config/interfaces";
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/store/store';
import { useNavigate } from "react-router-dom";
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

export interface ReceivedAuthorData {
    id: number;
    middle_name: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    country: string | null;
    affiliation: string | null;
    biography: string | null;
    city: string | null;
    image: string;
}

const cookies = new Cookies();

const AuthorsTable = () => {

    const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [authors, setAuthors] = useState<Author[]>([]);

    //Для получения одного автора (редактирование)


    // const [query, setQuery] = useState<string>("");
    // const [selectedStartDate, setSelectedStartDate] = useState("");
    // const [selectedEndDate, setSelectedEndDate] = useState("");

    const query = useSelector((state: RootState) => state.searchAuthors.searchQuery);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [dateUser, setDateUser] = useState("");
    const [imageUser, setImageUser] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const getAuthorsData = async () => {

        let response = null;
        let url = 'http://127.0.0.1:8000/api/authors/';
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${cookies.get("refresh_token")}`
        // };

        if (query || selectedStartDate || selectedEndDate) {
            const params = [];

            if (query) {
                params.push(`query=${query}`);
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
            response = await fetch(url);

            const jsonData = await response.json();
            const newAuthorsArr = jsonData.authors.map((raw: ReceivedAuthorData) => ({
                id: raw.id,
                middle_name: raw.middle_name,
                first_name: raw.first_name,
                last_name: raw.last_name,
                date_of_birth: raw.date_of_birth,
                country: raw.country,
                affiliation: raw.affiliation,
                image: raw.image,
                city: raw.city,
            }));
            setAuthors(newAuthorsArr);
            console.log(jsonData)
        } catch (e) {

            let filteredArray = iAuthorsMock;
            // console.log(filteredArray)

            // Поиск в верхнем и нижнем регистрах
            if (query) {
                filteredArray = filteredArray.filter((author) =>
                    author.middle_name.toLowerCase().includes(query.toLowerCase()));
                setAuthors(filteredArray);
            }
            else {
                setAuthors(filteredArray);
            }

        }
    }


    const handleClickDeleted = async (authorID: number) => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/authors/${authorID}/delete/`, {
                method: "DELETE",
                //   withCredentials: true,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
            });
            if (response.status === 200) {
                console.log("Автор успешно удален");
                getAuthorsData()
            }
            // // console.log(response.data);
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };



    const createAuthor = async (formData: FormData) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/authors/create/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
            });

            if (response.status === 201) {
                console.log("Автор успешно создан");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleArticleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();


        // Проверка на заполнение полей
        if (!firstName || !lastName || !middleName || !dateUser || !imageUser) {
            setError("Пожалуйста, заполните все поля");
            return; // Выход из функции в случае ошибки
        } else {
            const formData: FormData = new FormData(e.target as HTMLFormElement);

            await createAuthor(formData);

            // Сброс полей и сообщения об ошибке
            setFirstName("");
            setLastName("");
            setMiddleName("");
            setDateUser("")
            setImageUser("")
            setError("");
        }
    };


    const handleEditClick = (authorID: number) => {
        // Перенаправление на страницу редактирования
        navigate(`/authors/${authorID}/edit`);
    };


    useEffect(() => {
        getAuthorsData()
    }, [])

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const data = authors;
    const columns: Array<Column<{}>> = React.useMemo(
        () => [
            {
                Header: "№",
                accessor: "id",
            },
            {
                Header: "Фото",
                accessor: "image",
                Cell: ({ value }) => (
                    <img className="table-img" src={value} />
                ),
            },
            {
                Header: "Фамилия",
                accessor: "middle_name",
            },
            {
                Header: "Имя",
                accessor: "first_name",
            },
            {
                Header: "Отчество",
                accessor: "last_name",
            },
            {
                Header: "Дата рождения",
                accessor: "date_of_birth",
                Cell: ({ value }) => (
                    <span>
                        {value ? moment(value).format("DD.MM.YYYY") : "пока пусто"}
                    </span>
                ),
            },
            {
                Header: "Место работы",
                accessor: "affiliation",
            },
            {
                Header: "Редактировать",
                Cell: ({ cell: { row } }) => (
                    <div className="edit-icon" onClick={() => handleEditClick(parseInt(row.values.id))}>
                        <MdEdit style={{ color: '#1871f8' }} />
                    </div>

                )
            },
            {
                Header: "Удалить",
                Cell: ({ cell: { row } }) => (
                    <div className="delete-icon" onClick={() => handleClickDeleted(parseInt(row.values.id))}>
                        <MdDelete style={{ color: 'red' }} />
                    </div>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (

        <div className="table-main-block ">

            <div className="history">


                <button className="add-author-button" onClick={toggleModal}>
                    Добавить
                </button>


                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <form className="create-author-form" onSubmit={(e) => handleArticleSubmit(e)} >
                                <div className="create-author-input-label">Фамилия автора <span className="valid-label"> *</span></div>
                                <input
                                    name="middle_name"
                                    type="text"
                                    placeholder="Введите название статьи"
                                    onChange={(e) => setMiddleName(e.target.value)}
                                ></input>

                                <div className="create-author-input-label">Имя автора<span className="valid-label"> *</span></div>
                                <input
                                    name="first_name"
                                    type="text"
                                    placeholder="Введите имя автора"
                                    onChange={(e) => setFirstName(e.target.value)}
                                ></input>

                                <div className="create-author-input-label">Отчество автора<span className="valid-label"> *</span></div>
                                <input
                                    name="last_name"
                                    type="text"
                                    placeholder="Введите фамилию автора"
                                    onChange={(e) => setLastName(e.target.value)}
                                ></input>

                                <div className="create-author-input-label">Дата рождения <span className="valid-label"> *</span></div>
                                <input
                                    name="date_of_birth"
                                    type="date"
                                    placeholder="Введите дату рождения"
                                    onChange={(e) => setDateUser(e.target.value)}
                                ></input>

                                <div className="create-author-input-label">Страна</div>
                                <input
                                    name="country"
                                    type="text"
                                    placeholder="Введите название страны"
                                ></input>

                                <div className="create-author-input-label">Город</div>
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="Введите название города"
                                ></input>

                                <div className="create-author-input-label">Организация</div>
                                <input
                                    name="affiliation"
                                    type="text"
                                    placeholder="Введите название города"
                                ></input>

                                <div className="create-author-input-label">Биография</div>
                                <textarea
                                    name="biography"
                                    placeholder="Введите биографию автора"
                                ></textarea>

                                <div className="create-author-input-label">
                                    Картинка автора
                                    <span className="valid-label"> *</span>
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                if (typeof reader.result === 'string') {
                                                    setImageUser(reader.result);
                                                }
                                            };
                                            reader.readAsDataURL(files[0]);
                                        }
                                    }}
                                />
                                {error && <div className="error-create-author">{error}</div>} {/* Условное отображение сообщения об ошибке */}

                                <button className="create-author-btn">
                                    Создать
                                </button>
                            </form>


                            <button className="close-modal" onClick={toggleModal}>
                                Закрыть
                            </button>
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
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
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

export default AuthorsTable;