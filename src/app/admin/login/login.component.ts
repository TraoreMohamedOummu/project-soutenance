import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../share/service/admin/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Helper } from '../../share/helper';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formUser!: FormGroup;
  messageError!: string;
 loading!: boolean;

  constructor(private formBuilber : FormBuilder,
    private router : Router,
     private authService: AuthService) {

    this.formUser = this.formBuilber.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  onSubmit() {
    
    if(this.formUser.valid) {
      const formData = this.formUser.value;
      this.loading = true;
      this.authService.login(formData).subscribe(
        (response) => {
          
          if(response.status) {
            const userJson = JSON.stringify(response.data)
            localStorage.setItem('users', userJson)
            this.loading = false;
            this.router.navigate(['/admin/users']);
             Helper.swalSuccessToast('Connexion reussie', 3000)
          }else if(!response.status){
            this.loading = false;
            this.messageError = response.message;
          }
          
        }, (error) => {
          this.loading = false;
          console.log("error", error);
          
        }
      )
    }else {
      this.loading = false
      this.messageError = "Veuillez remplir tous les champs"
      
    }
  }
}
