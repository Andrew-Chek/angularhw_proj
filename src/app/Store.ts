import { BehaviorSubject, Observable } from "rxjs";
import { Board } from "./Board";
import { Task } from "./Task";

export class Store<T> {
    readonly state$ : Observable<T>;
    private _state$: BehaviorSubject<T>;

    protected constructor(initialState: T)
    {
        this._state$ = new BehaviorSubject<T>(initialState);
        this.state$ = this._state$.asObservable();
    }

    protected get state(): T
    {
        return this._state$.getValue();
    }

    protected setState(nextState: T)
    {
        this._state$.next(nextState);
    }
}

export interface DashboardState {
    boards: Board[]
    tasks: Task[]

    board: Board | undefined;
    task: Task;
}

export interface PopupState {
    openCreateBoard: boolean;
    openEditBoard:boolean;
    openDeleteBoard:boolean;

    openCreateTask:boolean;
    openEditTask:boolean;
    openDeleteTask:Boolean;

    openDelete:boolean;
    isDraged: boolean;
}