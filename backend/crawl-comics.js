    const Nightmare = require("nightmare");
    const getRandomUserAgent = require("./src/utils/getRandomUserAgent");
    const downloadImage = require("./src/utils/downloadImage");
    const { Comic } = require("./src/models");
    const path = require("path");

    let page = 1;
    const BASE_URL = "https://nettruyenvia.com";

    async function crawlPage(page) {
        const nightmare = Nightmare({ show: false }); // show=false để nhanh hơn

        try {
            const comics = await nightmare
                .useragent(getRandomUserAgent())
                .goto(`${BASE_URL}/tim-truyen?page=${page}`)
                .wait(".items .item")
                .evaluate(() =>
                    [...document.querySelectorAll(".items .item")].map((item) => {
                        const slugs = item.querySelector(".image > a").href.split("/");
                        return {
                            name: item.querySelector("h3").innerText,
                            slug: slugs[slugs.length - 1],
                            thumbnail: item.querySelector(".image > a img")
                                .getAttribute("data-original"),
                            originalUrl: item.querySelector(".image > a").href,
                        };
                    })
                )
                .end();

            console.log(`Lấy được ${comics.length} comics ở trang ${page}`);

            // xử lý ảnh và chuẩn bị dữ liệu song song
            const processedComics = await Promise.all(
                comics.map(async (comic) => {
                    const thumbFileName = comic.thumbnail.split("/").at(-1);

                    // Đường dẫn vật lý để lưu file
                    const filePath = path.join(
                        process.cwd(),
                        "public/uploads/thumbnails",
                        thumbFileName
                    );

                    // Đường dẫn public lưu DB
                    const urlPath = `/uploads/thumbnails/${thumbFileName}`;

                    let crawlStatus = "pending";

                    try {
                        await downloadImage(comic.thumbnail, filePath, BASE_URL);
                        crawlStatus = "completed"; //tải thành công
                    } catch (err) {
                        console.error(`Lỗi tải ảnh ${comic.thumbnail}`);
                    }

                    return {
                        ...comic,
                        thumbnail: urlPath,
                        crawlStatus,
                    };
                })
            );

            // upsert tất cả trong một lượt
            for (const comic of processedComics) {
                await Comic.upsert(comic);
            }

        } catch (err) {
            console.error(`Lỗi crawl trang ${page}:`, err.message);
        }
    }

    async function start() {
        while (true) {
            await crawlPage(page);
            page++;
        }
    }

    start();
