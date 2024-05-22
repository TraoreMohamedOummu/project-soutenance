import { Component, OnInit } from '@angular/core';
import { Property } from '../../share/models/property';
import { PropertyService } from '../../share/service/admin/property/property.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Helper } from '../../share/helper';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent  implements OnInit{

  properties !: Property[]

  constructor(
    private propertyService : PropertyService,
    private router : Router
  ) {}

  ngOnInit(): void {

    this.properties = []
    this.getProperties()
      
  }



  getProperties() {
    this.propertyService.getProperties().subscribe({
      next: (response) => {
        if(response.status) {
          this.properties = response.properties
          console.log(this.properties);
          
        }
      },
      error : (error)=>console.log(error)
      
    })
  }

  addImageProperty(id:number) {
    this.router.navigate(['/admin/add-images-property/' + id])
  }

  updateFeatureProperty(id:number, property : Property) {
    console.log("property", property);
    
    if(property.type_property.name.toString() === "Terrain".toString()) {
      this.router.navigate(['/admin/edit-terrain-property/' + id])
    }else {
      this.router.navigate(['/admin/edit-feactures-property/' + id])
    }
  }

  updateProperty(id:number) {
    this.router.navigate(['/admin/edit-property/' + id])
  }

  deleteProperty(id:number) {
    Swal.fire({
      title: "Voulez-vous supprimer ce bien",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        this.propertyService.deleteProperty(id).subscribe({
          next : response => {
            if(response.status) {
              this.getProperties()
              Helper.swalSuccessToast(response.message)
            } 
          },
          error : erro => {
            console.log(erro);
          }
        }
      )
      }
    });
  }


}
 