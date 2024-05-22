import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user/Users';
import { Router } from '@angular/router';
import { GetUser } from '../../models/user/get_user';
import { UserSeach } from '../../models/user/User_Search';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:8000/api/admin/'

  constructor(private http : HttpClient, private router: Router) { }


  login(credentials : {email : string, password : string}) : Observable<any> {
    return this.http.post<any>(this.apiUrl + 'get-user-email-password', credentials)
  }

  register(user : User) : Observable<any> {
    return this.http.post<User>(this.apiUrl + 'add-user', user);
  }

  logout():void{
    localStorage.removeItem("users");
    this.router.navigate(['/admin/login'])
  }

  getUserById(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'get-user-id/' + id
    return this.http.get<any>(url)
  }

  getUsers() : Observable<GetUser[]> {
    const url = this.apiUrl + 'users'
    return this.http.get<GetUser[]>(url)
  }

  getUsersRecherche(userSearh : UserSeach) : Observable<GetUser[]> {
    const url = this.apiUrl + 'users'
    let params = new HttpParams()
    if(userSearh.name) params = params.append('name_like', userSearh.name)
    return this.http.get<GetUser[]>(url, {params})
  }

  updateUserImageRole(id:number, data : any) : Observable<any> {
    const url : string = this.apiUrl + 'update-user-role-image/' + id
    return this.http.post(url, data)
  }

  deleteUser(id : number)  : Observable<any>{
    const url : string = this.apiUrl + 'delete-user/' + id
    return this.http.delete(url)
  }

  updateUser(id:number, data : any) : Observable<any> {
    const url : string = this.apiUrl + 'update-user/' + id
    return this.http.post(url, data)
  }

  resetPassword(id : number, data : any) : Observable<any> {
    const url : string = this.apiUrl + 'reset-password/' + id
    return this.http.post(url, data)
  }

}
