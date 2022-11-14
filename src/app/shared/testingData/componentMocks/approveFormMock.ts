import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-approve-form',
    template: '<div></div>',
})
export class ApproveFormComponent {
    @Output() sentData = new EventEmitter<boolean>(false);

    public visible = false;
}