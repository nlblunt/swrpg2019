import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

//Import MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';

//Import SERVICES
import { Angular2TokenService } from 'angular2-token';
import { PlayerService } from '../player.service';

@Component({
  //selector: 'app-player-login',
  moduleId: module.id,
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.css']
})
export class PlayerLoginComponent implements OnInit {
  login: any = {};
  error: string;
  registering: boolean = false;

  constructor(private _tokenService: Angular2TokenService, private router: Router)
  {
  	//this._tokenService.init();
  }

  ngOnInit() 
  {
  }

  startRegister()
  {
    this.registering = true;
  }
  
  playerSignIn()
  {
    //Sign in.  If successful, redirect back to home.  If error, display error message
  	this._tokenService.signIn({email: this.login.email, password: this.login.password}).subscribe(
  		res => this.router.navigateByUrl('/home'),
  		error => this.error = "Error Logging in.  Please try again.")
  }

  playerRegister()
  {
  	this._tokenService.registerAccount({
  		email: this.login.email,
  		password: this.login.password,
  		passwordConfirmation: this.login.password_confirmation,
      name: this.login.name,
      nickname: this.login.nickname
  	}).subscribe(
      res=> 
      {
        this._tokenService.post("/update_user_info", {name: this.login.name, nickname: this.login.nickname});
        this.router.navigateByUrl('/home');
      },
      error=> this.error = "Error registering account.")
  }
}
