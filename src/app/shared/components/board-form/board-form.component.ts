import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/Board';
import { AdminService } from 'src/app/features/admin/admin.service';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss']
})
export class BoardFormComponent implements OnInit {

  protected board: Board = {_id:'', name: '', description: '', created_date: ''};
  @Input() submitText:string = '';

  @Output() sentData = new EventEmitter<Board>;

  public visible = false;
  public readonlyFlag:boolean = false;
  public checkErrors = false;
  public boardForm = new FormGroup({
    name: new FormControl(this.board?.name, [
      Validators.required,
      Validators.minLength(4)]),
    description: new FormControl(this.board?.description, [
      Validators.required,
      Validators.minLength(4),
    ]),
  })

  constructor(private popupService:PopupService, private adminService: AdminService) { }

  get name() { return this.boardForm.get('name'); }

  get description() { return this.boardForm.get('description'); }

  ngOnInit(): void {
    this.adminService.state$.subscribe((value) => {
      this.boardForm.controls['name'].setErrors(null);
      this.boardForm.controls['description'].setErrors(null);
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
    this.boardForm.controls['name'].setErrors(null);
    this.boardForm.controls['description'].setErrors(null);
    this.checkErrors = false;
  }

  sendForm()
  {
    if(this.name?.value != null && this.description?.value != null && this.board != undefined)
    {
      this.board.name = this.name.value;
      this.board.description = this.description.value;
      if(this.name.errors || this.description.errors ||
        this.board.name == '' || this.board.description == '')
        {
          this.checkErrors = true;
        }
      else
      {
        this.sentData.emit(this.board)
        this.board.name = '';
        this.board.description = '';
        this.checkErrors = false;
      }
    }
  }
}
