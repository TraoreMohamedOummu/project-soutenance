import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'http://localhost:8000/api/admin/'
  constructor(private http : HttpClient) { }
  

  getCities() : Observable<any> {
    const url : string = this.apiUrl + 'cities/'
    return this.http.get<any>(url)
  }

  getCity(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'cities/' + id
    return this.http.get<any>(url)
  }

  createCity(data:any) : Observable<any> {
    const url : string = this.apiUrl + 'create-city'
    return this.http.post<any>(url, data)
  }

  updateCity(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'update-city/' + id
    return this.http.put<any>(url, data)
  }

  deleteCity(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'delete-city/'+id
    return this.http.delete<any>(url)
  }




}
