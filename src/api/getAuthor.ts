import {requestTime, DOMAIN} from "../config/config";

export const getAuthor = async (authorID:number | undefined) => {
    const response = await fetch(`${DOMAIN}/api/authors/${authorID}/`, {
        method: "GET",
        signal: AbortSignal.timeout(requestTime)
    })
    return response;
};

