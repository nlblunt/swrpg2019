import { Component } from "@angular/core";
import { Angular2TokenService } from "angular2-token";
import { PlayerService } from "./player.service";

@Component({
  moduleId: module.id,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
  //styleUrls: ['../styles.css']
})
export class AppComponent {
  title = "SWRPG";

  //Initialize Angular2TokenService
  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      apiBase: "http://localhost:4000",
      //apiBase: "http://swrpgapi.rubywebs.net",
      signInRedirect: "/player-login"
    });
  }
}
