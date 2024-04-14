import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { personOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoadingController } from '@ionic/angular/standalone';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, AngularFireModule, AngularFireAuthModule],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  constructor(public formBuilder : FormBuilder, public loadingCtrl: LoadingController, private authService : AuthenticationService, public router : Router) {
    addIcons({personOutline, lockClosedOutline, chevronForward});
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),

      ]],
      password: ['',[
      Validators.required,
      //Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")
      ]]
    })
  }
  get errorControl(){
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    // console.log(this.email + this.password);
    if (this.loginForm.valid) {

      //  await  loading.dismiss();
      const user = await this.authService.logginUser(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
        console.log(err);
        loading.dismiss();
      })
      if(user) {
        loading.dismiss();
        this.router.navigate(['/home'])
      }else {
        return console.log('Please provide all the required values!');
    }
  }
}
}
