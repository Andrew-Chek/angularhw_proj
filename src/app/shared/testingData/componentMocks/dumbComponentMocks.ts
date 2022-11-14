import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-icon-list',
    template: '<div></div>',
})
export class IconListComponent{}

@Component({
    selector: 'app-board-menu',
    template: '<div></div>',
})
export class BoardMenuComponent{}

@Component({
    selector: 'app-admin-header',
    template: '<div></div>',
})
export class AdminHeaderComponent{
    public time:string = new Date().toLocaleString();
  
    @Input() username: string = ''
}