import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QuestionBase } from "../../services/question-control/question-base";

@Component({
    selector: 'app-custom-form',
    template: '<div></div>',
})
export class CustomFormComponent {
    @Input() questions: QuestionBase<string>[] = [];
    @Input() buttonName: string = '';
    @Input() formName: string = '';

    @Output() sentData: EventEmitter<{email: string, password: string, newPassword: string}> = new EventEmitter()
}