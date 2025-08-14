export interface Verse {
  id: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

export interface SanityVerse {
  _id: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
  publishedAt?: string;
}

export interface VerseOfTheDay {
  verse: Verse;
  date: string; // ISO date string
}
