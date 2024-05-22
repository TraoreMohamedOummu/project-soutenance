import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = 'http://localhost:8000/api/admin/'
  constructor(private http : HttpClient) { }
  

  getProperties() : Observable<any> {
    const url : string = this.apiUrl + 'properties/'
    return this.http.get<any>(url)
  }

  
  getProperty(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'properties/' + id
    return this.http.get<any>(url)
  }

  createProperty(data:any) : Observable<any> {
    const url : string = this.apiUrl + 'create-property'
    return this.http.post<any>(url, data)
  }
  

  updateProperty(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'update-property/' + id
    return this.http.put<any>(url, data)
  }

  //update-feactures-property
  updateTerrainProperty(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'update-terrain-property/' + id
    return this.http.put<any>(url, data)
  }

  updateFeatureProperty(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'update-feactures-property/' + id
    return this.http.put<any>(url, data)
  }

  addImageProperty(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'add-image-property/' + id
    return this.http.post<any>(url, data)
  }

  deleteProperty(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'delete-property/'+id
    return this.http.delete<any>(url)
  }
}
