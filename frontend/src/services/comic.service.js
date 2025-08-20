import httpRequest from "../utils/httpRequest"

export const getAllComics = async (page = 1, limit = 36) => {
    const response = await httpRequest.get("/tim-truyen", {
        params: {
            page,
            limit,
        },
    });
    console.log("response: ", response);
    
    return response;
};
