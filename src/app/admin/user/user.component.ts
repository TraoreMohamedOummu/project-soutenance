import { Component, OnInit } from '@angular/core';
import { User } from '../../share/models/user/Users';
import { AuthService } from '../../share/service/admin/auth.service';
import { Helper } from '../../share/helper';
import Swal from 'sweetalert2';
import { Observable, combineLatest, map, startWith, switchMap } from 'rxjs';
import { GetUser } from '../../share/models/user/get_user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserSeach } from '../../share/models/user/User_Search';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

 
  constructor(private authService : AuthService, private fb : FormBuilder) {}

  search = this.fb.nonNullable.group({
    name : ['']
  })
  users$ : Observable<GetUser[]> = this.getUsers()

  
  getUsers() : Observable<GetUser[]> {
     const users$ = this.authService.getUsers()
     const search$ = this.search.controls.name.valueChanges.pipe(startWith(''))
     return combineLatest([users$, search$]).pipe(
      map(([users, name]) => users.filter(user => user.name.toLowerCase().includes(name.toLowerCase())))
     )
  }
  

//getUsers1() : Observable<GetUser[]> {
//  const search$ = combineLatest([
//    this.search.controls.name.valueChanges.pipe(startWith(''))
//  ])
//
//  return search$.pipe(
//    switchMap(([name]) => this.authService.getUsersRecherche({name}))
//  )
//
//
//}

  deleteUser(id : number) {
    Swal.fire({
      title: "Voulez-vous supprimer cet utilisateur?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(id).subscribe({
          next : response => {
            if(response.status) {
              this.getUsers()
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
