import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  imageLoader = true;
  @Input() weatherObject: any[];

  chips = [
    { name: 'Turn On/Off the AC', state: false },
    { name: 'Turn On/Off lights', state: false },
    { name: 'Open/Close curtain', state: false },
    { name: 'Get me a burger', state: false },
    { name: 'Show me hotel Information', state: false },
    { name: 'Tell me about the weather', state: false },
    { name: 'What time does the pool close?', state: false },
    { name: 'Set an alarm', state: false },
  ];

  constructor() { }
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  @Input() categories: any[];
  @Input() temperatureObject: any;
  @Input() existingUser: boolean;
  @Output() selectedOption = new EventEmitter();

  selected: string;
  ngOnInit(): void {
    console.log('weather---' + this.weatherObject + '---temp' + this.temperatureObject);
    if (!this.temperatureObject?.current?.temp_f) {
      this.temperatureObject = this.weatherObject;
    }
  }

  optionSelect = (option: string) => {
    this.selectedOption.emit(option);
  }

  changeSelected(option) {
    this.selectedOption.emit(option);
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ds.moveTo(3);
    }, 0);
  }
}
