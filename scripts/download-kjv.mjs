import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SOURCE_URL =
  "https://raw.githubusercontent.com/farskipper/kjv/master/json/verses-1769.json";

const BOOK_ORDER = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

function slugifyBookName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  console.log(`Downloading KJV from ${SOURCE_URL}`);
  const response = await fetch(SOURCE_URL);

  if (!response.ok) {
    throw new Error(`Failed to download KJV source (${response.status})`);
  }

  const versesByRef = await response.json();

  const booksMap = new Map();

  for (const [reference, text] of Object.entries(versesByRef)) {
    const match = reference.match(/^(.+?)\s(\d+):(\d+)$/);
    if (!match) {
      continue;
    }

    const [, bookName, chapterRaw, verseRaw] = match;
    const chapterNumber = Number(chapterRaw);
    const verseNumber = Number(verseRaw);

    if (!booksMap.has(bookName)) {
      booksMap.set(bookName, new Map());
    }

    const chaptersMap = booksMap.get(bookName);

    if (!chaptersMap.has(chapterNumber)) {
      chaptersMap.set(chapterNumber, []);
    }

    chaptersMap.get(chapterNumber).push({
      number: verseNumber,
      text,
    });
  }

  const orderedBookNames = Array.from(booksMap.keys()).sort((a, b) => {
    const indexA = BOOK_ORDER.indexOf(a);
    const indexB = BOOK_ORDER.indexOf(b);

    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const outputRoot = path.resolve(process.cwd(), "public", "kjv");
  const booksOutputDir = path.join(outputRoot, "books");

  await mkdir(booksOutputDir, { recursive: true });

  const index = [];

  for (const bookName of orderedBookNames) {
    const bookId = slugifyBookName(bookName);
    const chaptersMap = booksMap.get(bookName);

    const chapters = Array.from(chaptersMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([chapterNumber, chapterVerses]) => ({
        number: chapterNumber,
        verses: chapterVerses.sort((a, b) => a.number - b.number),
      }));

    index.push({
      id: bookId,
      name: bookName,
      chapters: chapters.length,
    });

    const bookPayload = {
      id: bookId,
      name: bookName,
      chapters,
    };

    await writeFile(
      path.join(booksOutputDir, `${bookId}.json`),
      JSON.stringify(bookPayload),
      "utf8",
    );
  }

  await writeFile(path.join(outputRoot, "index.json"), JSON.stringify(index), "utf8");

  console.log(`KJV download complete: ${index.length} books written to public/kjv`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
