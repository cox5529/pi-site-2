import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { HttpService } from "src/app/services/http.service";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.sass"],
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;
  email = '';
  activeLink = '';
  isOpen = false;
  route = '';

  links: Link[] = [
  ];

  constructor(
    private httpService: HttpService,
    private authService: AuthenticationService,
    private router: Router
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
    })
  }

  private updateAuthentication(isAuthenticated: boolean): void {
    if (isAuthenticated) {
      this.email = this.authService.getUserEmail();
    }

    this.isAuthenticated = isAuthenticated;
  }
}

interface Link {
  text: string;
  path: string;
}
