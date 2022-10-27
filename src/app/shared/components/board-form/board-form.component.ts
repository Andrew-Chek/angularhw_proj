import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/Board';
import { AdminService } from 'src/app/features/admin/admin.service';
import { PopupService } from '../../popup.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss']
})
export class BoardFormComponent implements OnInit {

  constructor(private popupService:PopupService, private adminService: AdminService) { }
  public board: Board = {_id:'', name: '', description: '', created_date: new Date()};

  public visible = false;

  public boardForm = new FormGroup({
    name: new FormControl(this.board?.name, [
      Validators.required,
      Validators.minLength(4)]),
    description: new FormControl(this.board?.description, [
      Validators.required,
      Validators.minLength(4),
    ]),
  })
  public submitText:string = '';
  public readonlyFlag:boolean = false;

  @Output() sentData = new EventEmitter<Board>;

  @Input()
  set setSubmit(text:string)
  {
    this.submitText = text;
  }
  get setSubmit()
  {
    return this.submitText;
  }
  
  @Input()
  set setBoard(board:Board)
  {
    this.board = board;
  }
  get setBoard()
  {
    return this.board;
  }

  get name() { return this.boardForm.get('name'); }

  get description() { return this.boardForm.get('description'); }
  

  closePopup()
  {
    if(this.submitText == 'Edit Board')
    {
      this.popupService.openEditBoardForm();
    }
    else
    {
      this.popupService.openCreateBoardForm();
    }
    this.board.name = '';
    this.board.description = '';
  }

  sendForm()
  {
    if(this.name?.value != null && this.description?.value != null && this.board != undefined)
    {
      this.board.name = this.name.value;
      this.board.description = this.description.value;
      this.sentData.emit(this.board)
      this.board.name = '';
      this.board.description = '';
    }
  }

  ngOnInit(): void {
    this.adminService.state$.subscribe((value) => {
      if(value.board != undefined)
      {
        this.board = value.board
      }
    });
    if(this.submitText == 'Create Board')
    {
      this.readonlyFlag = false;
      this.popupService.state$.subscribe(value => {
        this.visible = value.openCreateBoard
      })
    }
    else if(this.submitText == 'Edit Board')
    {
      this.boardForm.get('name')?.setValue(this.board?.name);
      this.boardForm.get('description')?.setValue(this.board?.description);
      this.readonlyFlag = true;
      this.popupService.state$.subscribe(value => {
        this.visible = value.openEditBoard
      })
    }
  }
}
