import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../share/service/admin/city/city.service';
import { Helper } from '../../../share/helper';
import { City } from '../../../share/models/City';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.css'
})
export class CityEditComponent implements OnInit {


  loading : Boolean = false
  city !: City
  formCity !: FormGroup
  idUpdate !:number

  constructor (private router : Router,
     private cityService : CityService, private route : ActivatedRoute){
    this.formCity = this.clearAndIniatialForm()
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idUpdate = +params.get("id")!
   })

   this.getCityById(this.idUpdate)
  }

  clearAndIniatialForm() {
    return new FormGroup({
      name : new FormControl("", Validators.required),
      desc : new FormControl("")
    })
  }

  getCityById(id:number) {
    this.cityService.getCity(id).subscribe({
      next : response =>  {
        if(response.status) {
          this.city = response.city
          this.inputFormValues(this.city)
        }else{
          console.log(response.message);
          
        }
      },
      error : error => console.log(error)
    })
  }

  inputFormValues(city:City) {
    if(city) {
      this.formCity = new FormGroup({
        name : new FormControl(city.name),
        desc : new FormControl(city.desc)
      })
    }
  }



  onSubmitCity() {
    this.loading = true
    if(this.formCity.valid) {
      this.loading =false
      const data = this.formCity.value
      this.loading = true

      console.log("Id : ",this.idUpdate);
      

      if(this.idUpdate !== 0) {
        this.cityService.updateCity(this.idUpdate, data).subscribe({
          next : response => {
            if(response.status) {
              this.loading = false
              this.router.navigate(['/admin/cities'])
              Helper.swalSuccessToast(response.message)
            }
          },
          error : error => {
            console.log(error);
            
          }
        })

      }else {
        this.cityService.createCity(data).subscribe({
          next : response => {
            if(response.status) {
              this.loading = false
              this.router.navigate(['/admin/cities'])
              Helper.swalSuccessToast(response.message)
            }else {
              this.loading = false
              Helper.swalWarningToast(response.message)
              this.formCity = this.clearAndIniatialForm()
            }
          },
          error : error => {
            console.log(error);
            
          }
        })
      }
      
      
    }else {
      console.log("Erreur");
      
    }
  }

  back() {
     this.router.navigate(['/admin/cities'])
  }

}
