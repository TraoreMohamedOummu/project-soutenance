import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private apiUrl = 'http://localhost:8000/api/admin/'
  constructor(private http : HttpClient) { }
  

  getAgences() : Observable<any> {
    const url : string = this.apiUrl + 'agences/'
    return this.http.get<any>(url)
  }

  getAgence(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'agences/' + id
    return this.http.get<any>(url)
  }

  createAgence(data:any) : Observable<any> {
    const url : string = this.apiUrl + 'create-agence'
    return this.http.post<any>(url, data)
  }

  updateAgence(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'update-agence/' + id
    return this.http.put<any>(url, data)
  }

  deleteAgence(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'delete-agence/'+id
    return this.http.delete<any>(url)
  }
}
