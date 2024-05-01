
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DateTime } from 'luxon';
import { interval, map, startWith, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonicModule],
})
export class HomePage {
  user : any;
  readonly bol = signal(DateTime.now());
  readonly arg = computed(() => {
    return this.bol().plus({ hour: 1 });
  });

  readonly filters = signal<Filter>({ price: 0, type: 0, hour: 0 });
  readonly alertTIme = computed(() => this.filters().hour > 24);

  private readonly now = interval(1000).pipe(
    takeUntilDestroyed(),
    startWith(0),
    tap(() => {
      this.bol.set(DateTime.now());
    }),
    startWith(DateTime.now()),
  );

  constructor(private authService : AuthenticationService, public router : Router) {
    this.user = authService.getProfile();
  }
  ngOnInit() {
    console.log('INIT');
    this.now.subscribe();
  }

  onLoginClick() {}
  onSignClock() {}

  async logout(){
    this.authService.signOut().then(()=>{
    this.router.navigate(['/landing'])
    })
  }
}

type Filter = {
  hour: number;
  type: number;
  price: number;
  cost?: string;
};

  

