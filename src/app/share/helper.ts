import Swal from "sweetalert2"
import { AuthService } from "./service/admin/auth.service"
import { User } from "./models/user/Users"

export class Helper {


    static swalSuccessToast(title:string, timer: number = 3000): void{
       
        Swal.fire({
            icon: 'success',
            title: title,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: timer
          })
        
    }

    static swalWarningToast(title:string, timer: number = 3000): void{
       
        Swal.fire({
            icon: "warning",
            title: title,
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: timer
          })
        
    }

   
   
}