import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ) { }

  canActivate(): Observable<boolean> | boolean {
    console.log("CAN ACTIVATE");
    return this.authService.validarToken()  //Si regresa un false no hay permisos para ver(No esta autenticado)
           .pipe(
            tap( res => {
              if( res == false ){
                this.router.navigateByUrl('/auth');
              }
            })
           );
  }

  canLoad(): Observable<boolean> | boolean {
    console.log("CAN LOAD");
    return this.authService.validarToken()
    .pipe(
      tap( res => {
        if( res == false ){
          this.router.navigateByUrl('/auth');
        }
      })
     );
  }
  
}
