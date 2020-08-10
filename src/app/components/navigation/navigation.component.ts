import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { Roles } from 'src/app/models/enums/roles';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;
  email = '';
  activeLink = '';
  isOpen = false;
  route = '';
  roles: string[] = [];

  links: Link[] = [
    {
      path: '/users',
      text: 'Users',
      role: Roles[Roles.Administrator]
    }
  ];

  constructor(
    private httpService: HttpService,
    private authService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateAuthentication(this.authService.isAuthenticated());

    this.httpService.onAuthenticateChange.subscribe((x) => {
      this.updateAuthentication(x);
    });

    this.route = this.router.url;

    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.route = x.url;
      }
    });
  }

  private updateAuthentication(isAuthenticated: boolean): void {
    if (isAuthenticated) {
      this.email = this.authService.getUserEmail();
      this.roles = this.authService.getUserRoles();
    }

    this.isAuthenticated = isAuthenticated;
    this.cdr.detectChanges();
  }
}

interface Link {
  text: string;
  path: string;
  role: string;
}
