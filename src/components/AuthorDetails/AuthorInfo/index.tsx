import {Dispatch, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {iAuthorsMock} from "../../../config/authorsData";
import { getAuthor } from '../../../api/getAuthor';
import {Author} from "../../../config/interfaces";
import AuthorImage from "../../AuthorImage/AuthorImage";

// import logo from "./Logo.png"


const AuthorInfo = ({ author_id, selectedAuthor, setSelectedAuthor }:{ author_id:number | undefined, selectedAuthor:Author| undefined, setSelectedAuthor:Dispatch<Author | undefined> }) => {


    const [isMock, setIsMock] = useState<boolean>(true);

    const fetchData = async () => {

        try {
            const response = await getAuthor(author_id);

            if (!response.ok){
                MockGroupInfo()
            }

            const author: Author = await response.json()

            setSelectedAuthor(author)
            setIsMock(false)


        } catch (e) {
            MockGroupInfo()
        }

    };

    const MockGroupInfo = () => {
        setSelectedAuthor(iAuthorsMock.find((author:Author) => author.id == author_id))
        setIsMock(true)
    }


    useEffect(() => {
        fetchData()
    }, [])


    if (!selectedAuthor){
        return (
            <div>

            </div>
        )
    }

    if (isMock){

        return (
        
            <div className="author-content">
                <header className="author-header">
                    <AuthorImage className="" author_id={selectedAuthor.id}/>
                    <div className="line"></div>
                    <div className="text">
                        <h3>{selectedAuthor.first_name} {selectedAuthor.middle_name} {selectedAuthor.last_name}</h3>
                        <ul>
                            <li>Дата рождения: <span>{selectedAuthor.date_of_birth}</span></li>
                            <li>Страна: <span>{selectedAuthor.country}</span></li>
                            <li>Город: <span>{selectedAuthor.city}</span></li>
                            <li>Место работы (учебы): <span> {selectedAuthor.affiliation}</span></li>
                        </ul>
                    </div>
                </header>
                <div className="author-content__text">
                    <h4>Подробная информация об авторе</h4>
                    <p>
                    {selectedAuthor.biography}
                    </p>
                </div>
                <Link to={`/`}>
                <button className="btn">На главную</button>
                </Link>
            </div>

        )
    }

    return (

        <div className="author-content">
            <header className="author-header">
                <AuthorImage className="" author_id={selectedAuthor.id}/>
                <div className="line"></div>
                <div className="text">
                    <h3>{selectedAuthor.first_name} {selectedAuthor.middle_name} {selectedAuthor.last_name}</h3>
                    <ul>
                        <li>Дата рождения: <span>{selectedAuthor.date_of_birth}</span></li>
                        <li>Страна: <span>{selectedAuthor.country}</span></li>
                        <li>Город: <span>{selectedAuthor.city}</span></li>
                        <li>Место работы (учебы): <span> {selectedAuthor.affiliation}</span></li>
                    </ul>
                </div>
            </header>
            <div className="author-content__text">
                <h4>Подробная информация об авторе</h4>
                <p>
                {selectedAuthor.biography}
                </p>
            </div>
            <Link to={`/`}>
                <button className="btn">На главную</button>
            </Link>
        </div>
        
    )
}

export default  AuthorInfo;