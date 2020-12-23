import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Roles } from 'src/app/models/enums/roles';
import { SessionService } from 'src/app/services/session.service';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class RootGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!this.jwtService.isAuthenticated()) {
      await this.router.navigateByUrl('/auth/login');
      return false;
    }

    const roles = this.jwtService.getUserRoles();
    if (roles.includes(Roles[Roles.Administrator])) {
      await this.router.navigateByUrl('/users');
    } else if (roles.includes(Roles[Roles.Screen])) {
      await this.router.navigateByUrl('/screen');
    }

    return false;
  }
}
