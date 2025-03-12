import { z } from "zod";
import { validateResponse } from "./validateResponse";

// ** Typing

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});

export type Note = z.infer<typeof NoteSchema>;

export const NoteList = z.array(NoteSchema);

export type NoteList = z.infer<typeof NoteList>;

export const FetchNoteListSchema = z.object({
  list: NoteList,
  pageCount: z.number(),
});

export type FetchNoteListResponse = z.infer<typeof FetchNoteListSchema>;

// ** Get notes

export function fetchNoteList(page: number): Promise<FetchNoteListResponse> {
  return fetch(`/api/notes?page=${page}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => FetchNoteListSchema.parse(data))
}

// ** Create note

export function createNote(title: string, text: string): Promise<void> {
  return fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      text,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
}
