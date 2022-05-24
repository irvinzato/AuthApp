import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email:    [ 'test1@test.com', [Validators.required, Validators.email] ],
    password: [ '123456', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
  }

  login() {
    console.log("formulario value ", this.miFormulario.value);
    console.log("formulario valido ", this.miFormulario.valid);

    const { email, password } = this.miFormulario.value;
    this.authService.login( email, password ).subscribe( res => {
      console.log("Respuesta del POST ", res);
    });
    //this.router.navigateByUrl('/dashboard');
  }

}
