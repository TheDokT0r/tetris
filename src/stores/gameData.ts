import type Tetromino from "@/gameObj/tetromino";
import { writable } from "svelte/store";

interface SavedPiece {
  turn: number;
  piece?: Tetromino;
}

export const savedPiece = writable<SavedPiece>({ turn: -1 });
