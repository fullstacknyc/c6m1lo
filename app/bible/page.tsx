"use client";

import { useEffect, useMemo, useState } from "react";

type Verse = {
  number: number;
  text: string;
};

type Chapter = {
  number: number;
  verses: Verse[];
};

type Book = {
  id: string;
  name: string;
  chapters: Chapter[];
};

type BookIndexEntry = {
  id: string;
  name: string;
  chapters: number;
};

function getSavedBookId() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("bible:selectedBook") ?? "";
}

function getSavedChapter(bookId: string) {
  if (typeof window === "undefined") return 1;

  const raw = window.localStorage.getItem(`bible:selectedChapter:${bookId}`);
  const parsed = Number(raw);

  if (Number.isNaN(parsed) || parsed < 1) return 1;
  return parsed;
}

export default function BiblePage() {
  const [bookIndex, setBookIndex] = useState<BookIndexEntry[]>([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [bookData, setBookData] = useState<Book | null>(null);
  const [search, setSearch] = useState("");
  const [fontScale, setFontScale] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/kjv/index.json", { cache: "force-cache" });
        if (!response.ok) {
          throw new Error("KJV dataset not found.");
        }

        const index = (await response.json()) as BookIndexEntry[];
        if (!index.length) {
          throw new Error("KJV dataset is empty.");
        }

        setBookIndex(index);

        const savedBookId = getSavedBookId();
        const firstBook = index[0];
        const initialBookId = index.some((book) => book.id === savedBookId)
          ? savedBookId
          : firstBook.id;

        setSelectedBookId(initialBookId);
        setSelectedChapter(getSavedChapter(initialBookId));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load KJV index.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadIndex();
  }, []);

  useEffect(() => {
    const loadBook = async () => {
      if (!selectedBookId) return;

      try {
        setError(null);

        const response = await fetch(`/kjv/books/${selectedBookId}.json`, { cache: "force-cache" });
        if (!response.ok) {
          throw new Error(`Missing book file for ${selectedBookId}.`);
        }

        const nextBookData = (await response.json()) as Book;
        setBookData(nextBookData);

        if (!nextBookData.chapters.some((chapter) => chapter.number === selectedChapter)) {
          const firstChapter = nextBookData.chapters[0]?.number ?? 1;
          setSelectedChapter(firstChapter);
          window.localStorage.setItem(`bible:selectedChapter:${selectedBookId}`, String(firstChapter));
        }
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load selected book.");
      }
    };

    void loadBook();
  }, [selectedBookId, selectedChapter]);

  const activeChapter = useMemo(() => {
    if (!bookData) return null;
    return bookData.chapters.find((chapter) => chapter.number === selectedChapter) ?? null;
  }, [bookData, selectedChapter]);

  const visibleVerses = useMemo(() => {
    if (!activeChapter) return [];
    const normalized = search.trim().toLowerCase();

    if (!normalized) return activeChapter.verses;

    return activeChapter.verses.filter((verse) => verse.text.toLowerCase().includes(normalized));
  }, [activeChapter, search]);

  const handleBookChange = (bookId: string) => {
    const meta = bookIndex.find((book) => book.id === bookId);
    if (!meta) return;

    setSelectedBookId(bookId);
    window.localStorage.setItem("bible:selectedBook", bookId);

    const chapterFromStorage = getSavedChapter(bookId);
    const chapter = chapterFromStorage > meta.chapters ? 1 : chapterFromStorage;
    setSelectedChapter(chapter);
    window.localStorage.setItem(`bible:selectedChapter:${bookId}`, String(chapter));
  };

  const handleChapterChange = (chapter: number) => {
    setSelectedChapter(chapter);
    if (selectedBookId) {
      window.localStorage.setItem(`bible:selectedChapter:${selectedBookId}`, String(chapter));
    }
  };

  const chapterCount = bookData?.chapters.length ?? 0;

  return (
    <div className="page-wrap space-y-6">
      <section className="panel p-6 sm:p-8">
        <span className="kicker">KJV Reader</span>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">King James Bible</h1>
        <p className="muted mt-3 max-w-3xl">
          Full-text, chapter-based reading with fast local loading. Built for broad access and long-form
          daily use.
        </p>
      </section>

      <section className="panel p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-neutral-300">Book</span>
            <select
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
              value={selectedBookId}
              onChange={(event) => handleBookChange(event.target.value)}
              disabled={!bookIndex.length || isLoading}
            >
              {bookIndex.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="text-neutral-300">Chapter</span>
            <select
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100"
              value={selectedChapter}
              onChange={(event) => handleChapterChange(Number(event.target.value))}
              disabled={!chapterCount || isLoading}
            >
              {Array.from({ length: chapterCount }, (_, index) => {
                const chapter = index + 1;
                return (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm md:col-span-2">
            <span className="text-neutral-300">Search in chapter</span>
            <input
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder:text-neutral-500"
              placeholder="Search words or phrase"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="text-sm text-neutral-300" htmlFor="font-scale">
            Font size
          </label>
          <input
            id="font-scale"
            type="range"
            min={90}
            max={130}
            value={fontScale}
            onChange={(event) => setFontScale(Number(event.target.value))}
          />
          <span className="text-sm text-neutral-400">{fontScale}%</span>
        </div>
      </section>

      <section className="panel p-6 sm:p-8">
        {isLoading ? (
          <p className="muted">Loading Bible index...</p>
        ) : error ? (
          <div className="info-card">
            <p className="font-semibold text-neutral-200">KJV data not loaded yet.</p>
            <p className="muted mt-2">{error}</p>
            <p className="muted mt-2">
              Run <code>npm run bible:download-kjv</code> and redeploy so <code>/public/kjv</code> is
              available.
            </p>
          </div>
        ) : activeChapter ? (
          <>
            <header className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {bookData?.name} {activeChapter.number}
              </h2>
              <p className="muted text-sm">{visibleVerses.length} verses shown</p>
            </header>

            {visibleVerses.length === 0 ? (
              <p className="muted">No verses match your search.</p>
            ) : (
              <ol className="space-y-4">
                {visibleVerses.map((verse) => (
                  <li key={verse.number} className="info-card" style={{ fontSize: `${fontScale}%` }}>
                    <p>
                      <span className="mr-2 font-semibold text-neutral-400">{verse.number}</span>
                      <span>{verse.text}</span>
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </>
        ) : (
          <p className="muted">Select a book and chapter to begin reading.</p>
        )}
      </section>
    </div>
  );
}
