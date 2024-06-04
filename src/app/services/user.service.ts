import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, User } from 'firebase/auth'
import { Observable, Observer, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:any = 'http://localhost:5000/';
  authState: any;
 
  constructor (private http:HttpClient,private router:Router) {}

  login(record: any):Observable<any> { 
    const params={
      email:record.email,
      password:record.password,
    }
     console.log(params)
     sessionStorage.setItem("email", JSON.stringify(params.email));
    let headers = new HttpHeaders();
    return this.http.post(this.url+'login',params,{headers:headers,observe:"response",responseType:'json'}).pipe(map((res: any) => {           
       if(res.body.status==='Success'){
        console.log(res);
        // sessionStorage.setItem('username', 'value');
        
        this.router.navigate(['/main']);
        return res.body;
       }else {
        console.log("Enter correct id or password"); 
        
      }        
      
    }));

  }

  signup(record: any){
    const param={
     fullName:record.fullName,
     email:record.email,
     password:record.password,
     mobilenumber:record.mobilenumber
    }
    this.http.post<any>(this.url+'signup',param)
    .subscribe(res=>{
      console.log(res);
      alert(res.message);
    },
    err=>{
      alert("Something Wrong----")
    })   
  }



// export class UserService {
//   private auth = getAuth();
//   authState!: Observable<User | null>;

//   constructor (private Auth: Auth) {
//     this.authState = new Observable<User | null>((observer: Observer<User | null>) => {
//       const unsubscribe = this.auth.onAuthStateChanged((user: User | null) => {
//         observer.next(user);
//       });
//       return unsubscribe;
//     });
//   }

//   register ({ email, password }: any) {
//     return createUserWithEmailAndPassword(this.auth, email, password);
//   }

  

//   logout () {
//     return signOut(this.auth);
//   }

//   loginWithGoogle () {
//     const provider = new GoogleAuthProvider();
//     return signInWithPopup(this.auth, provider);
//   }
}
