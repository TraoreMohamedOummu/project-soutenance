import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Helper } from '../../../share/helper';
import { Slider } from '../../../share/models/slider';
import { ActivatedRoute, Router } from '@angular/router';
import { SliderService } from '../../../share/service/admin/slider/slider.service';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html',
  styleUrl: './slider-edit.component.css'
})
export class SliderEditComponent implements OnInit{

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | undefined;
  loading : Boolean = false
  formSlider : FormGroup = this.clearAndInitialForm();
  isFormSubmitted : Boolean = false
  slider !: Slider
  idSlider : number = 0

  constructor(private router : Router,
    private route : ActivatedRoute,
     private sliderService:SliderService) {

  }


  ngOnInit(): void {

      this.route.paramMap.subscribe( params => {
        this.idSlider = +params.get('id')!
      })

      this.getSliderById(this.idSlider)
  }

  clearAndInitialForm() : FormGroup {
    return new FormGroup({
      name : new FormControl("", [Validators.required]),
      photo : new FormControl("")
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewImage()
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  getSliderById(id:number) {
    this.sliderService.getSlider(id).subscribe({
      next : (response) => {
        if(response.status) {
          this.slider = response.slider
          this.inputForm(this.slider)
        }else {
          console.log(response.message);
          
        }
      },
      error : error => console.log(error)
      
    })
  }

  inputForm(slider:Slider) {
    if(slider) {
      this.formSlider.patchValue({
        name : slider.name,
        photo : slider.photo
      })
    }
  }


  onSubmit() {
    this.loading = true
    this.isFormSubmitted = true

    if( this.formSlider.valid) {
      if (!this.selectedFile) {
        Helper.swalWarningToast("Aucune image n'est selectionnée")
        return;
      }
      this.loading = false
      const formData = new FormData()
      formData.append('name', this.formSlider.get('name')!.value)
      formData.append('photo', this.selectedFile)

      if( this.idSlider  === 0) {
        
        this.loading = true
        this.sliderService.createSlider(formData).subscribe({
          next : (response) => {
            if(response.status) {
              this.router.navigate(['/admin/sliders'])
              Helper.swalSuccessToast(response.message)
            }else {
              this.loading = false
              Helper.swalWarningToast(response.message)
            }
          },
          error : (error) => console.log(error)
          
        })
        
        
      } else {
        this.loading = true
        this.sliderService.updateSlider(this.idSlider,formData).subscribe({
          next : (response) => {
            if(response.status) {
              this.router.navigate(['/admin/sliders'])
              Helper.swalSuccessToast(response.message)
            }else {
              this.loading = false
              Helper.swalWarningToast(response.message)
            }
          },
          error : (error) => console.log(error)
          
        })
        
      }
    }else {
      console.log("Formulaire invalid");
      
    }
    
    
    
    
  }

  back() {
    this.router.navigate(['/admin/sliders/'])
 }
}
