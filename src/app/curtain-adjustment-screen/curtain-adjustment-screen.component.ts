import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import 'round-slider';

@Component({
  selector: 'app-curtain-adjustment-screen',
  templateUrl: './curtain-adjustment-screen.component.html',
  styleUrls: ['./curtain-adjustment-screen.component.scss']
})
export class CurtainAdjustmentScreenComponent implements OnInit {

  constructor() { }
  @Input() curtainData: any[];
  @Output() selectedOption = new EventEmitter();

  ngOnInit(): void {
    $('#slider1').roundSlider({
      value: 45
    });
  }


  optionSelect = (option: string) => {
    this.selectedOption.emit(option);
  }
}
