import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister!: FormGroup;

  constructor (private userService: UserService, private router: Router,private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      fullName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      mobilenumber:new FormControl('',[Validators.required,Validators.minLength(8)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(4)])
    })
  }

   onSubmit () {
    this.userService.signup(this.formRegister.value)
   }
   

}
