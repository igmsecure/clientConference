import { toast } from "react-toastify";

export const successMessage = (username: string) => {
    toast.success(`Добро пожаловать, ${username}!`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const errorMessage = () => {
    toast.error(`Неправильный логин или пароль`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};

export const logOutMessage = () => {
    toast.info(`Вы вышли из аккаунта`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}

export const requestErrorMessage = () => {
    toast.error(`Что-то пошло не так`, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};
