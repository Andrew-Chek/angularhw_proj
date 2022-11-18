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
  public openDeleteForm = false;
  public comments$!: Observable<Comment[]>;
  public propertyName: keyof Comment = 'title';
  public sortFlag = false;
  public isFormForEditOpened = false;
  public ascOrder: 'asc' | 'desc' = 'asc';
  public subscriptions: Subscription[] = [];

  constructor(private tasksStateService: TasksStateService, private popupService: PopupService) { }

  ngOnInit(): void {
    this.task$ = this.tasksStateService.task$;
    this.comments$ = this.task$
    .pipe(
      mergeMap(task => {
        return of(task.comments)
      }))
    const popupSubscription1 = this.popupService.sortParams.subscribe(value => {
      this.sortFlag = true;
      this.ascOrder = value.sortOrder;
      value.propertyName == 'name' ? this.propertyName = 'title' : this.propertyName = 'created_date'
    })
    const popupSubscription2 = this.popupService.state$.subscribe(value => {
      this.openDeleteForm = value.openDelete;
    })
    this.subscriptions.push(popupSubscription1)
    this.subscriptions.push(popupSubscription2)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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

  openDeleteCommentForm(id: string | null)
  {
    this.task$.pipe(tap((task) => {
      this.tasksStateService.commentSubject.next(task.comments.find(comment => {return comment._id == id})!)
    })).subscribe();
    this.openDeleteForm = true;
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

  deleteComment() {
    const subscription = this.task$.subscribe(task => {
      const comment = {...this.tasksStateService.commentSubject.getValue()}
      this.tasksStateService.deleteComment(comment, task);
      this.tasksStateService.commentSubject.next({_id: '', title: 'test title', message: '', created_date: ''})
      this.popupService.closeDeleteForm();
    })
    this.subscriptions.push(subscription)
  }
}
