const axios = require("axios");
const fs = require("fs");
const getRandomUserAgent = require("./getRandomUserAgent");
const path = require("path");

function ensureDirExist(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function downloadImage(url, filePath, referer) {
    try {
        const response = await axios({
            url,
            method: "GET",
            responseType: "stream",
            headers: {
                Referer: referer,
                "User-Agent": getRandomUserAgent(),
            },
        });

        ensureDirExist(filePath);
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => resolve(filePath));
            writer.on("error", reject);
        });
    } catch (err) {
        console.error(`Error downloading ${url}: ${err.message}`);
        throw err;
    }
}

module.exports = downloadImage;
