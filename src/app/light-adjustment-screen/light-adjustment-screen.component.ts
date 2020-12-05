import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-light-adjustment-screen',
  templateUrl: './light-adjustment-screen.component.html',
  styleUrls: ['./light-adjustment-screen.component.scss']
})
export class LightAdjustmentScreenComponent implements OnInit {

  toggleValue: string;
  constructor() { }
  @Input() lightData: any[];
  @Output() selectedOption = new EventEmitter();

  ngOnInit(): void {
    const slider = document.getElementsByClassName('round-slider') as HTMLCollectionOf<HTMLElement>;

    const button = document.getElementsByClassName('selection-button')[0];
    let value = 0;

    const finalText = {
      0: ''
    };
    let round_slider_tune = (event) => {
      const eventDoc = (event.target && event.target.ownerDocument) || document,
        doc = eventDoc.documentElement,
        body = eventDoc.body;
      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
      // button.style.position = 'fixed';
      // button.style.top =  event.pageY - 16 + "px";
      // button.style.left =  event.pageX - 16 + "px";
      const output = document.getElementsByClassName('selection') as HTMLCollectionOf<HTMLElement>;
      const text = document.getElementsByClassName('holder-text')[0];
      const titleBlock = document.getElementsByClassName('assessment-title')[0];
      const elPos = event.target.getBoundingClientRect();
      const cX = elPos.width / 2;
      const cY = elPos.height / 2;
      const eX = event.pageX - elPos.left;
      const eY = event.pageY - elPos.top;
      let dX = 0;
      let dY = 0;
      const angle = Math.atan2(cX - eX, cY - eY) * (180 / Math.PI);
      let title = '';
      if (angle < 10 && angle >= -44) {
        value = 1;
        title = 'It\'s dark';
      }
      if (angle < -44 && angle >= -78) {
        value = 2;
        title = 'That\'s too low';
      }
      if (angle < -78 && angle >= -111) {
        value = 3;
        title = 'So-so';
      }
      if (angle < -111 && angle >= -144) {
        value = 4;
        title = 'More less';
      }
      if (angle < -144 && angle >= -180) {
        value = 5;
        title = 'Fine';
      }
      if (angle < 180 && angle >= 144) {
        value = 6;
        title = 'Too Bright';
      }
      if (angle < 144 && angle >= 111) {
        value = 7;
        title = 'Good';
      }
      if (angle < 111 && angle >= 78) {
        value = 8;
        title = 'Medium';
      }
      if (angle < 78 && angle >= 44) {
        value = 9;
        title = 'Dim - Medium level!';
      }
      if (angle < 44 && angle >= 10) {
        value = 9;
        title = 'Dim - Low level!';
      }
      if (angle < 10 && angle >= -10) {
        value = 10;
        title = 'It\'s too dark';
      }
      text.innerHTML = value.toString();
      titleBlock.innerHTML = title;

      if (Math.abs(eX - cX) >= Math.abs(eY - cY)) { // 110 90
        dX = 150 / 2 + Math.sign(eX - cX) * 150 / 2;
        dY = 150 / 2 + (eY - cY) / Math.abs(eX - cX) * 150 / 2;
      } else {
        dX = 150 / 2 + (eX - cX) / Math.abs(eY - cY) * 150 / 2;
        dY = 150 / 2 + Math.sign(eY - cY) * 150 / 2;
      }
      dX = Math.round(dX / 150 * 100);
      dY = Math.round(dY / 150 * 100);
      if (0 <= dX && dX < 50 && dY === 0) {
        output[0].style.clipPath = 'polygon(' + dX + '% ' + dY + '%, 50% 0%, 50% 50%)';
      } else if (dX === 0 && 0 <= dY && dY <= 100) {
        output[0].style.clipPath = 'polygon(' + dX + '% ' + dY + '%, 0% 0%, 50% 0%, 50% 50%)';
      } else if (0 <= dX && dX <= 100 && dY === 100) {
        output[0].style.clipPath = 'polygon(' + dX + '% ' + dY + '%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)';
      } else if (dX === 100 && 0 <= dY && dY <= 100) {
        output[0].style.clipPath = 'polygon(' + dX + '% ' + dY + '%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)';
      } else if (50 <= dX && dX <= 100 && dY === 0) {
        output[0].style.clipPath = 'polygon(' + dX + '% ' + dY + '%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)';
      }
    };
    slider[0].addEventListener('click', round_slider_tune, false);
  }

  onToggleChange = (isChecked: boolean) => {
    this.toggleValue = (isChecked) ? 'ON' : 'OFF';
  }

  optionSelect = (option: string) => {
    this.selectedOption.emit(option);
  }

  onGetAnotherServiceClicked() {
    this.selectedOption.emit('Let\'s do it again');
  }

  onSaveButtonClicked() {
    this.selectedOption.emit('Save');
  }
}
