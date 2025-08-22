const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comic.controller");

router.get("/", comicController.getAllComics);
router.get("/:slug", comicController.getComicBySlug);
router.get("/:comicSlug/:chapterSlug", comicController.getChapterDetail);

module.exports = router;
