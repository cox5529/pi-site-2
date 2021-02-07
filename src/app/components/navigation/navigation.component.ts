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
  container = false;

  get dark(): boolean {
    return this.route?.includes('dark=true') ?? false;
  }

  get fullscreen(): boolean {
    return this.route?.startsWith('/screen/preview') ?? false;
  }

  links: Link[] = [
    {
      path: '/users',
      text: 'Users',
      role: Roles[Roles.Administrator],
      contained: false
    },
    {
      path: '/screen/details',
      text: 'Dashboard',
      role: Roles[Roles.Screen],
      contained: false
    },
    {
      path: '/table',
      text: 'Tables',
      role: Roles[Roles.Screen],
      contained: false
    },
    {
      path: '/list',
      text: 'Lists',
      role: Roles[Roles.Screen],
      contained: false
    },
    {
      path: '/area',
      text: 'Area',
      role: Roles[Roles.Screen],
      contained: false
    },
    {
      path: '/recipe',
      text: 'Recipes',
      role: Roles[Roles.Recipe],
      contained: true
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

    this.onRouteChange(this.router.url);

    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.onRouteChange(x.url);
      }
    });
  }

  private onRouteChange(route: string) {
    this.route = route;

    const links = this.links.filter(x => route.startsWith(x.path));
    if (links.length > 0) {
      this.container = links[0].contained;
    }
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
  contained: boolean;
}
