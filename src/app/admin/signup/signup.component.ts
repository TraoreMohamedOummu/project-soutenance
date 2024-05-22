import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../share/service/admin/auth.service';
import { Router } from '@angular/router';
import { Helper } from '../../share/helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  formUser !: FormGroup
  loading !: Boolean
  isFormSubmitted : Boolean = false
  messageError !: string;
  constructor(
     private authService:AuthService, private router: Router){

      this.formUser = new FormGroup({
        name : new FormControl("", [Validators.required, Validators.minLength(8)]),
        password : new FormControl("", [Validators.required, Validators.minLength(8)]),
        email : new FormControl("", [Validators.required]),
        telephone : new FormControl("", [Validators.required]),
        adresse : new FormControl("", [Validators.required]),
      })
     }

  
    onRegister() {
    
      this.loading = true
      this.isFormSubmitted = true
      this.loading = false
      if(this.formUser.valid) {
        this.loading = true
          const formData = this.formUser.value;
          this.authService.register(formData).subscribe(
            (response) => {
              if(response.status) {
                this.router.navigate(['/admin/users'])
                Helper.swalSuccessToast(response.message, 3000)
              }else {
                 this.messageError = response.message
              }
              
            },
            (error) => {
              console.log("Error", error);
              
            }
          )
      } else {

      }

  }

}
