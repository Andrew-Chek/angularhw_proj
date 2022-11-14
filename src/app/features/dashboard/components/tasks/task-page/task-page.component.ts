import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription, of, Observable, mergeMap } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/Task';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { TasksStateService } from '../../../services/tasks-state/tasks-state.service';
import { Comment } from 'src/app/shared/interfaces/Comment';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPageComponent implements OnInit {

  public task$: Observable<Task> = of(tasks[0]);
  public isFormOpened = false;
  public comments$!: Observable<Comment[]>;

  constructor(private tasksStateService: TasksStateService) { }

  ngOnInit(): void {
    this.task$ = this.tasksStateService.task$;
    this.comments$ = this.task$
    .pipe(
      mergeMap(task => {
        return of(task.comments)
      }))
  }

  openCommentForm(openInfo: boolean)
  {
    this.isFormOpened = openInfo;
  }

  closeCommentForm()
  {
    this.isFormOpened = false
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
