import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { Roles } from 'src/app/models/enums/roles';
import { SessionService } from 'src/app/services/session.service';
import { JwtService } from 'src/app/services/jwt.service';

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
    },
    {
      path: '/screen',
      text: 'Screens',
      role: Roles[Roles.Screen]
    },
    {
      path: '/table',
      text: 'Tables',
      role: Roles[Roles.Screen]
    }
  ];

  constructor(
    private jwtService: JwtService,
    private sessionService: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateAuthentication(this.jwtService.isAuthenticated());

    this.sessionService.onAuthenticateChange.subscribe((x) => {
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
      this.email = this.jwtService.getUserEmail();
      this.roles = this.jwtService.getUserRoles();
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
