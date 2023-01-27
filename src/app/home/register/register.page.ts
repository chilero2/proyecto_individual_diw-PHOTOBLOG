import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister: FormGroup

  constructor(public fb: FormBuilder) {
    this.formRegister = this.fb.group({
      'username': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'passwordConfirm': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {

  }

  register() {

  }

}
