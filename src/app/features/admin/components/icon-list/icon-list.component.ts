import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
