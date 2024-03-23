import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class SignupPage implements OnInit {

  constructor() { 
      addIcons({personOutline, lockClosedOutline, chevronForward});  
   }

  ngOnInit() {
  }

}
