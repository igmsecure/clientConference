import { useParams } from "react-router-dom";
import { Author } from "../config/interfaces";
import axios from "axios";
import { Response } from "../config/interfaces";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


import "../styles/AuthorEdit.css";
import { useState } from "react";



const AuthorEdit = () => {
    const [author, setAuthor] = useState<Author>();
    const { id } = useParams<{ id?: string }>();


    const getAuthor = async (articleID: number) => {
        try {
            axios.defaults.withCredentials = true;
            const response: Response = await axios(
                `http://127.0.0.1:8000/api/authors/${articleID}/`,
                {
                    method: "GET",
                    withCredentials: true,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        // Authorization: `Bearer ${cookies.get("access_token")}`,
                    },
                }
            );
            if (response.status == 200) {
                console.log(response.data)
                setAuthor(response.data);
            }
        } catch (e) {
            console.log('Ошибка при получении автора:', e);
        }
    };

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    useEffect(() => {
        getAuthor(parseInt(id))
    }, [])

    useEffect(() => {
        getAuthor(parseInt(id))
    }, [])





    const updateAuthor = async (formData: FormData, authorID: number) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/authors/${authorID}/update/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
            });

            if (response.status === 200) {
                console.log("Автор успешно обновлен");
                // getAuthor()
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleArticleSubmit = async (e: React.FormEvent<HTMLFormElement>, authorID: number) => {
        e.preventDefault();

        const formData: FormData = new FormData(e.target as HTMLFormElement);

        await updateAuthor(formData, authorID);
    };





    const [image, setImage] = useState(author?.image || "");

    // Обработчик выбора файла из <input type="file">
    const handleImageUpload = (event: any) => {
        // console.log(author?.image)
        const selectedImage = event.target.files[0]; // Выбранное изображение
        const imageURL = URL.createObjectURL(selectedImage); // Создание URL для изображения
        setImage(imageURL); // Сохранение URL в состояние
    };





    return (

        <div className="author-edit-main-block">
            <div className="author">

                <h4 className='head-text-author'>Обновить информацию:</h4>

                <form className="update-author-form" onSubmit={(e) => handleArticleSubmit(e, author?.id ?? 0)}>
                    <div className="author-input-label">Фамилия автора <span className="valid-label"> *</span></div>
                    <input
                        name="middle_name"
                        type="text"
                        placeholder="Введите название статьи"
                        defaultValue={author && author.middle_name}
                    ></input>

                    <div className="author-input-label">Имя автора <span className="valid-label"> *</span></div>
                    <input
                        name="first_name"
                        type="text"
                        placeholder="Введите название статьи"
                        defaultValue={author && author.first_name}
                    ></input>

                    <div className="author-input-label">Отчество автора <span className="valid-label"> *</span></div>
                    <input
                        name="last_name"
                        type="text"
                        placeholder="Введите название статьи"
                        defaultValue={author && author.last_name}
                    ></input>

                    <div className="author-input-label">Дата рождения <span className="valid-label"> *</span></div>
                    <input
                        name="date_of_birth"
                        type="date"
                        placeholder="Введите дату рождения"
                        defaultValue={author && author.date_of_birth}
                    ></input>

                    <div className="author-input-label">Страна</div>
                    <input
                        name="country"
                        type="text"
                        placeholder="Введите название страны"
                        defaultValue={author?.country ?? ""}
                    ></input>

                    <div className="author-input-label">Город</div>
                    <input
                        name="city"
                        type="text"
                        placeholder="Введите название города"
                        defaultValue={author?.city ?? ""}
                    ></input>

                    <div className="author-input-label">Организация</div>
                    <input
                        name="affiliation"
                        type="text"
                        placeholder="Введите название города"
                        defaultValue={author?.affiliation ?? ""}
                    ></input>

                    <div className="author-input-label">Биография</div>
                    <textarea
                        name="biography"
                        placeholder="Введите биографию автора"
                        defaultValue={author && author.biography}
                    ></textarea>
                    <div className="author-input-label">Изображение <span className="valid-label"> *</span></div>
                    <div className="author-image-input-label">
                        <img className="author-info-img" src={image || author?.image} />
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageUpload}
                        // onChange={(e) => {
                        //     const files = e.target.files;
                        //     if (files && files.length > 0) {
                        //         const reader = new FileReader();
                        //         reader.onload = () => {
                        //             if (typeof reader.result === 'string') {
                        //                 setImageUser(reader.result);
                        //             }
                        //         };
                        //         reader.readAsDataURL(files[0]);
                        //     }
                        // }}
                        />
                    </div>
                    <button className="update-article-btn">
                        Сохранить
                    </button>
                </form>

            </div>
        </div>

    )
}

export default AuthorEdit;