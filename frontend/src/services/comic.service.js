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

export const getComicBySlug = async (slug) => {
    const response = await httpRequest.get(`/truyen-tranh/${slug}`);
    return response;
};

export const getChapterDetail = async (comicSlug, chapterSlug) => {
    const response = await httpRequest.get(`/truyen-tranh/${comicSlug}/${chapterSlug}`);
    
    // Explicitly parse response.content if it's a string
    if (response && response.content && typeof response.content === 'string') {
        try {
            response.content = JSON.parse(response.content);
        } catch (e) {
            console.error("Error parsing chapter content:", e);
            response.content = []; 
        }
    }

    if (response && Array.isArray(response.content)) { 
        response.content = response.content.map(imageUrl => {
            return `/api/v1/chapter-image?url=${encodeURIComponent(imageUrl)}`;
        });
    }
    return response;
};
