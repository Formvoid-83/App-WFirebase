import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';
import { personOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, AngularFireModule, AngularFireAuthModule]
})
export class SignupPage implements OnInit {
  profileUpdates;
  regForm : FormGroup; 
  constructor( public formBuilder : FormBuilder, public loadingCtrl: LoadingController, private authService : AuthenticationService, public router : Router) {
      
      addIcons({personOutline, lockClosedOutline, chevronForward});  

      
   }
   

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname:['',
        [Validators.required]
      ],
      email: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),

      ]],
      password: ['',[
      Validators.required,
      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]]
    })
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async signUp(){
  
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password ).catch((error)=> {
        console.log(error);
        loading.dismiss()
      })
      

      if(user){
        //SET FULLNAME
       (await this.authService.getProfile()).updateProfile({
          displayName: this.regForm.value.fullname
        }).catch(function(error){
          console.log(error)
        })
        //
        loading.dismiss()
        this.router.navigate(['/landing'])
      }
      else{
        console.log('Provide correct value')
      }
    }
  }
}
