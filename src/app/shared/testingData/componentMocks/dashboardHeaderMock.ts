import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Board } from "src/app/shared/interfaces/Board";

@Component({
	selector: 'app-dashboard-header',
	template: '<div></div>',
})
export class DashboardHeaderComponent {
	@Input() headerType:string = ''
	public propertyName:keyof Board = 'name'
	public order: 'asc' | 'desc' = 'asc'

  @Output() sentSortBoardParams = new EventEmitter<{propertyName: keyof Board, order: 'asc' | 'desc'}>();
  @Output() sentFilterData = new EventEmitter<string>();
}