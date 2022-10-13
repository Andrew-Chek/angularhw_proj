import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  public title:string = ''
  public titleVocabulary:Map<string, string> = new Map();

  @Input()
  set titleName(title:string) {
    this.title = title;
  }
  get titleName() {
    return this.title;
  }
  constructor() { }

  ngOnInit(): void {
    this.titleVocabulary.set('Sign Up Form', 'register')
    this.titleVocabulary.set('Reset Password Form', 'forget')
  }
  closePopup()
  {
    const form : any = document.querySelector(`#${this.titleVocabulary.get(this.titleName)}`);
    form.style.transform = 'translate(0, -1000%)'
  }
}
