import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports:[RouterModule, IonicModule, CommonModule, CalendarComponent]
})
export class CalendarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
