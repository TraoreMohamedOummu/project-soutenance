import { Component, OnInit } from '@angular/core';
import { User } from '../../../share/models/user/Users';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../share/service/admin/auth.service';
import { Helper } from '../../../share/helper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent  implements OnInit{


  userImagePath : string = "../../../../assets/user_image.png"
  user!: User;
  userJson!: User;
  formUpdate : FormGroup = new  FormGroup({
    name: new FormControl(""),
    email : new FormControl(""),
    telephone : new FormControl(""),
    adresse : new FormControl(""),
    photo : new FormControl("")
  });
  formResetPassword !: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | undefined | string;
  loading: Boolean = false;
  loadingReset : Boolean = false;
  messageError !: string;
  idUpdate !:number

  constructor(private router : Router,
     private authService : AuthService, private route : ActivatedRoute) {
      this.formResetPassword = new FormGroup({
        ancien_password : new FormControl(""),
        new_password : new FormControl("")
      })
  }


  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.idUpdate = +params.get("id")!
   })
    this.getUserById(this.idUpdate)
    
  }

  getUserById(id:number) {
    this.authService.getUserById(id).subscribe({
      next : response => {
        if(response.status) {
          this.user = response.data  
                  
          this.inputForm(this.user)
          
        }
        if(this.user.photo !== null) {
          this.userImagePath = "http://localhost:8000/user_images/" +this.user.photo
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
    reader.readAsDataURL(this.selectedFile as Blob);
  }

  inputForm(user : User) {
    if (user) {
      this.formUpdate.patchValue({
        name: user.name,
        email : user.email,
        telephone: user.telephone,
        adresse : user.adresse,
      })

      if (user.photo !== null && user.photo !== undefined) {
        this.userImagePath = "http://localhost:8000/user_images/" + user.photo;
      }
    }
  
  }

  

  onResetPassword(id:number) {
    this.loadingReset = true
    if(this.formResetPassword.valid) {
      const formData = new FormData()
      formData.append('ancien_password', this.formResetPassword.get('ancien_password')!.value)
      formData.append('new_password', this.formResetPassword.get('new_password')!.value)
      this.authService.resetPassword(id, formData).subscribe({
        next : response => {
          this.loadingReset = false
          if(response.status) {
            Helper.swalSuccessToast(response.message)
            this.formResetPassword = new FormGroup({
              ancien_password : new FormControl(""),
              new_password : new FormControl("")
            })
            this.messageError = ""
          }else {
           this.messageError = response.message
          }
        },
        error : error => {
          this.loadingReset = false
          console.log(error);
          
        } 
      })

    } else {
      console.log("Erreur de l'envoi");
      
    }
  }

  onUpdate() {
    this.loading = true
    if(this.formUpdate.valid) {

      this.loading = false
      const formData = new FormData()
      formData.append('name', this.formUpdate.get('name')!.value)
      formData.append('email', this.formUpdate.get('email')!.value)
      formData.append('telephone', this.formUpdate.get('telephone')!.value)
      formData.append('adresse', this.formUpdate.get('adresse')!.value)
      formData.append('photo', this.selectedFile as string)
      
      this.loading = true
      this.authService.updateUser(this.user.id, formData).subscribe(
        {
          next : response => {
            this.loading = false
            if(response.status) {
              Helper.swalSuccessToast(response.message)
            }
            
          },
          error : error => {
            this.loading = false
            console.log(error);
            
          }
        }
      )   
    } else {
      this.loading = false
      console.log("Error");
      
    }
  }

  back() {
     this.router.navigate(['/admin/'])
  }
  

}
