import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
} from '@angular/core';
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
import { derivedAsync } from 'ngxtension/derived-async';
import { catchError, from, map, of } from 'rxjs';

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
export class LandingPage implements OnInit {
  public browserRefresh: boolean;

  private readonly user = toSignal<User>(this.authService.loggedUser);
  protected readonly userName = computed(() => {
    const user = this.user();
 
    return user ? user.displayName: '';
  });

  userPreference = derivedAsync(
    () => {
      return from(this.authService.getLocalStorageUser()).pipe(
        map((value) => value?.displayName ?? ''),
        //map((value) => value?.displayName ?? ''),
        catchError(() => of('Error')),
      );
    },
    { initialValue: '' },
  );

  constructor(private authService: AuthenticationService) {
    addIcons({ addCircle });
  }
  logOut(){
    this.authService.signOut();
  }
  async ngOnInit() {
    // await this.authService.setLocalStorageUser();
    const user = await this.authService.getLocalStorageUser();
    console.log(user);
  }
  
}


