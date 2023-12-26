import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";


// проверка авторизации и сброс токена
import { Response } from "./config/interfaces";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./modules/store/store";
import { setAuthData } from './modules/store/authSlice';
// import { clearAuthData } from "./modules/store/authSlice";

import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface User {
  id: number | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isModerator: boolean;
}


// Pages
import HomePage from "./pages/HomePage.tsx";
import AuthorPage from "./pages/AuthorPage.tsx";
import ArticlesHistoryPage from "./pages/ArticlesHistoryPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";



function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);


  const refresh_token = cookies.get("refresh_token")
  const access_token = cookies.get("access_token")



  const auth = async () => {
    if (access_token) {
      try {

        const response: Response = await axios(`http://localhost:8000/api/auth/check/`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("access_token")}`,
          },
        })

        if (response.status == 200) {
          const user: User = {
            id: response.data["user_id"],
            username: response.data["username"],
            email: response.data["email"],
            isAuthenticated: true,
            isModerator: response.data["is_moderator"],
          };

          console.log(user);
          dispatch(setAuthData(user))
        }
      } catch (error) {
        refreshToken()
        console.log('access_token не действителен');
      }

    }
    // else {
    //   refreshToken()
    // }
  }

  const refreshToken = async () => {
    if (refresh_token) {
      try {

        console.log("refresh")

        const response: Response = await axios(`http://localhost:8000/api/auth/refresh/`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("refresh_token")}`,
          },
        })

        console.log("refresh22222")

        console.log(response.status)
        console.log(response.data)

        if (response.status == 201) {
          const user: User = {
            id: response.data["user_id"],
            username: response.data["username"],
            email: response.data["email"],
            isAuthenticated: true,
            isModerator: response.data["is_moderator"],
          };

          cookies.set("access_token", response.data["access_token"], {
            expires: new Date(Date.now() + 25920000),
          });

          cookies.set("refresh_token", response.data["refresh_token"], {
            expires: new Date(Date.now() + 25920000),
          });

          console.log(user);
          dispatch(setAuthData(user))
        }
      } catch (e) {
        console.log('Ошибка получения нового токена');
      }
    }
    else {
      console.log('Рефреш не найден нужна авторизация');
    }
  }

  useEffect(() => {
    if (!isAuth) {
      auth()
    }
  }, []);



  return (
    <>
      <BrowserRouter>
        <div className="App">

          <Routes>
            <Route path="/" element={<Navigate to="/authors" replace />} />
            <Route path="/authors" element={<HomePage />} />
            <Route path="/authors/:id" element={<AuthorPage />} />

            <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

            <Route path="/auth" >
              <Route path="login/" element={<AuthPage />} />
              <Route path="register/" element={<RegisterPage />} />
            </Route>

            <Route
              path="/articles"
              element={<ArticlesHistoryPage />}
            />

            <Route path="/article/:id/" element={<ArticlePage />} />


          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
