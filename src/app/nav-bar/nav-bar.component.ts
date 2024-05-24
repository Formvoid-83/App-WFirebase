import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-nav-bar',
  standalone:true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule, RouterModule]
})
export class NavBarComponent {

  constructor(private authService: AuthenticationService, public router : Router) {
    addIcons({personOutline});
   }

   canActivate(tab : string){
    if(this.authService.isAuthenticated()){
      this.router.navigate([`/${tab}`])
      //console.log(`/${tab}`);
    }
    else{
      this.router.navigate(['/login']);
    }
   }

}
