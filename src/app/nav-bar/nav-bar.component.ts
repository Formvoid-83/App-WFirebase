import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';


@Component({
  selector: 'app-nav-bar',
  standalone:true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [IonicModule, CommonModule, HttpClientModule, FormsModule]
})
export class NavBarComponent {

  constructor() {
    addIcons({personOutline});
   }

}
