import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypePropertyService } from '../../../share/service/admin/type_property/type-property.service';
import { AgenceService } from '../../../share/service/admin/agence/agence.service';
import { CityService } from '../../../share/service/admin/city/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agence } from '../../../share/models/agence';
import { TypeProperty } from '../../../share/models/type_property';
import { City } from '../../../share/models/City';
import { PropertyService } from '../../../share/service/admin/property/property.service';
import { Helper } from '../../../share/helper';
import { Property } from '../../../share/models/property';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrl: './property-create.component.css'
})
export class PropertyCreateComponent implements OnInit {


  formProperty : FormGroup = this.clearAndIntialForm()
  agences !: Agence[]
  typeProperties !: TypeProperty[]
  cities  !: City[]
  loading : boolean = false
  id : number = 0
  property !: Property

  constructor(private typePropertyService : TypePropertyService,
              private agenceService : AgenceService,
              private cityService : CityService,
              private propertyService : PropertyService,
              private router : Router,
              private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
      
    this.agences = []
    this.typeProperties = []
    this.cities = []
    this.getAgences()
    this.getTypeProperties()
    this.getCities()

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
          console.log("proer", this.property);
          
          this.inputForm(this.property)
        }
      }
    })
  }

  inputForm(property : Property) {
    if(property) {
      this.formProperty.patchValue({
        name : property.name,
        type_property_id : property.type_property_id,
        agence_id : property.agence_id,
        city_id : property.city_id,
        price : property.price,
        quartier : property.quartier,
        desc : property.desc
      })
    }
  }

  onSubmit() {
    this.loading = true
    if(this.formProperty.valid) {

      const formData = this.formProperty.value
      if(this.id === 0) {
        this.propertyService.createProperty(formData).subscribe({
          next : (response) => {
            this.loading = false
            if(response.status) {
              this.router.navigate(['/admin/properties'])
              Helper.swalSuccessToast(response.message)
            }else {
              Helper.swalWarningToast(response.message)
            }
          }
        })
      }else {
        this.propertyService.updateProperty(this.id, formData).subscribe({
          next : (response) => {
            this.loading = false
            if(response.status) {
              this.router.navigate(['/admin/properties'])
              Helper.swalSuccessToast(response.message)
            }else {
              Helper.swalWarningToast(response.message)
            }
          }
        })
      }
    }else {
      this.loading = false
      console.log("Erreur");
      
    }

  }

  back() {
    this.router.navigate(['/admin/properties'])
  }

  clearAndIntialForm() : FormGroup {
    return new FormGroup({
      name : new FormControl('', Validators.required),
      type_property_id : new FormControl(1),
      agence_id : new FormControl(2),
      city_id : new FormControl(1),
      price : new FormControl('', Validators.required),
      quartier : new FormControl('', Validators.required),
      desc : new FormControl('')
    })
  }

  getAgences() {
    this.agenceService.getAgences().subscribe({
      next : (response) => {
        if(response.status) {          
          this.agences = response.agences
        }
      },
      error : (error) => console.log(error)
      
    })
  }
  getTypeProperties() {
    this.typePropertyService.getTypeProperties().subscribe({
      next : (response) => {
        if(response.status) {
          this.typeProperties = response.type_properties
        }
      },
      error : (error) => console.log(error)
      
    })
  }

  getCities() {
    this.cityService.getCities().subscribe({
      next : (response) => {
        if(response.status) {
          this.cities = response.cities
        }
      },
      error : (error) => console.log(error)
      
    })
  }



}
