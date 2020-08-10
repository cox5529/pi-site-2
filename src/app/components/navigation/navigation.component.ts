import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { HttpService } from "src/app/services/http.service";

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

  links: Link[] = [
    {
      path: '/auth/login',
      text: 'Login'
    }
  ];

  constructor(
    private httpService: HttpService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.updateAuthentication(this.authService.isAuthenticated());

    this.httpService.onAuthenticateChange.subscribe((x) => {
      this.updateAuthentication(x);
    });
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
