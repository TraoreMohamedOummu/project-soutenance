import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../../share/service/admin/property/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../../../share/helper';
import { Property } from '../../../share/models/property';

@Component({
  selector: 'app-edit-terrain-property',
  templateUrl: './edit-terrain-property.component.html',
  styleUrl: './edit-terrain-property.component.css'
})
export class EditTerrainPropertyComponent implements OnInit{


  formTerrain : FormGroup = this.clearAndInitialForm()
  loading : boolean = false
  isSubmitForm : boolean  = false
  id : number = 0
  property !: Property

  constructor(private router : Router,
    private propertyService : PropertyService,
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
      this.route.paramMap.subscribe( p => {
        this.id = +p.get('id')!
      })

      this.getPropertyById()
  }

  getPropertyById() {
    this.propertyService.getProperty(this.id).subscribe({
      next : (response) => {
          if(response.status) {
          this.property = response.property
          this.inputForm(this.property)
        }
      }
    })
  }

  inputForm(property : Property) {
    if(property) {
      this.formTerrain.patchValue({
        longueur : property.longueur,
        largueur : property.largueur,
        adresse : property.adresse,
        status : property.status
      })
    }
  }
  

  onUpdate() {
    this.loading = true
    this.isSubmitForm = true
    if(this.formTerrain.valid) {
      this.isSubmitForm = false
      const formData = this.formTerrain.value
      this.propertyService.updateTerrainProperty(this.id, formData).subscribe({
        next : (response) => {
          this.loading = false
          if(response.status) {
            this.router.navigate(['/admin/properties'])
            Helper.swalSuccessToast(response.message)
          }else {
            console.log("Error", response.message);
            
            Helper.swalWarningToast(response.message)
          }
        },
        error : (error) => console.log(error)
        
      })
    }
    
  }

  back() {
    this.router.navigate(['/admin/properties'])
  }

  clearAndInitialForm() : FormGroup {
    return  new FormGroup({
      longueur : new FormControl('', Validators.required),
      largueur : new FormControl('', Validators.required),
      adresse : new FormControl('', Validators.required),
      status : new FormControl(0,)
    })
  }


}
