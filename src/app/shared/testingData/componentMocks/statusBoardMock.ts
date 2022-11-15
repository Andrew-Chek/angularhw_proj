import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Observable, map, Subscription } from "rxjs";
import { SortByPipe } from "src/app/features/dashboard/pipes/sort-by.pipe";
import { TasksStateService } from "src/app/features/dashboard/services/tasks-state/tasks-state.service";
import { Board } from "../../interfaces/Board";
import { PopupService } from "../../services/popupService/popup.service";
import { Task } from "../../interfaces/Task";

@Component({
    selector: 'app-status-board',
    template: '<div></div>',
})
export class StatusBoardComponent {
   @ViewChildren('taskItem') taskItems!: QueryList<ElementRef> 
   @ViewChild('boardMain') boardMain!: ElementRef<StatusBoardComponent>;
   @ViewChild('color') colorInput!: ElementRef<HTMLInputElement>;
   
   @Output() sentTaskItems: EventEmitter<QueryList<ElementRef>> = new EventEmitter();

   @Input() board:Board = {_id: '', name:'', description: '', created_date: ''};
   @Input() status: {value: string, color: string} = {value: 'To do', color: '#ffffff'}
   @Input()
   set tasksValue$(tasks$:Observable<Task[]>)
   {
      this.tasks$ = tasks$.pipe(
      map(tasks => {
      return tasks.filter(task => task.status === this.status.value)
      }));
   }

   public isDraged = false;
   public tasks$: Observable<Task[]> = this.tasksStateService.tasks$
   .pipe(
      map(tasks => {
      return tasks.filter(task => task.status === this.status.value)
   }));

   constructor(
      private tasksStateService:TasksStateService, 
      private popupService: PopupService) {
   }
}