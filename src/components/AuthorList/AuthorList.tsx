// import "./styles.css"
import {useEffect, useState} from "react";
import {Author} from "../../config/interfaces";
import {iAuthorsMock} from "../../config/authorsData";
import AuthorCard from "./AuthorCard/AuthorCard";
// import SearchBar from "../SearchBar/index";
import { ChangeEvent } from 'react';
// import {FaSearch} from "react-icons/fa";

import "../../styles/AuthorList.css";
import "../../styles/SearchAndFilter.css";


export interface ReceivedAuthorData {
    id: number;
    middle_name: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    country: string | null;
    image: string ;
}


const AuthorList = () => {


//------------------------------MAIN----------------------------------------

    const [authors, setAuthors] = useState<Author[]>([]);

    const [query, setQuery] = useState<string>("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");


    const getAuthorsData = async () => {

        let response = null;
        let url = 'http://127.0.0.1:8000/api/authors/';

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
                image: raw.image,
            }));
            setAuthors(newAuthorsArr);
        } catch (e) {

            let filteredArray = iAuthorsMock;
            // console.log(filteredArray)

            // Поиск в верхнем и нижнем регистрах
            if (query) {
                filteredArray = filteredArray.filter((author) => 
                author.middle_name.toLowerCase().includes(query.toLowerCase()));
                setAuthors(filteredArray);
            }
            else{
                setAuthors(filteredArray);
            }
     
        }
    }


    useEffect(() => {
        getAuthorsData()
    }, [ ])

    const handleSearchButtonClick = () => {
        getAuthorsData();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedStartDate(event.target.value);
    };

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedEndDate(event.target.value);
    };


    // ---------------------------------------------------------------------------


    const cards = authors.map(author  => (
        <AuthorCard author={author} key={author.id}/>
    ))

    return (

        <div className="right-block">
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
                            {/* <FaSearch className={"search-icon"}/> */}
                            </button>
                        </form>
                    </div>

                    <div className="filter-container">
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
                    </div>
                </div>

                <header className="main-header">
                            <h2>Список авторов</h2>   
                </header>

                <h4 style={{textAlign: 'center'}}>{authors.length === 0 && 
                    <p className="author-text"> Авторы не найдены</p>}
                </h4>   

                { cards }  
            </div>
        </div>    
    );
}

export default AuthorList;