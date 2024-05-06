import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addCircle, pulse, push } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavBarComponent } from 'src/app/nav-bar/nav-bar.component';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
//Login buttoms shtick
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User, UserCredential } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonApp,
    IonicModule,
    IonRouterOutlet,
    CommonModule,
    FormsModule,
    RouterModule,
    NavBarComponent,
    
  ],
})
export class LandingPage {
  private readonly user = toSignal<User>(this.authService.loggedUser);
  protected readonly userName = computed(() => {
    const user = this.user();
    /*if(user){
      console.log("Nombre es: " + user.displayName);
    }*/
    
    return user ? user.displayName: '';
  });

  constructor(private authService: AuthenticationService) {
    addIcons({ addCircle });
  }
}
