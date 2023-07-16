import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import{JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7121/api/User/";
  private userPayload : any; 

  constructor(private http: HttpClient,private router: Router) {
    this.userPayload=this.decodedToken();
   }
  
  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginobj:any){
    return this.http.post<any>(`${this.baseUrl}authentificate`,loginobj);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
     return !!localStorage.getItem('token');
  }

  decodedToken(){
    const jwtToken = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtToken.decodeToken(token));
    return jwtToken.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload)
    console.log(this.userPayload);
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
}
