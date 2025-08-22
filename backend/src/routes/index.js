const express = require("express");
const router = express.Router();
const comicRoute = require("./comic.route")
const comicController = require("../controllers/comic.controller"); // Import comicController

router.use("/tim-truyen", comicRoute);
router.use("/truyen-tranh", comicRoute);
router.get("/chapter-image", comicController.getChapterImage); // Add chapter-image route here

module.exports = router;
