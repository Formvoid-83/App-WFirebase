import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { addCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavBarComponent } from 'src/app/nav-bar/nav-bar.component';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
//Login buttoms shtick
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonApp, IonicModule,IonRouterOutlet, CommonModule, FormsModule, RouterModule, NavBarComponent]
})
export class LandingPage {

  constructor(private authService: AuthenticationService) {
    addIcons({addCircle});
   }

   get getUser(){

    if(this.authService.getUserName() != null &&  this.authService.getUserName() != ""){
      console.log(this.authService.getUserName());
      return this.authService.getUserName()
    }
    console.log("SU PTA MADRE, NO SE REFRESCA!");
      return null;

   }

}
