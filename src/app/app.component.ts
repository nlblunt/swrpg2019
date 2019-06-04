import { Component } from "@angular/core";
import { AngularTokenService } from "angular-token";
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
  constructor(private _tokenService: AngularTokenService) {

  }
}
