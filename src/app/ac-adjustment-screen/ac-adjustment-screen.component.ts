import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-ac-adjustment-screen',
  templateUrl: './ac-adjustment-screen.component.html',
  styleUrls: ['./ac-adjustment-screen.component.scss']
})
export class AcAdjustmentScreenComponent implements OnInit {
  toggleValue: string;

  constructor() { }
  @Input() acData: any[];
  @Output() selectedOption = new EventEmitter();

  ngOnInit(): void {
    $('#slider').roundSlider({
      radius: 72,
      circleShape: 'half-top',
      sliderType: 'min-range',
      mouseScrollAction: true,
      value: 19,
      handleSize: '+5',
      min: 10,
      max: 50
    });
  }


  optionSelect = (option: string) => {
    this.selectedOption.emit(option);
  }

  onToggleChange = (isChecked: boolean) => {
    this.toggleValue = (isChecked) ? 'ON' : 'OFF';
  }

  onGetAnotherServiceClicked() {
    this.selectedOption.emit('Let\'s do it again');
  }

  onSaveButtonClicked() {
    this.selectedOption.emit('Save');
  }
}
