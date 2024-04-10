import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router, RouterModule} from '@angular/router';
import { addCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {Paths} from "../Paths";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LandingPage implements OnInit {

  constructor(private router: Router) {
    addIcons({addCircle});
   }

  ngOnInit() {
  }

  async onHomeClick() {
    await this.router.navigateByUrl(Paths.HOME)
  }

}

