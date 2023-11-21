import {useEffect, useState} from "react";
import {requestTime, DOMAIN} from "../../config/config";
import logo from "./logo.png"

//Добавил параметр classname, до: [const AuthorImage = ({ author_id}: {author_id:number}) =>] 
const AuthorImage = ({ author_id, className}: {author_id:number, className:string}) => {

    const [img, setImg] = useState<string | undefined>(undefined);

    const fetchImage = async () => {

        try {

            if (author_id == null){
                MockImage()
                return;
            }

            const response = await fetch(`${DOMAIN}/api/authors/${author_id}/image`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok){
                MockImage()
                return;
            }

            const imageBlob = await response.blob()

            const imageObjectURL = URL.createObjectURL(imageBlob)

            setImg(imageObjectURL)

        } catch (e) {

            MockImage()

        }
    };

    const MockImage = () => {
        setImg(logo)
    }

    useEffect(() => {

        fetchImage();

    }, [])

    return (
        <div className={"author-image-container"}>
            <img className={className} src={img}/> 
        </div>
    );
}

export default AuthorImage;