import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2TokenService } from 'angular2-token';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//Import PC COMPONENTS
import { PlayerComponent } from './player/player.component';
import { PlayerLoginComponent } from './player-login/player-login.component';
import { PcSelectComponent } from './pc-select/pc-select.component';
import { PcCreateComponent } from './pc-create/pc-create.component';
import { PcViewComponent } from './pc-view/pc-view.component';

//Import GM COMPONENTS
import { GmComponent } from './gm/gm.component';
import { GmViewEditPcsComponent } from './gm-view-edit-pcs/gm-view-edit-pcs.component';

//Import PC SERVICES
import { PlayerService } from './player.service';
import { PcSelectService } from './pc-select/pc-select.service';
import { PcCreateService } from './pc-create/pc-create.service';
import { PcViewService } from './pc-view/pc-view.service';

//Import GM SERVICES
import { GmService } from './gm.service';

//Import MATERIAL
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatCheckboxModule } from '@angular/material/checkbox'

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerLoginComponent,
    HomeComponent,
    PcSelectComponent,
    PcCreateComponent,
    PcViewComponent,
    GmComponent,
    GmViewEditPcsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatCheckboxModule
  ],
  providers: [
    Angular2TokenService,
    PlayerService,
    PcSelectService,
    PcCreateService,
    PcViewService,
    GmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
