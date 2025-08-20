const comicService = require("../services/comic.service");

exports.getAllComics = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;

    try {
        const result = await comicService.getAllComic(page, limit);
        res.json(result);
    } catch (error) {
        console.error("Error getting comics:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
