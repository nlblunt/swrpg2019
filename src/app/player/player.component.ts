import { Component, OnInit } from "@angular/core";
import { AngularTokenService } from "angular-token";
import { Router } from "@angular/router";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  currentPlayer: any;

  constructor(
    private _tokenService: AngularTokenService,
    private router: Router
  ) {
    //this._tokenService.init();
  }

  ngOnInit() {
    this._tokenService
      .validateToken()
      .subscribe(
        res => (this.currentPlayer = this._tokenService.currentUserData),
        error => this.playerSignOut()
      );
    //this.currentPlayer = this._tokenService.currentUserData;
  }

  playerSignOut() {
    this._tokenService.signOut();

    this.router.navigateByUrl("/home");
  }
}
