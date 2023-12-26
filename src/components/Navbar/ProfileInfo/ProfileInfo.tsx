import { useDispatch, useSelector } from "react-redux";
import styles from "./ProfileInfo.module.scss";
import { RootState } from "../../../modules/store/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearAuthData } from "../../../modules/store/authSlice";
import { toast } from "react-toastify";

import Cookies from "universal-cookie";
const cookies = new Cookies();

import { clearArticleId } from "../../../modules/store/actions";


const ProfileInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logout = async () => {
        try {
            await axios(`http://localhost:8000/api/auth/logout/`, {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${cookies.get("access_token")}`,
                },
            });
            cookies.remove("access_token", { path: "/" });
            cookies.remove("refresh_token", { path: "/" });

            dispatch(clearAuthData());
            dispatch(clearArticleId());
            toast.success("Выход выполнен успешно", {
                icon: "🚀",
            });

            navigate("/");
        } catch {
            console.log("Ошибка при выходе из аккаунта");
        }
    };

    const handleSubmit = async () => {
        await logout();
    };

    const user = useSelector((state: RootState) => state.auth);
    if (!user.isAuthenticated) {
        return (
            <div className={styles.menu}>
                <span>Упс...Кажется, Вы забыли&nbsp;</span>
                <Link to="/auth">
                    <span className={styles.menu__login}>авторизоваться</span>
                </Link>
            </div>
        );
    }


    return (
        <div className={`${styles.menu} ${styles.menu__info}`}>
            <div>Имя: {user.username}</div>
            <div>Логин: {user.email}</div>
            <div className={styles.menu__login} onClick={handleSubmit}>
                Выйти
            </div>
        </div>
    );
};

export default ProfileInfo;