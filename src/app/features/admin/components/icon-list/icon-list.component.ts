import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconListComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.authService.logout().pipe(take(1)).subscribe();
  }

}
