import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import{JwtHelperService} from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';

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

  storeRefreshToken(tokenValue:string){
    localStorage.setItem('refreshToken',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
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

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`,tokenApi);
  }
}
