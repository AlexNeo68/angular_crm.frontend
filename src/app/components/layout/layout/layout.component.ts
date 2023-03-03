import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Navigation } from 'src/app/models/navigation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  navigation: Navigation[] = [];

  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((url: any) => {
        if (url.url && url.url.indexOf('login') != 1) {
          if (this.authService.checkUser() && !this.navigation.length) {
            this.getMenu();
          }
        }
      });
  }

  ngOnInit(): void {
    // this.getMenu();
  }

  getMenu(): void {
    this.navigationService.getNavigation().subscribe((data) => {
      this.navigation = data;
    });
  }
}
