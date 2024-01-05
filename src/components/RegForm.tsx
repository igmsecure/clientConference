import React from "react";
import axios from "axios";

import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { Response } from "../config/interfaces";
import { setAuthData } from '../modules/store/authSlice';
import { errorMessage, successMessage } from "../modules/Toasts";


const cookies = new Cookies();


interface User {
    id: number | null;
    username: string | null;
    email: string | null;
    isAuthenticated: boolean;
    isModerator: boolean;
}


const RegForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (formData: FormData) => {
        try {
            const response: Response = await axios(`http://127.0.0.1:8000/api/auth/login/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                data: formData as FormData,
            });

            cookies.set("access_token", response.data["access_token"], {
                path: "/",
                expires: new Date(Date.now() + 25920000),
            });

            const user: User = {
                id: response.data["user_id"],
                username: response.data["username"],
                email: response.data["email"],
                isAuthenticated: true,
                isModerator: response.data["is_moderator"],
            };

            console.log(user);
            dispatch(setAuthData(user))

            console.log(response);
            // console.log(response.headers);
            // console.log(response.headers["set-cookies"]);

            navigate("/");
            successMessage(response.data["username"]);
        } catch {
            console.log("Не удалось авторизоваться");
            errorMessage();
        }
    };

    const register = async (formData: FormData) => {
        try {
            const response = await axios(`http://127.0.0.1:8000/api/auth/register/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                data: formData as FormData,
            });

            if (response.status == 201) {
                login(formData);
                console.log("Вы успешно зарегистрированы!");
            }
        } catch (error) {
            errorMessage();
            console.log(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: FormData = new FormData(e.target as HTMLFormElement);

        await register(formData);
    };

    return (
        <div className="auth-main-block">
            <div className="forms">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <h1 className="github-head">
                            Регистрация
                        </h1>




                        <div className="login-wrapper">
                            <div className="input-box">
                                <div className="input-label">Имя</div>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Введите имя..."
                                ></input>
                            </div>

                            <div className="input-box">
                                <div className="input-label">Email</div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Введите email..."
                                ></input>
                            </div>

                            <div className="input-box">
                                <div className="input-label">
                                    Пароль
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Введите пароль..."
                                ></input>

                            </div>
                            <Button>Зарегистрироваться</Button>



                        </div>


                        <div className="form-info">
                            <span>
                                Если у Вас уже есть аккаунт - &nbsp;
                                <Link
                                    to={"/auth/login"}
                                >
                                    Авторизируйтесь
                                </Link>
                            </span>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegForm;