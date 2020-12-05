import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as categories from '../../assets/data/categories.json';
import { AcAdjustmentScreenComponent } from '../ac-adjustment-screen/ac-adjustment-screen.component';
import { CurtainAdjustmentScreenComponent } from '../curtain-adjustment-screen/curtain-adjustment-screen.component';
import { DefaultComponent } from '../default/default.component';
import { LightAdjustmentScreenComponent } from '../light-adjustment-screen/light-adjustment-screen.component';
import { LoadingComponent } from '../loading/loading.component';
import { ServiceListComponent } from '../service-list/service-list.component';
import { ScreenType } from '../shared/enums/screen-type';
import { SharedService } from '../shared/services/shared.service';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('loadingComponent') loadingComponent: LoadingComponent;
  @ViewChild('welcomeComponent') welcomeComponent: WelcomeComponent;
  @ViewChild('serviceListComponent') serviceListComponent: ServiceListComponent;
  @ViewChild('lightAdjustmentComponent') lightAdjustmentComponent: LightAdjustmentScreenComponent;
  @ViewChild('acAdjustmentComponent') acAdjustmentComponent: AcAdjustmentScreenComponent;
  @ViewChild('curtainAdjustmentComponent') curtainAdjustmentComponent: CurtainAdjustmentScreenComponent;
  @ViewChild('defaultComponent') defaultComponent: DefaultComponent;

  interactiveCanvas: any;
  callbacks: any = {};
  imageLoader = true;
  showSplashScreen = true;
  isLoading = true;
  showQuestions = false;
  categoryList: any;
  acData: any;
  lightData: any;
  curtainData: any;
  existingUser: boolean;
  selectedOption: string;
  displayMenu = false;
  lightAdjustmentScreen: boolean;
  acAdjustmentScreen: boolean;
  curtainAdjustmentScreen: boolean;
  currentScreen: number;
  screenType = ScreenType;
  temperatureObject: any;

  weatherObject: any;
  constructor(private sharedService: SharedService,
              private zone: NgZone) {
    this.interactiveCanvas = (window as any).interactiveCanvas;
    this.currentScreen = ScreenType.Loading;
    console.log('inside constructor' + this.currentScreen);
    this.callbacks.onUpdate = (data: any) => {
      this.categoryList = (categories as any).default;
      const dataEntry = data[0];
      const command = dataEntry?.command ?? dataEntry?.google?.intent?.name;
      this.temperatureObject = dataEntry?.tempObject;
      this.existingUser = data?.isExistingUser;
      this.callbacks.html_data = data;
      console.log(command + 'temperature' + this.temperatureObject);
      console.log('temp' + JSON.stringify(data[0]));
      this.zone.run(() => {
        switch (command) {
          case 'greeting':
            this.currentScreen = ScreenType.Welcome;
            console.log('welcome got called' + this.currentScreen);
            break;
          case 'service_selection':
            this.currentScreen = ScreenType.ServiceMenu;
            console.log('ServiceMenu got called' + this.currentScreen);
            break;
          case 'start_service':
            this.currentScreen = ScreenType.ServiceMenu;
            console.log('start_service got called' + this.currentScreen);
            break;
          case 'ac_adjustment':
            this.currentScreen = ScreenType.ACAdjustment;
            console.log('ACAdjustment got called' + this.currentScreen);
            break;
          case 'light_adjustment':
            this.currentScreen = ScreenType.LightAdjustment;
            console.log('ligh got called' + this.currentScreen);
            break;
          case 'curtain_adjustment':
            this.currentScreen = ScreenType.CurtainAdjustment;
            console.log('curtain got called' + this.currentScreen);
            break;
          case 'get_default_screen':
            this.currentScreen = ScreenType.Default;
            console.log('def got called' + this.currentScreen);
            break;
          case 'check_out':
            this.currentScreen = ScreenType.CheckOut;
            console.log('checkout got called' + this.currentScreen);
            break;
          case 'order_food':
            this.currentScreen = ScreenType.OrderFood;
            console.log('order got called' + this.currentScreen);
            break;
          case 'get_adjustment':
            this.currentScreen = ScreenType.RoomDeviceManagement;
            console.log('adjust got called' + this.currentScreen);
            break;
          default: this.currentScreen = ScreenType.Loading;
                   console.log('load got called' + this.currentScreen);
        }
      });
    };
  }

  ngOnInit(): void {
    this.initializeScenes();
    this.getWeatherInformation();
    console.log(this.currentScreen + 'init');
  }

  getWeatherInformation() {
    this.sharedService.getCurrentWeather()
    .subscribe(response => {
      this.weatherObject = response;
      console.log(this.weatherObject + 'in canvas');
      console.log(this.weatherObject?.data);
    });
  }

  initializeScenes = () => {
    this.interactiveCanvas.getHeaderHeightPx().then((height: any) => {
      $(document.body).css('margin-top', `${height}px`);
      setTimeout(() => {
        this.currentScreen = ScreenType.Welcome;
        console.log('timeout' + this.currentScreen);
      }, 10000);

      this.callbacks.onUpdate.bind(this);
      this.interactiveCanvas.ready(this.callbacks);
    });
  }

  optionSelect = (option: string) => {
    this.selectedOption = option;
    this.interactiveCanvas.sendTextQuery(option);
  }

  lightOptionSelect = (option: string) => {
    this.selectedOption = option;
    this.interactiveCanvas.sendTextQuery(option);
  }
}
