import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  chevronForward,
  lockClosedOutline,
  personOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, RouterModule } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { Paths } from '../Paths';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError, filter, from, of, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireModule,
    AngularFireAuthModule,
  ],
})
export class LoginPage {
  #formBuilder = inject(FormBuilder);
  private loading;

  readonly loginForm = this.#formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        //Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")
      ],
    ],
  });

  readonly onLogin$ = new Subject<void>();
  private readonly attemptLogin = this.onLogin$.pipe(
    filter(() => this.loginForm.valid),
    tap(async () => {
      this.loading = await this.loadingCtrl.create();
      await this.loading?.present();
    }),
    switchMap(() =>
      from(
        this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password,
        ),
      ).pipe(
        catchError((err) => {
          this.loading?.dismiss();
          console.error('Login error: ', err);
          return of(null);
        }),
      ),
    ),
  );

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    addIcons({ personOutline, lockClosedOutline, chevronForward });
    this.attemptLogin.pipe(takeUntilDestroyed()).subscribe();
    this.authService.loggedUser
      .pipe(
        takeUntilDestroyed(),
        tap((user) => {
          this.loading?.dismiss();
          if (user) {
            //Provbando el Token
            console.log(authService.getToken(user));
            //
            void this.router.navigateByUrl(Paths.LANDING);
          } else {
            console.log('Please provide all the required values!');
          }
        }),
      )
      .subscribe();
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
    this.onLogin$.next();
  }
}
