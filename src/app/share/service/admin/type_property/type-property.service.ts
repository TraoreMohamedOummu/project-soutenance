import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypePropertyService {

  private apiUrl = 'http://localhost:8000/api/admin/'
  constructor(private http : HttpClient) { }
  

  getTypeProperties() : Observable<any> {
    const url : string = this.apiUrl + 'type-properties/'
    return this.http.get<any>(url)
  }

  
  getTypeProperty(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'type-properties/' + id
    return this.http.get<any>(url)
  }

  createTypeProperty(data:any) : Observable<any> {
    const url : string = this.apiUrl + 'create-type-property'
    return this.http.post<any>(url, data)
  }

  updateTypeProperty(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'update-type-property/' + id
    return this.http.put<any>(url, data)
  }

  deleteTypeProperty(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'delete-type-property/'+id
    return this.http.delete<any>(url)
  }
}
