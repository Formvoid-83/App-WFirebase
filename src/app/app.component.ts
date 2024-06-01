import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationStart, Router  } from '@angular/router';

import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, HttpClientModule, AngularFireModule, AngularFireAuthModule, NavBarComponent],
})
export class AppComponent {
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
        }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
