import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../share/service/admin/auth.service';
import { User } from '../../../../share/models/user/Users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor(private authService : AuthService){}

  user !: User

  ngOnInit(): void {
    const localData = JSON.parse(localStorage.getItem("users") as string)
    this.user = localData[0]

  }
  
  logout() {
    this.authService.logout()
  }

  
}
