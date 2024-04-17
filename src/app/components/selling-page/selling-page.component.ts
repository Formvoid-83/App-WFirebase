import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-selling-page',
  standalone: true,
  templateUrl: './selling-page.component.html',
  styleUrls: ['./selling-page.component.scss'],
  imports: [RouterModule, IonicModule, CommonModule, FormsModule],
})
export class SellingPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
