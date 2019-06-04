//Import MODULES
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { PlayerLoginComponent } from './player-login/player-login.component';
import { PcCreateComponent } from './pc-create/pc-create.component';
import { PcViewComponent } from './pc-view/pc-view.component'

import { GmComponent } from './gm/gm.component';
import { GmViewEditPcsComponent } from './gm-view-edit-pcs/gm-view-edit-pcs.component';

//Import SERVICES
import { AngularTokenService } from 'angular-token';
import { PlayerService } from './player.service';

//import { PlayerLoginComponent } from './player/player-login/player-login.component';
//import { PcCreateComponent } from './player/pc-create/pc-create.component';
//import { HomeComponent } from './home.component';
//import { PcViewComponent } from './player/pc-view/pc-view.component';
//import { PlayerAuthGuard } from './guards/player-auth.guard';

//import { GMComponent } from './gm/gm.component';
//import { GMLoginComponent } from './gm/gm-login/gm-login.component';
//import { GMViewComponent } from './gm/gm-view/gm-view.component';
//import { GMAuthGuard } from './guards/gm-auth.guard';

//import { DashboardComponent } from './dashboard.component';
//import { HeroesComponent } from './heroes.component';
//import { HeroDetailComponent } from './hero-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'player', component: PlayerComponent, canActivate: [AngularTokenService] },
  { path: 'player-login', component: PlayerLoginComponent },
  { path: 'player/pc-create', component: PcCreateComponent },
  { path: 'player/pc-view', component: PcViewComponent },
  { path: 'gm', component: GmComponent, canActivate: [AngularTokenService] },
  { path: 'gm-view-edit-pcs', component: GmViewEditPcsComponent },
  //{ path: 'gm', component: GMComponent, canActivate: [GMAuthGuard]},
  //{ path: 'gm-login', component: GMLoginComponent},
  //{ path: 'gm/gm-view', component: GMViewComponent },
  //{ path: 'dashboard',  component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  //{ path: 'heroes',     component: HeroesComponent }
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}