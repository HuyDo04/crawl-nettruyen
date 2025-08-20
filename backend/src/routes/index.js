const express = require("express");
const router = express.Router();
const comicRoute = require("./comic.route")

router.use("/tim-truyen", comicRoute);

module.exports = router;
