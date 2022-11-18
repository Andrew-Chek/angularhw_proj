import { Injectable } from '@angular/core';
import { TasksStateService } from 'src/app/features/dashboard/services/tasks-state/tasks-state.service';
import { Comment } from 'src/app/shared/interfaces/Comment';
import { Task } from 'src/app/shared/interfaces/Task';

export abstract class Strategy {
  abstract updateComments(task: Task, model: Comment): void;
}

@Injectable({
  providedIn: 'any',
})
export class AddCommentStrategy extends Strategy {
  constructor(private tasksStateService: TasksStateService) {
    super();
  }
  updateComments(task: Task, model: Comment): void {
    model.created_date = new Date().toDateString();
    this.tasksStateService.createComment(model, task);
  }
}

@Injectable({
    providedIn: 'any',
})
export class EditCommentStrategy extends Strategy {
  constructor(private tasksStateService: TasksStateService) {
    super();
  }
  updateComments(task: Task, model: Comment): void {
    task.comments.map(comment => {
      comment._id == model._id ? comment = model : comment = comment
    })
    this.tasksStateService.updateTask(task);
  }
}

export const StrategyMap = new Map<boolean, any>([
  [false, AddCommentStrategy],
  [true, EditCommentStrategy],
]);