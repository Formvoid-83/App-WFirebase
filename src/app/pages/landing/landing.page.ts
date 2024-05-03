import { ChangeDetectionStrategy, Component, Pipe, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { addCircle, pulse, push } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavBarComponent } from 'src/app/nav-bar/nav-bar.component';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
//Login buttoms shtick
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User, UserCredential } from '@angular/fire/auth';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  //changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonApp, IonicModule,IonRouterOutlet, CommonModule, FormsModule, RouterModule, NavBarComponent]
})
export class LandingPage  {

  //userName =this.authService.getUser().subscribe();

     //SIGNALS
     readonly user = signal(this.authService.getUser().subscribe());
  
     readonly thename = computed(() => {
       return this.user.name;
     });



  constructor(private authService: AuthenticationService) {
    addIcons({addCircle});
   }



   /*get getUser(){

    if(this.authService.getUserName() != null &&  this.authService.getUserName() != ""){
      return this.authService.getUserName()
    }
      return null;

   }*/

}
