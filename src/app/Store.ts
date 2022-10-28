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

export class DashboardState {
    boards: Board[] = [];
    tasks: Task[] = [];

    board: Board | undefined = {_id: '', name: '', description: '', created_date: ''};
    task: Task = {_id: '', name: '', description: '', status: '', board_id: '', assigned_to: '', created_date: ''};
}

export class PopupState {
    openCreateBoard: boolean = false;
    openEditBoard:boolean = false;
    openDeleteBoard:boolean = false;

    openCreateTask:boolean = false;
    openEditTask:boolean = false;
    openDeleteTask:Boolean = false;

    openDelete:boolean = false;
}