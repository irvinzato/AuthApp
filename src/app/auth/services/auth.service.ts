import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
                localStorage.setItem( 'token', res.token! );  //Almaceno el token que viene en mi res
                this._usuario = {
                  name: res.name!,
                  uid: res.uid!
                }
              }
            }),
            map( res => res.ok ), //Para mutar la respuesta a lo que yo quiera(mando solo la variable que me interesa/n)
            catchError( err =>  of(err.error.msg) ) //Otro operador para atrapar el caso del error, pero debe regresar un Observable por eso "of(false)"
          );          //En lugar de regresar el false cuando algo sale mal, regreso todo el objeto del error o la propiedad que necesite
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
                        .set('x-token', localStorage.getItem('token') || '' );
                        //x-token es el acuerdo con mi Back, y donde tengo la variable almacenada, pero tambien puede no haber variable
    return this.http.get<AuthResponse>( url, { headers } )
           .pipe(
             map( res => {//Respuesta si todo sale bien
              if( res.ok ){
                localStorage.setItem( 'token', res.token! );  //Almaceno el token que viene en mi res
                this._usuario = {
                  name: res.name!,
                  uid: res.uid!
                }
              }
              return res.ok;
              }),
             catchError( err =>  of(false) )  //Respuesta si algo sale mal, atrapo el error
           );
  }

  logout() {
    localStorage.clear();
  }

}
