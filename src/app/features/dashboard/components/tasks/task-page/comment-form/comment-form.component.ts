import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TasksStateService } from 'src/app/features/dashboard/services/tasks-state/tasks-state.service';
import { Task } from 'src/app/shared/interfaces/Task';
import { Comment } from 'src/app/shared/interfaces/Comment';
import { Strategy, StrategyMap } from './update-strategies';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  @ViewChild('titleInput') titleInput! : ElementRef<HTMLInputElement>;
  @ViewChild('messageInput') messageInput! : ElementRef<HTMLInputElement>;

  @Input() isOpened = false;
  @Input() isEdit = false;
  @Input() task!: Task;
  @Input() formTitle = 'Add comment'
  @Output() closedForm = new EventEmitter(false)
  

  model:Comment = {_id: '', title: '', message: '', created_date: ''};
  strategy: Strategy = this.injector.get<Strategy>(StrategyMap.get(this.isEdit));

  constructor(private tasksStateService: TasksStateService, private injector: Injector) { }

  ngOnInit(): void {
    this.strategy = this.injector.get<Strategy>(StrategyMap.get(this.isEdit));
    this.tasksStateService.commentSubject.subscribe(value => {
      this.model = value
    })
  }

  closePopup()
  {
    this.closedForm.emit(true);
    this.tasksStateService.commentSubject.next({_id: '', title: '', message: '', created_date: ''})
  }

  onSubmit() { 
    this.model.title = this.titleInput!.nativeElement.value;
    this.model.message = this.messageInput!.nativeElement.value;
    this.model.created_date = new Date().toDateString();
    if(this.task.comments === undefined)
    {
      this.task.comments = [];
    }
    this.strategy.updateComments({...this.task}, {...this.model})
    this.closePopup();
  }
}