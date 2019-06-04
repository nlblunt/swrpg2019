import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

//Import MATERIAL
import { MatFormFieldModule } from "@angular/material/form-field";

//Import SERVICES
import { AngularTokenService } from "angular-token";
import { PlayerService } from "../player.service";
import { HttpClient } from "@angular/common/http";

@Component({
  //selector: 'app-player-login',
  moduleId: module.id,
  templateUrl: "./player-login.component.html",
  styleUrls: ["./player-login.component.css"]
})
export class PlayerLoginComponent implements OnInit {
  login: any = {};
  error: string;
  registering: boolean = false;

  constructor(
    private _tokenService: AngularTokenService,
    private http: HttpClient,
    private router: Router
  ) {
    //this._tokenService.init();
  }

  ngOnInit() {}

  startRegister() {
    this.registering = true;
  }

  playerSignIn() {
    //Sign in.  If successful, redirect back to home.  If error, display error message
    this._tokenService
      .signIn({ login: this.login.email, password: this.login.password })
      .subscribe(
        res => this.router.navigateByUrl("/home"),
        error => (this.error = "Error Logging in.  Please try again.")
      );
  }

  playerRegister() {
    var data;

    this._tokenService
      .registerAccount({
        login: this.login.email,
        password: this.login.password,
        passwordConfirmation: this.login.password_confirmation,
        name: this.login.name,
        nickname: this.login.nickname
      })
      .subscribe(res => {
        data = res.json();
        this.http.post("player/updatePlayerData", {
          id: data.data.id,
          name: this.login.name,
          nickname: this.login.nickname,
          gm: this.login.gm
        });
        this.router.navigateByUrl("/home");
      }, error => (this.error = "Error registering account."));
  }

  closeRegister() {
    this.login = {};
    this.registering = false;
  }
}
