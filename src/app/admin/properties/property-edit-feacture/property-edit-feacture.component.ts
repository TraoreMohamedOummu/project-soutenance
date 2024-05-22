import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../../share/service/admin/property/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from '../../../share/helper';
import { Property } from '../../../share/models/property';

@Component({
  selector: 'app-property-edit-feacture',
  templateUrl: './property-edit-feacture.component.html',
  styleUrl: './property-edit-feacture.component.css'
})
export class PropertyEditFeactureComponent implements OnInit {

  formFeactureProperty : FormGroup = this.clearAndInitialForm()
  loading : boolean = false
  id : number = 0
  property !: Property

  constructor(private propertyService : PropertyService,
              private router : Router,
              private route : ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe( p => {
      this.id = +p.get('id')!
    })

    this.getPropertyById()
      
  }

  clearAndInitialForm() : FormGroup{
     return new FormGroup({
      nombre_piece : new FormControl(0, Validators.required),
      nombre_chambre : new FormControl(0, Validators.required),
      nombre_salle_bain : new FormControl(0, Validators.required),
      is_eau : new FormControl(0),
      is_electricite : new FormControl(0),
      is_salle_gym : new FormControl(0),
      status : new FormControl(0)
     })
  }

  inputForm(property : Property) {
    if(property) {
      this.formFeactureProperty.patchValue({
        nombre_piece : property.nombre_piece,
        nombre_chambre : property.nombre_chambre,
        nombre_salle_bain : property.nombre_salle_bain,
        is_eau : property.is_eau,
        is_electricite : property.is_electricite,
        is_salle_gym : property.is_salle_gym,
        status : property.status
      })
    }
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

  onSubmit() {
    this.loading = true
    if(this.formFeactureProperty.valid) {
      const formData = this.formFeactureProperty.value
      this.propertyService.updateFeatureProperty(this.id, formData).subscribe({
        next : (response) => {
          this.loading =false
          if(response.status){
            this.router.navigate(['/admin/properties'])
            Helper.swalSuccessToast(response.message)
          }else {
            console.log("eerur : ", response.message);
            
            Helper.swalWarningToast(response.message)

          }
        },
        error : (error) => console.log(error)
        
      })

    }else {
      this.loading = false
      console.log("Erreur");
      
    }
  }

  back() {
    this.router.navigate(['/admin/properties'])
  }



}
