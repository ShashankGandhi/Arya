import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
// if no JWT found then can't access guarded routes
export class AuthGuardService implements CanActivate {
  constructor( public router: Router, private user: UserService) {}
  canActivate(): boolean {
    let JWT = this.user.getToken();
    if (!JWT || JWT === null || JWT === undefined) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
