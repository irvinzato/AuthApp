import  Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name:     [ 'Test 3', [Validators.required, Validators.minLength(3)] ],
    email:    [ 'test3@test.com', [Validators.required, Validators.email] ],
    password: [ '123456', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
  }

  registro() {
    console.log("formulario valido ", this.miFormulario.valid);
    console.log("formulario value ", this.miFormulario.value);

    const { name, email, password } = this.miFormulario.value;

    this.authService.registro( name, email, password ).subscribe(res => {
      console.log("RESPUESTA DEL POST REGISTRO ", res);
      if( res == true  ){
        //Todo salio bien
        Swal.fire('Registro exitoso ', 'Bienvenido' , 'success')
        this.router.navigateByUrl('/dashboard');
      } else {
        //Algun error
        Swal.fire('Error ', res, 'error')
      }
    });
    
  }

}
