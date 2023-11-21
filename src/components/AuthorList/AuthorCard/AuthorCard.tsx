import {Link} from "react-router-dom";
import {Author} from "../../../config/interfaces";
import AuthorImage from "../../AuthorImage/AuthorImage";

const AuthorCard = ({ author }: { author: Author}) => {

    

    return ( 
    
            <div className="discipline-item">
                
                <AuthorImage className="" author_id={author.id}/>
                {/* <img src="https://via.placeholder.com/150" alt=""></img> */}
                
                <div className="line"></div>
                <div className="text">
                    <h3>
                        {author.first_name} {author.middle_name} {author.last_name}
                    </h3>
                    
                    <ul>
                        <li className="reg-date">Дата рождения: <span>{author.date_of_birth}</span></li>
                        <li className="articles-count">Страна: <span>{author.country}</span></li>
                    </ul>
                </div>
                            
                <Link to={`/authors/${author.id}`}>
                    <button className="btn">Открыть</button>
                </Link>

            </div>
                       
    );
}

export default AuthorCard;