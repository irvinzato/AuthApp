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
    name:     [ '', [Validators.required, Validators.minLength(3)] ],
    email:    [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router ) { }

  ngOnInit(): void {
  }

  registro() {
    console.log("formulario valido ", this.miFormulario.valid);
    console.log("formulario value ", this.miFormulario.value);
    this.router.navigateByUrl('/dashboard');
  }

}
