import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { LightAdjustmentScreenComponent } from './light-adjustment-screen/light-adjustment-screen.component';
import { AcAdjustmentScreenComponent } from './ac-adjustment-screen/ac-adjustment-screen.component';
import { CurtainAdjustmentScreenComponent } from './curtain-adjustment-screen/curtain-adjustment-screen.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from './loading/loading.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DefaultComponent } from './default/default.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { DragScrollModule } from 'ngx-drag-scroll'
import { SharedService } from './shared/services/shared.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ServiceListComponent,
    LightAdjustmentScreenComponent,
    AcAdjustmentScreenComponent,
    CurtainAdjustmentScreenComponent,
    LoadingComponent,
    WelcomeComponent,
    DefaultComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCardModule,
    DragScrollModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
