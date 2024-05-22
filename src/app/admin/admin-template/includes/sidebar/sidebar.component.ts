import { Component, OnInit } from '@angular/core';
import { User } from '../../../../share/models/user/Users';
import { AuthService } from '../../../../share/service/admin/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  logoPath : string = "../../../../../assets/logo_project.png"
  userImagePath : string = "../../../../../assets/user_image.png"

  user !: User[];
  userJson !: User;
  isActive !:Boolean;



  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit(): void {
    const localData = JSON.parse(localStorage.getItem("users") as string)
    this.userJson = localData[0]
    this.user = [];
    this.getUserById(this.userJson.id)
  }

  getUserAdd() {

    this.router.navigate(['/admin/add-user'])
    const element = document.getElementById('get-user-add')
    if(this.router.url === '/admin/add-user') {
      element?.classList.add('bg-light')
    }
    
  }

  getUserById(id:number) : void {
    this.authService.getUserById(id).subscribe({
      next : response => {
        if(response.status) {
          this.user.push(response.data)
        }
        if(this.user[0].photo !== null) {
          this.userImagePath = "http://localhost:8000/user_images/"+this.user[0].photo
        }
      },
      error : error => {
        console.log(error);
        
      }
    })
  } 



}
