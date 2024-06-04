import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   public formLogin!: FormGroup;
   submitted: boolean=false;
   password:any ;

   show = false;

  constructor (private userService: UserService, private router: Router,private fb:FormBuilder) {}

  ngOnInit(): void {
    const getEmail=sessionStorage.getItem('email');
    if(getEmail !='' && getEmail !=undefined){
      this.router.navigate(['/home'])
    }
        this.formLogin= this.fb.group({
        email:new FormControl('amit1@gmail.com',[Validators.required,Validators.email]),
        password:new FormControl('123456',[Validators.required,Validators.minLength(5)])
      })
      this.password ='password';
    
  }

  onSubmit () {
   
    this.submitted=true
    this.submitted=true
  //   this.userService.login(this.formLogin.value).subscribe((res:any)=>{
  //     console.log(res);
  // })
}

onClick() {
  if (this.password === 'password') {
    this.password = 'text';
    this.show = true;
  } else {
    this.password = 'password';
    this.show = false;
  }
}
}






 // onClick () {
  //   this.userService.loginWithGoogle()
  //     .then(response => {
  //       console.log(response);
  //       this.router.navigate([ '/home' ]);
  //     })
  //     .catch(error => console.log(error));
  // }

  /* checkcontrol for email in formLogin */
  /* get email () {
    return this.formLogin.get('email');*/