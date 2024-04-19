import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule,]
})
export class ResetPasswordPage implements OnInit {
  email: any;
  constructor(public router : Router, private authService : AuthenticationService) { 
    addIcons({personOutline, lockClosedOutline, chevronForward});  
 }
  ngOnInit() {
  }

  async resetPassword(){
    this.authService.resetPassword(this.email).then(()=>
    {
      console.log('reset link sent');
      this.router.navigate(['/login'])
    }
    ).catch((error) =>{
      console.log(error);
    })
  }

}
