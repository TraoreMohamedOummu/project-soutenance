import { Component, OnInit } from '@angular/core';
import { Slider } from '../../share/models/slider';
import { SliderService } from '../../share/service/admin/slider/slider.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Helper } from '../../share/helper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {

  sliders !: Slider[];

  constructor(private sliderService : SliderService, private router : Router) {

  }

  ngOnInit(): void {
      this.sliders = []
      this.getSliders()
  }

  getSliders() {
    this.sliderService.getSliders().subscribe({
      next : (response) => {
        if(response.status) {
          this.sliders = response.sliders
        }else {
          console.log(response.message); 
        }
      },
      error : (error) => console.log(error)
      
    })
  }

  onUpdate(id:number) {
    this.router.navigate(['/admin/edit-slider/' +id])
  }

  onDelete(id:number) {
    Swal.fire({
      title: "Voulez-vous supprimer cette slider",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        this.sliderService.deleteSlider(id).subscribe({
          next : response => {
            if(response.status) {
              this.getSliders()
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
