import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
  getEmail:any=''
  constructor (private userService: UserService, private router: Router) { }
  ngOnInit (): void { 
     this.getEmail=sessionStorage.getItem('email');
   }

  onClick () {
    sessionStorage.removeItem("email");
    this.router.navigate(['/login'])


}
}