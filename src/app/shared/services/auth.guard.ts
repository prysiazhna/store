import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private router: Router,
    private store: Store<IStore>,
    private afAuth: AngularFireAuth,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    const url: string = state.url;
    return this.afAuth.authState.pipe(
      take(1),
      switchMap((user: firebase.User) => {
        // console.log(user);
        if (!user && (url === '/signin' || url === '/signup')) {
          return of(true);
        }
        if (user && (url === '/signin' || url === '/signup')) {
          this.router.navigate(['/select-role']);
          return of(false);
        }
        if (!user) {
          this.router.navigate(['/signin']);
        }
        return of(true);
      }),
    );
  }
}
