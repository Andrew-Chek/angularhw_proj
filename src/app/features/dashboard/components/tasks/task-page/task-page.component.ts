import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, of, Observable, mergeMap, tap } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/Task';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { TasksStateService } from '../../../services/tasks-state/tasks-state.service';
import { Comment } from 'src/app/shared/interfaces/Comment';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {

  public task$: Observable<Task> = of(tasks[0]);
  public isFormOpened = false;
  public comments$!: Observable<Comment[]>;
  public propertyName: keyof Comment = 'title';
  public sortFlag = false;
  public isFormForEditOpened = false;
  public ascOrder: 'asc' | 'desc' = 'asc';
  private popupSubscription: Subscription = new Subscription();

  constructor(private tasksStateService: TasksStateService, private popupService: PopupService) { }

  ngOnInit(): void {
    this.task$ = this.tasksStateService.task$;
    this.comments$ = this.task$
    .pipe(
      mergeMap(task => {
        return of(task.comments)
      }))
    this.popupSubscription = this.popupService.sortParams.subscribe(value => {
      this.sortFlag = true;
      this.ascOrder = value.sortOrder;
      this.propertyName = value.propertyName as keyof Comment;
    })
  }

  ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
  }

  openCommentForm(openInfo: boolean)
  {
    this.tasksStateService.commentSubject.next({_id: '', title: '', message: '', created_date: ''})
    this.isFormOpened = openInfo;
  }

  openEditCommentForm(id: string | null)
  {
    this.task$.pipe(tap((task) => {
      this.tasksStateService.commentSubject.next(task.comments.find(comment => {return comment._id == id})!)
    })).subscribe();
    this.isFormForEditOpened = true;
  }

  closeCommentForm()
  {
    this.isFormOpened = false;
    this.isFormForEditOpened = false;
    this.tasksStateService.commentSubject.next({_id: '', title: '', message: '', created_date: ''})
  }

  filterComments(value: string)
  {
    if(value == '')
    {
      this.comments$ = this.task$
      .pipe(
        mergeMap(task => {
          return of(task.comments)
        }))
    }
    else
    {
      this.comments$ = this.task$.pipe(
        mergeMap(task => {
          const filteredComments = task.comments.filter(comment => {
            return comment.title.includes(value);
          })
          return of(filteredComments)
        }))
    }
  }
}
