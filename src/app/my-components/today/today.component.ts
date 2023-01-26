import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  @Input() title: string

  constructor() {
    this.title = ''
  }

  ngOnInit() { }

}
