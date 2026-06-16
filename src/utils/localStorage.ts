import type { Note } from "../types/Note";

export const getNotes = (): Note[] => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};