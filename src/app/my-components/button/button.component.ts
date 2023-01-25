import { Component, Input, OnInit } from '@angular/core';
import { timeStamp } from 'console';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Input() texto: string





  constructor() {
    this.texto = ''


  }





  ngOnInit() {


  }

}
