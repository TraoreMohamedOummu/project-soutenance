import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private apiUrl = 'http://localhost:8000/api/admin/'
  constructor(private http : HttpClient) { }
  

  getSliders() : Observable<any> {
    const url : string = this.apiUrl + 'sliders/'
    return this.http.get<any>(url)
  }

  getSlider(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'sliders/' + id
    return this.http.get<any>(url)
  }

  createSlider(data:any) : Observable<any> {
    const url : string = this.apiUrl + 'create-slider'
    return this.http.post<any>(url, data)
  }

  updateSlider(id:number, data:any) : Observable<any> {
    const url : string = this.apiUrl + 'update-slider/' + id
    return this.http.put<any>(url, data)
  }

  deleteSlider(id:number) : Observable<any> {
    const url : string = this.apiUrl + 'delete-slider/'+id
    return this.http.delete<any>(url)
  }



}
