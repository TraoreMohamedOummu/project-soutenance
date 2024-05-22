import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../share/service/admin/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Helper } from '../../../share/helper';
import { Observable, map } from 'rxjs';
import { GetUser } from '../../../share/models/user/get_user';
import { User } from '../../../share/models/user/Users';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  userImagePath : string = "../../../../assets/user_image.png"

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | undefined;
  loading : Boolean = false
  formUpdate !: FormGroup;

  users$  : Observable<GetUser[]> = this.authService.getUsers()
  user !: User;
  roles !: any[];
  id : number  = 0;
  isFormSubmitted : Boolean = false;

  constructor(private authService : AuthService,
     private route : ActivatedRoute) {
      this.formUpdate = new FormGroup({
        photo : new FormControl(""),
        role_id : new FormControl("", [Validators.required])
      })
  }  
  

  ngOnInit(): void {

    this.route.paramMap.subscribe( p => {
      this.id = +p.get('id')!
    })
      
      this.roles = []
     
      this.getUserById(this.id)
      
  }

  getUserById(id:number)  {

    this.authService.getUserById(id).subscribe({
      next : response => {
        if(response.status) {
          this.user = response.data
          this.roles = response.roles
        }
        if(this.user.photo !== null) {
          this.userImagePath = "http://localhost:8000/user_images/"+this.user.photo
        }
      },
      error : error => {
        console.log(error);
        
      }
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

  onUpdate() {
    this.loading = true
    this.isFormSubmitted = true
    if (!this.selectedFile) {
      Helper.swalWarningToast("Aucune image n'est selectionnée")
      return;
    }
    
    if(this.formUpdate.valid) {

      this.loading = false
      const formData = new FormData()
      formData.append('photo', this.selectedFile)
      formData.append('role_id', this.formUpdate.get('role_id')!.value)
      this.loading = true
      this.authService.updateUserImageRole(this.id, formData).subscribe(
        (response) => {
          this.loading = false
           if(response.status) {
            Helper.swalSuccessToast(response.data.message)
            this.getUserById(this.id)
            
           }
           

        },
        (error) => {
          this.loading = false
             console.log(error);
             
        }
      )

    } else {
      console.log("Error");
      
    }
    
  }



}
