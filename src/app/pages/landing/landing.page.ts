import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { addCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavBarComponent } from 'src/app/nav-bar/nav-bar.component';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonApp, IonicModule,IonRouterOutlet, CommonModule, FormsModule, RouterModule, NavBarComponent]
})
export class LandingPage {

  constructor() {
    addIcons({addCircle});
   }

}
