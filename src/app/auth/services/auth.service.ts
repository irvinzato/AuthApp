import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthResponse, Usuario } from './../interfaces/interface';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return this._usuario;
  }

  constructor( private http: HttpClient ) { }

  login( email: string, password: string ) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
          .pipe(  
            tap( res => { //tap es solo para que me muestre toda la informacion, el orden de los operadores rxjs es importante
              //console.log(res);
              if( res.ok ){
                this._usuario = {
                  name: res.name!,
                  uid: res.uid!
                }
              }
            }),
            map( res => res.ok ), //Para mutar la respuesta a lo que yo quiera(mando solo la variable que me interesa/n)
            catchError( err =>  of(false) ) //Otro operador para atrapar el caso del error, pero debe regresar un Observable por eso "of()"
          );
  }

}
