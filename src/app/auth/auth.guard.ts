// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
// } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { AuthService } from './auth.sevice';

// @Injectable() //To be able to inject services into services
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | import('@angular/router').UrlTree
//     | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
//     | Promise<boolean | import('@angular/router').UrlTree> {
//     const isAuth = this.authService.getAuthStatusListener();
//     if (!isAuth) {
//       this.router.navigate(['/login']); //If not authorized navigate to login
//     }
//     return isAuth; //route CAN accept this
//   }
// }
