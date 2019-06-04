import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularTokenModule } from "angular-token";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { DlgAddWeaponComponent } from "./dlg-add-weapon/dlg-add-weapon.component";
import { DlgAddArmorComponent } from "./dlg-add-armor/dlg-add-armor.component";
import { DlgAddItemComponent } from "./dlg-add-item/dlg-add-item.component";

//Import PC COMPONENTS
import { PlayerComponent } from "./player/player.component";
import { PlayerLoginComponent } from "./player-login/player-login.component";
import { PcSelectComponent } from "./pc-select/pc-select.component";
import { PcCreateComponent } from "./pc-create/pc-create.component";
import { PcViewComponent } from "./pc-view/pc-view.component";

//Import GM COMPONENTS
import { GmComponent } from "./gm/gm.component";
import { GmViewEditPcsComponent } from "./gm-view-edit-pcs/gm-view-edit-pcs.component";
import { GmViewWeaponsComponent } from "./gm-view-weapons/gm-view-weapons.component";
import { GmViewArmorComponent } from "./gm-view-armor/gm-view-armor.component";
import { GmViewItemsComponent } from "./gm-view-items/gm-view-items.component";

//Import PC SERVICES
import { PlayerService } from "./player.service";
import { PcSelectService } from "./pc-select/pc-select.service";
import { PcCreateService } from "./pc-create/pc-create.service";
import { PcViewService } from "./pc-view/pc-view.service";

//Import GM SERVICES
import { GmService } from "./gm.service";

//Import MATERIAL
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material";
import { MatSelectModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatTabsModule } from "@angular/material/tabs";

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
    GmViewEditPcsComponent,
    GmViewWeaponsComponent,
    GmViewArmorComponent,
    GmViewItemsComponent,
    DlgAddWeaponComponent,
    DlgAddArmorComponent,
    DlgAddItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
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
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
    MatTabsModule,
    AngularTokenModule.forRoot({
            //apiBase: "http://localhost:4000",
            apiBase: "http://swrpgapi.rubywebs.net",
            signInRedirect: "/player-login"
    })
  ],
  providers: [
    AngularTokenModule,
    PlayerService,
    PcSelectService,
    PcCreateService,
    PcViewService,
    GmService
  ],
  entryComponents: [
    DlgAddArmorComponent,
    DlgAddWeaponComponent,
    DlgAddItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
