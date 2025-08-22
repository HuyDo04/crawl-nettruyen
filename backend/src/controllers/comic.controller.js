const comicService = require("../services/comic.service");
const axios = require("axios"); // Added axios

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

exports.getComicBySlug = async (req, res) => {
    try {
        const comic = await comicService.getComicBySlug(req.params.slug);
        if (comic) {
            res.json(comic);
        } else {
            res.status(404).json({ message: "Comic not found" });
        }
    } catch (error) {
        console.error("Error getting comic by slug:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getChapterDetail = async (req, res) => {
    try {
        const { comicSlug, chapterSlug } = req.params;
        const chapter = await comicService.getChapterBySlugAndComicSlug(comicSlug, chapterSlug);
        if (chapter) {
            res.json(chapter);
        } else {
            res.status(404).json({ message: "Chapter not found" });
        }
    } catch (error) {
        console.error("Error getting chapter detail:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getChapterImage = async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send("Image URL is required");
    }

    try {
        const response = await axios.get(imageUrl, {
            headers: {
                Referer: "https://nettruyenvia.com/"
            },
            responseType: "arraybuffer"
        });
        res.set("Content-Type", response.headers["content-type"] || "image/jpeg"); // Use content-type from response
        res.send(response.data);
    } catch (error) {
        console.error("Error loading chapter image:", error);
        res.status(500).send("Lỗi tải ảnh");
    }
};