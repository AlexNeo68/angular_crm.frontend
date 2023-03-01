import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent {
  @Input('navigation') navigationProps: Navigation[];
  @Output() sidenavClose = new EventEmitter();

  onSidenavClose(): void {
    this.sidenavClose.emit();
  }
}
