const { Comic, Chapter } = require("../models");

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