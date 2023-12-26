import React from "react";
// import Button from "../components/Button";
import { Response } from "../config/interfaces";

import "../styles/AuthForm.css";


import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setAuthData } from '../modules/store/authSlice';
import { toast } from "react-toastify";

const cookies = new Cookies();

interface User {
    id: number | null;
    username: string | null;
    email: string | null;
    isAuthenticated: boolean;
    isModerator: boolean;
}

const AuthForm = () => {
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

            cookies.set("refresh_token", response.data["refresh_token"], {
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


            toast.success("Вы успешно авторизовались", {
                icon: "🚀",
            });
            navigate("/");
        } catch {
            toast.error("Проверьте введенные данные", {
                icon: "😔",
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        await login(formData);
    };



    return (

        <div className="right-block">
            <div className="forms">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>


                        <h1 className="github-head">
                            Вход в личный кабинет
                        </h1>

                        <div className="login-wrapper">
                            <div className="input-box">
                                <div className="input-label">Логин</div>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Введите email..."
                                ></input>
                            </div>

                            <div className="input-box">
                                <div className="input-label">
                                    <span>Пароль</span>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Введите пароль..."
                                ></input>
                            </div>

                            {/* <Button className="submit-btn">Войти</Button> */}

                            <button className="submit-btn">
                                Войти
                            </button>
                        </div>

                        <div className="form-info">
                            <span>
                                Ещё нет аккаунта?&nbsp;
                                <Link
                                    to={"/auth/register"}
                                >
                                    Зарегистрируйтесь
                                </Link>
                            </span>
                        </div>
                    </form>


                </div>



            </div>
        </div >


















    );
};

export default AuthForm;