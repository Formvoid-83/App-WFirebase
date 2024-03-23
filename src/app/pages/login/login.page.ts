import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { personOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LoginPage implements OnInit {

  constructor() {
    addIcons({personOutline, lockClosedOutline, chevronForward});
  }

  ngOnInit() {
  }

}
