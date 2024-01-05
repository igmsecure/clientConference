import AuthorInfo from "./AuthorInfo/";
import { useParams } from "react-router-dom";
import { Author } from "../../config/interfaces";
import { Dispatch } from "react";

import "../../styles/AuthorDetails.css";



const AuthorDetails = ({ selectedAuthor, setSelectedAuthor }: { selectedAuthor: Author | undefined, setSelectedAuthor: Dispatch<Author | undefined> }) => {
    const { id } = useParams<{ id?: string }>();

    if (id == undefined) {
        return (
            <div>404</div>
        )
    }

    return (

        <div className="author-detail-main-block">
            <div className="author">
                <AuthorInfo author_id={parseInt(id)} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} />
            </div>
        </div>

    )
}

export default AuthorDetails;