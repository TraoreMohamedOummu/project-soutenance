import { Component, OnInit } from '@angular/core';
import { Agence } from '../../share/models/agence';
import { Router } from '@angular/router';
import { Helper } from '../../share/helper';
import Swal from 'sweetalert2';
import { AgenceService } from '../../share/service/admin/agence/agence.service';

@Component({
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrl: './agences.component.css'
})
export class AgencesComponent  implements OnInit{

  agences !: Agence[];

  constructor(private agenceService : AgenceService, private router : Router) {}

  ngOnInit(): void {
    this.agences = []
    this.getAgences()
      
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

  onUpdate(id:number) {
    this.router.navigate(['admin/edit-agence/'+ id])
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
        this.agenceService.deleteAgence(id).subscribe({
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
