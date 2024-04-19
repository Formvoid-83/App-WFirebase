import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonicModule],
})
export class HomePage {
  user : any;
  constructor(private authService : AuthenticationService, public router : Router) {
    this.user = authService.getProfile();
  }


  async logout(){
    this.authService.signOut().then(()=>{
    this.router.navigate(['/landing'])
    })
  }
}
