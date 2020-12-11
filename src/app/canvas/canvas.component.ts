import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import * as $ from 'jquery';
import * as foodCategories from '../../assets/data/food_categories.json';
import * as information from '../../assets/data/information.json';
import * as promotions from '../../assets/data/promotions.json';
import * as requests from '../../assets/data/requests.json';
import { AcAdjustmentScreenComponent } from '../ac-adjustment-screen/ac-adjustment-screen.component';
import { CurtainAdjustmentScreenComponent } from '../curtain-adjustment-screen/curtain-adjustment-screen.component';
import { DefaultComponent } from '../default/default.component';
import { LightAdjustmentScreenComponent } from '../light-adjustment-screen/light-adjustment-screen.component';
import { LoadingComponent } from '../loading/loading.component';
import { ServiceListComponent } from '../service-list/service-list.component';
import { ScreenType } from '../shared/enums/screen-type';
import { SharedService } from '../shared/services/shared.service';
import { WelcomeComponent } from '../welcome/welcome.component';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { pipe } from 'rxjs';

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
// TODO: all types with any should be removed and properly typed
// TODO: remove all console.log once tested
  interactiveCanvas: any;
  callbacks: any = {};
  imageLoader = true;
  showSplashScreen = true;
  isLoading = true;
  showQuestions = false;
  foodCategoryList: any;
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
  temperature: number;
  informationList: any;
  requestsList: any;
  promotionsList: any;
  deviceList: any[];
  deviceStatus: string;

  constructor(private sharedService: SharedService,
    private zone: NgZone) {
    this.interactiveCanvas = (window as any).interactiveCanvas;
    this.currentScreen = ScreenType.Loading;
    console.log('inside constructor' + this.currentScreen);
    // callback here
    this.callbacks.onUpdate = (data: any) => {
      this.foodCategoryList = (foodCategories as any).default;
      this.informationList = (information as any).default;
      this.requestsList = (requests as any).default;
      this.promotionsList = (promotions as any).default;
      // data passed from fullfillment will be inside "data"
      const dataEntry = data[0];
      const command = dataEntry?.command ?? dataEntry?.google?.intent?.name;
      this.temperatureObject = dataEntry?.tempObject;
      this.existingUser = dataEntry?.isExistingUser;
      this.callbacks.html_data = dataEntry;
      console.log(command + 'temperature' + this.temperatureObject);
      console.log('temp' + JSON.stringify(data[0]));

      // Updates the variable currentScreen so that template/ UI changes on each callback update
      this.zone.run(() => {
        switch (command) {
          case 'greeting':
            this.currentScreen = ScreenType.Welcome;
            this.registerTokenCallback();
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
            console.log('get adjust got called' + this.currentScreen);
            break;
          case 'device_adjustment':
            this.currentScreen = ScreenType.RoomDeviceManagement;
            console.log('device adjust got called' + this.currentScreen);
            break;
          case 'room_device_control':
            this.currentScreen = ScreenType.RoomDeviceManagement;
            console.log('device adjust d got called' + this.currentScreen);
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

  registerTokenCallback() {
    // tslint:disable-next-line: deprecation
    this.sharedService.getDeviceListAsync().subscribe((data: any) => {
      console.log('data---->' + data);
      this.deviceList = data?.devices;
    });
  }

  getWeatherInformation() {
    this.sharedService.getCurrentWeather()
      .subscribe(response => {
        this.weatherObject = response;
        this.temperature = this.weatherObject.current.temp_f;
      });
  }

  initializeScenes = () => {
    this.interactiveCanvas.getHeaderHeightPx().then((height: any) => {
      $(document.body).css('margin-top', `${height}px`);
      setTimeout(() => {
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

  onDeviceStatus = (option: string) => {
    this.deviceStatus = option;
  }

  lightOptionSelect = (option: string) => {
    this.selectedOption = option;
    this.interactiveCanvas.sendTextQuery(option);
  }
}
