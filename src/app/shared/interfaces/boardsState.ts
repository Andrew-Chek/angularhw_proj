import { Board } from "./Board";

export interface BoardsState {
    boards: Board[]
    board: Board | undefined;
}