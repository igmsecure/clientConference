// import "./styles.css"
import { useEffect, useState } from "react";
import { Author } from "../../config/interfaces";
import { iAuthorsMock } from "../../config/authorsData";
import AuthorCard from "./AuthorCard/AuthorCard";
import { ChangeEvent } from 'react';
import { RootState } from '../../modules/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../modules/store/searchSlice';
import "../../styles/AuthorList.css";
import "../../styles/SearchAndFilter.css";
import Cookies from "universal-cookie";


export interface ReceivedAuthorData {
    id: number;
    middle_name: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    country: string | null;
    image: string;
}

const cookies = new Cookies();


const AuthorList = () => {

    //------------------------------MAIN----------------------------------------

    const [authors, setAuthors] = useState<Author[]>([]);
    // const [query, setQuery] = useState<string>("");
    // const [selectedStartDate, setSelectedStartDate] = useState("");
    // const [selectedEndDate, setSelectedEndDate] = useState("");
    const query = useSelector((state: RootState) => state.searchAuthors.searchQuery);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const dispatch = useDispatch();


    const getAuthorsData = async () => {

        let response = null;
        let url = 'http://127.0.0.1:8000/api/authors/';

        const headers: Record<string, string> = {};

        const accessToken = cookies.get("access_token");
        if (accessToken) {
            headers['Content-Type'] = 'application/json';
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

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
            response = await fetch(url, {
                headers: headers
            });

            const jsonData = await response.json();
            const newAuthorsArr = jsonData.authors.map((raw: ReceivedAuthorData) => ({
                id: raw.id,
                middle_name: raw.middle_name,
                first_name: raw.first_name,
                last_name: raw.last_name,
                date_of_birth: raw.date_of_birth,
                country: raw.country,
                image: raw.image,
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


    useEffect(() => {
        getAuthorsData()
    }, [])

    useEffect(() => {
        getAuthorsData()
    }, [query])

    const handleSearchButtonClick = () => {
        getAuthorsData();
    }

    // const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setQuery(event.target.value);
    // };

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value))
    };

    // const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSelectedStartDate(event.target.value);
    // };

    // const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSelectedEndDate(event.target.value);
    // };


    // ---------------------------------------------------------------------------


    const cards = authors.map(author => (
        <AuthorCard author={author} key={author.id} />
    ))

    return (

        <div className="main-block">
            <div className="disciplines">

                <div className='header-filter'>
                    <div className="search-container">
                        <form className="search-bar" action="#" method="GET">
                            <input type="text"
                                className="searchTerm"
                                placeholder="Введите фамилию автора"
                                value={query}
                                onChange={handleTitleValueChange} >
                            </input>
                            <button type="button" className="searchButton" onClick={() => handleSearchButtonClick()}>
                                Поиск
                            </button>
                        </form>
                    </div>


                    {/* <div className="filter-container">
                        <div className="date-container">
                            <label className="start-date">Начальная дата</label>
                            <input id="start-date" type="date"
                                value={selectedStartDate}
                                onChange={handleStartDateChange}
                            ></input>
                        </div>
                        <div className="date-container">
                            <label className="end-date">Конечная дата</label>
                            <input id="end-date" type="date"
                                value={selectedEndDate}
                                onChange={handleEndDateChange}></input>
                        </div>
                    </div> */}
                </div>

                <div className="main-header-text">
                    <h2>Список авторов</h2>
                </div>



                <h4 style={{ textAlign: 'center' }}>{authors.length === 0 &&
                    <p className="author-text"> Авторы не найдены</p>}
                </h4>
                <ul className="authors-item-list">
                    {cards}
                </ul>

            </div>
        </div>
    );
}

export default AuthorList;