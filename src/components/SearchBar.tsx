import { FC } from 'react'

import "../styles/SearchAndFilter.css";


const SearchBar: FC = () => {
    return (
        <>  
            <div className='header-filter'>

                <div className="search-container">
                    <form className="search-bar" action="#" method="GET">
                        <input type="text" className="searchTerm" placeholder="What are you looking for?"></input>
                        <button type="submit" className="searchButton">
                        <i className="fa fa-search"></i>Поиск
                        </button>
                    </form>
                </div>


                <div className="filter-container">
                <div className="date-container">
                    <label className="start-date">Начальная дата</label>
                    <input id="start-date" type="date" ></input>
                </div>
                <div className="date-container">
                    <label className="end-date">Конечная дата</label>
                    <input id="end-date" type="date"></input>
                </div>
                </div>
                
            </div>
        </>
    )
}

export default SearchBar;