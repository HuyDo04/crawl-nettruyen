const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comic.controller");

router.get("/", comicController.getAllComics);

module.exports = router;
