import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../share/service/admin/property/property.service';
import { Helper } from '../../../share/helper';

@Component({
  selector: 'app-property-image',
  templateUrl: './property-image.component.html',
  styleUrl: './property-image.component.css'
})
export class PropertyImageComponent implements OnInit{

  formImages !: FormGroup
  loading : boolean = false
  selectedFiles !: File
  id : number = 0

  constructor(private router : Router,
     private propertyService : PropertyService,
     private route : ActivatedRoute
    ){}
  

  ngOnInit(): void {
      this.route.paramMap.subscribe( p => {
        this.id = +p.get('id')!
      })
  }

  onFileSelected(event:any) {
    this.selectedFiles = event.target.files
    const files = event.target.files;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl : string = event.target?.result as string;
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.width = 150
        imgElement.height = 150
        const divElement = document.getElementById('image-preview')
        divElement?.appendChild(imgElement)
        
    };
      reader.readAsDataURL(file);
    }
    
  }

  onSubmit() {
    this.loading = true
    if(this.selectedFiles) {
      const formData = new FormData();

      for (const file of (this.selectedFiles as any)) {
        formData.append('images[]', file);
      }
      if(this.id !== 0) {
        this.propertyService.addImageProperty(this.id, formData).subscribe({ 
          next : (response) => {
            this.loading = false
            if(response.status) {
              this.router.navigate(['/admin/properties'])
              Helper.swalSuccessToast(response.message)
            }else {
              Helper.swalWarningToast(response.message)
            }
          },
          error : (error ) => console.log(error)
          
        })
  
      }
    }else {
       this.loading = false
       Helper.swalWarningToast("Veuillez selectionner les images")
    }
  }

  back() {
    this.router.navigate(['/admin/properties'])
  }

}
