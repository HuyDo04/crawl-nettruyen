// chuyển thành số cho đúng thứ tự chapter

function parseChapterNumber(title) {
    if (!title) return null;

   
    const regex = /(?:chapter|chương)\s*(\d+(?:\.\d+)?)/i;
    const match = title.match(regex);

    if (match && match[1]) {
        return parseFloat(match[1]); // chuyển string sang số
    }

    return null;
}

module.exports = parseChapterNumber;
