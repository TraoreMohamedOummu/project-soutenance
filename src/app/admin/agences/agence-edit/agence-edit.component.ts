import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityService } from '../../../share/service/admin/city/city.service';
import { City } from '../../../share/models/City';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Helper } from '../../../share/helper';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenceService } from '../../../share/service/admin/agence/agence.service';
import { Agence } from '../../../share/models/agence';

@Component({
  selector: 'app-agence-edit',
  templateUrl: './agence-edit.component.html',
  styleUrl: './agence-edit.component.css'
})
export class AgenceEditComponent  implements OnInit{

  Cities !: City[]
  agence !: Agence;
  loading : Boolean = false
  idUpdate : number = 0
  formAgence : FormGroup = this.clearAndInitialForm()

  constructor(private cityService : CityService,
    private agenceService : AgenceService,
     private router : Router,
     private route : ActivatedRoute
    ){}

  


  ngOnInit(): void {
     
    this.Cities = []
    this.getCities()
    this.route.paramMap.subscribe(params => {
      this.idUpdate = +params.get('id')!
    })

    this.getAgenceById(this.idUpdate)
    



  }
  
  getCities() {
    this.cityService.getCities().subscribe({
      next : (response) => {
        if(response.status) {
          this.Cities = response.cities
        }
      },
      error : (error) => console.log(error),
    })
  }

  getAgenceById(id:number) {
    this.agenceService.getAgence(id).subscribe({
      next : (response) => {
        if(response.status) {
          this.agence = response.agence
          this.inputForm(this.agence)
        }else{
          Helper.swalWarningToast(response.message)
        }
      },
      error : (error) => console.log(error)
      
    })
  }

  inputForm(agence : Agence) {
    if(agence) {
      this.formAgence.patchValue({
        name: agence.name,
        city_id : agence.city_id,
        desc : agence.desc
      })
    }
  }

  clearAndInitialForm() {
    return new FormGroup({
      name : new FormControl("", [Validators.required]),
      city_id : new FormControl(1, [Validators.required]),
      desc : new FormControl("")
    })
  }


  onSubmitAgence() {
    this.loading = true
    if(this.formAgence.valid) {
      this.loading =false
      const data = this.formAgence.value
      this.loading = true      

      if(this.idUpdate !== 0) {
        this.agenceService.updateAgence(this.idUpdate, data).subscribe({
          next : response => {
            if(response.status) {
              this.loading = false
              this.router.navigate(['/admin/agences'])
              Helper.swalSuccessToast(response.message)
            }
          },
          error : error => {
            console.log(error);
            
          }
        })

      }else {
        this.agenceService.createAgence(data).subscribe({
          next : response => {
            if(response.status) {
              this.loading = false
              this.router.navigate(['/admin/agences'])
              Helper.swalSuccessToast(response.message)
            }else{
              this.loading = false
              Helper.swalWarningToast(response.message)
              this.formAgence = this.clearAndInitialForm()
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
