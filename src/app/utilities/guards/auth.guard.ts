import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!this.jwtService.isAuthenticated()) {
      return false;
    }

    const roles = next.data.roles as string[];
    if (roles && roles.length > 0 && !this.jwtService.isInRoles(roles)) {
      await this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
