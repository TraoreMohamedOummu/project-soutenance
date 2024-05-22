import { Component, OnInit } from '@angular/core';
import { TypeProperty } from '../../../share/models/type_property';
import { TypePropertyService } from '../../../share/service/admin/type_property/type-property.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Helper } from '../../../share/helper';

@Component({
  selector: 'app-type-property',
  templateUrl: './type-property.component.html',
  styleUrl: './type-property.component.css'
})
export class TypePropertyComponent implements OnInit {


  typeProperties !: TypeProperty[];

  constructor(private typePropertyService : TypePropertyService, private router : Router) {}

  ngOnInit(): void {
    this.typeProperties = []
    this.getAgences()
      
  }

  getAgences() {
     this.typePropertyService.getTypeProperties().subscribe({
      next : (response) => {
        if(response.status) {
          this.typeProperties = response.type_properties
        }
      },
      error : (error) => console.log(error)
      
     })
  }

  onUpdate(id:number) {
    this.router.navigate(['admin/edit-type-property/'+ id])
  }

  onDelete(id:number) {

    Swal.fire({
      title: "Voulez-vous supprimer cette agence",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        this.typePropertyService.deleteTypeProperty(id).subscribe({
          next : response => {
            if(response.status) {
              this.getAgences()
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
