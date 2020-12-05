import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  imageLoader = true;
  currentTime: string;
  chips = [
    { name: 'Yes', state: false },
    { name: 'No', state: false }
  ];

  @Input() weatherObject: any[];
  @Output() selectedOption = new EventEmitter();
  currentTemperature: number;
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      const tempDate = new Date();
      this.currentTime = tempDate.toLocaleTimeString();
      this.currentTemperature = this.weatherObject?.find((data) => data.current.temp_f);
       }, 1000);
  }

  changeSelected(option) {
    this.selectedOption.emit(option);
  }

}
