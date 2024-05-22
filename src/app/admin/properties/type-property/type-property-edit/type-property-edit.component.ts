import { Component, OnInit } from '@angular/core';
import { TypeProperty } from '../../../../share/models/type_property';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypePropertyService } from '../../../../share/service/admin/type_property/type-property.service';
import { Helper } from '../../../../share/helper';

@Component({
  selector: 'app-type-property-edit',
  templateUrl: './type-property-edit.component.html',
  styleUrl: './type-property-edit.component.css'
})
export class TypePropertyEditComponent implements OnInit {

  typeProperty !: TypeProperty
  formTypeProperty : FormGroup = this.clearAndIntialForm()
  loading  : boolean  = false
  idUpdate :number = 0

  constructor(private router : Router,
    private route : ActivatedRoute,
     private typePropertyService : TypePropertyService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idUpdate = +params.get('id')!
    })

    if(this.idUpdate !== 0) {
      this.getTypePropertyById(this.idUpdate)
    }
  }

  getTypePropertyById(id:number) {
    this.typePropertyService.getTypeProperty(id).subscribe({
      next : (response) => {
        if(response.status) {
          this.typeProperty = response.type_property
          this.inputForm(this.typeProperty)
        }else{
          Helper.swalWarningToast(response.message)
        }
      },
      error : (error) => console.log(error)
      
    })
  }

  inputForm(typeProperty : TypeProperty) {
    if(typeProperty) {
      this.formTypeProperty.patchValue({
        name: typeProperty.name,
      })
    }
  }

  onSubmit() {
    this.loading = true
    if(this.formTypeProperty.valid) {
      this.loading =false
      const data = this.formTypeProperty.value
      this.loading = true      

      if(this.idUpdate !== 0) {
        this.typePropertyService.updateTypeProperty(this.idUpdate, data).subscribe({
          next : response => {
            if(response.status) {
              this.loading = false
              this.router.navigate(['/admin/type-properties'])
              Helper.swalSuccessToast(response.message)
            }
          },
          error : error => {
            console.log(error);
            
          }
        })

      }else {
        this.typePropertyService.createTypeProperty(data).subscribe({
          next : response => {
            if(response.status) {
              this.loading = false
              this.router.navigate(['/admin/type-properties'])
              Helper.swalSuccessToast(response.message)
            }else{
              this.loading = false
              Helper.swalWarningToast(response.message)
              this.formTypeProperty = this.clearAndIntialForm()
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

  clearAndIntialForm() : FormGroup {
    return new FormGroup({
      name : new FormControl('', Validators.required)
    })
  }



  back() {
    this.router.navigate(['/admin/type-properties'])
  }
}
