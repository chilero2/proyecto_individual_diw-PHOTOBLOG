import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() header: boolean

  formularioLogin: FormGroup

  constructor(public fb: FormBuilder) {
    this.header = false
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required), 
      'password' : new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

}
