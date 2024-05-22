import { Component, OnInit } from '@angular/core';
import { City } from '../../share/models/City';
import { CityService } from '../../share/service/admin/city/city.service';
import Swal from 'sweetalert2';
import { Helper } from '../../share/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent implements OnInit{

  cities !: City[];

  constructor(private cityService : CityService, private router : Router) {

  }

  ngOnInit(): void {
      this.cities = []
      this.getCities()
  }

  getCities() {
    this.cityService.getCities().subscribe({
      next : response => {
        if(response.status) {
          this.cities = response.cities
        }
      },
      error : error => {
        console.log(error);
        
      }
    })
  }

  deleteCity(id:number) {
    Swal.fire({
      title: "Voulez-vous supprimer cette ville",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cityService.deleteCity(id).subscribe({
          next : response => {
            if(response.status) {
              this.getCities()
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

  updateCity(id:number) {
    this.router.navigate(['admin/edit-city/' + id])
  }


}
