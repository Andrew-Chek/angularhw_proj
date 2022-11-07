import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/Task';
import { AdminService } from 'src/app/features/admin/admin.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  @ViewChild('titleInput') titleInput! : ElementRef<HTMLInputElement>;
  @ViewChild('messageInput') messageInput! : ElementRef<HTMLInputElement>;

  @Input() isOpened = false;
  @Input() task!: Task;
  @Output() closedForm = new EventEmitter(false)

  model:Comment = {title: '', message: '', created_date: ''};

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  closePopup()
  {
    this.closedForm.emit(true);
  }

  onSubmit() { 
    this.model.title = this.titleInput!.nativeElement.value;
    this.model.message = this.messageInput!.nativeElement.value;
    this.model.created_date = new Date().toDateString();
    if(this.task.comments == undefined)
    {
      this.task.comments = [];
    }
    this.task.comments.push(this.model);
    this.adminService.updateTask(this.task);
    this.model = {title: '', message: '', created_date: ''};
    this.closePopup();
  }
}

export interface Comment {
  title: string,
  message: string,
  created_date: string
}