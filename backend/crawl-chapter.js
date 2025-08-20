const puppeteer = require("puppeteer");
const { Comic, Chapter } = require("./src/models");
const slugify = require("slugify");

async function crawlChapters(comic) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`\n📖 Đang crawl chapters cho truyện: ${comic.name}`);
    await page.goto(comic.originalUrl, { waitUntil: "domcontentloaded" });

    // ✅ Load hết tất cả chapters
    console.log("✅ Đang load toàn bộ chapters...");
    let hasMore = true;
    while (hasMore) {
      hasMore = await page.evaluate(() => {
        const btn = document.querySelector("a.view-more");
        if (btn && btn.offsetParent !== null) {
          btn.click();
          return true;
        }
        return false;
      });
    
      if (hasMore) {
        console.log("👉 Click xem thêm...");
        // chờ 1.5s để chapter mới load
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
console.log("Lấy toàn bộ chapters thành công!")
    // ✅ Lấy danh sách chapters
    const chapters = await page.evaluate(() => {
      const items = document.querySelectorAll("#chapter_list a");
      return Array.from(items).map(el => ({
        title: el.innerText.trim(),
        url: el.href
      }));
    });

    if (!chapters || chapters.length === 0) {
      console.log(`⚠️ Không tìm thấy chapter nào cho: ${comic.name}`);
      return;
    }
    console.log(`✅ Tìm thấy ${chapters.length} chapters cho truyện ${comic.name}`);

    // ✅ Crawl từng chapter
    for (let index = 0; index < chapters.length; index++) {
      const chapter = chapters[index];
      const slug = slugify(chapter.title, { lower: true, strict: true });

      // Kiểm tra nếu chapter đã có
      const existed = await Chapter.findOne({ where: { comicId: comic.id, slug } });
      if (existed) {
        console.log(`⏩ Bỏ qua (đã có): ${chapter.title}`);
        continue;
      }

      // Crawl ảnh chapter
      await page.goto(chapter.url, { waitUntil: "domcontentloaded" });
      const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".page-chapter img"))
          .map(img => img.src);
      });

      await Chapter.create({
        comicId: comic.id,
        title: chapter.title,
        slug,
        url: chapter.url,
        number: index + 1,
        content: JSON.stringify(images),
        crawlStatus: "completed",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log(`📥 Đã crawl xong: ${chapter.title} (${images.length} ảnh)`);
    }

    // Cập nhật trạng thái
    await Comic.update(
      { crawlStatus: "completed" },
      { where: { id: comic.id } }
    );

    console.log(`🎉 Hoàn thành toàn bộ chapters cho: ${comic.name}`);
  } catch (error) {
    console.error(`❌ Lỗi khi lấy chapter list cho ${comic.name}:`, error.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  const comics = await Comic.findAll({ where: { crawlStatus: "completed" } });

  for (const comic of comics) {
    await crawlChapters(comic);
  }
}

main();
