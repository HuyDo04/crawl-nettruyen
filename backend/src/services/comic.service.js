const { Comic, Chapter, Genre } = require("../models");

exports.getAllComic = async (page = 1, limit = 36) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Comic.findAndCountAll({
        offset,
        limit,
        order: [["id", "ASC"]],
        attributes: ["id", "name", "slug", "thumbnail", "originalUrl"],
        include: [
            {
                model: Chapter,
                as: "chapters",
                attributes: ["id", "title", "slug", "url", "number"],
            },
        ],
        distinct: true,
    }); 
    return {
        items: rows,
        total: count
    }
}

exports.getComicBySlug = async (slug) => {
    const comic = await Comic.findOne({
        where: {
            slug,
        },
        include: [
            {
                model: Chapter,
                as: "chapters",
                attributes: ["id", "title", "slug", "url", "number"],
            },
        ],
    });
    return comic;
};

exports.getChapterBySlugAndComicSlug = async (comicSlug, chapterSlug) => {
    const chapter = await Chapter.findOne({
        where: {
            slug: chapterSlug,
        },
        include: [
            {
                model: Comic,
                as: "comic",
                where: {
                    slug: comicSlug,
                },
                attributes: ["id", "name", "slug"],
            },
        ],
    });
    return chapter;
};