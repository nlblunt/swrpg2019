import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class PlayerService {
  public _tokenService: Angular2TokenService;

  constructor(private _tokenService2: Angular2TokenService)
  {
  	
  	this._tokenService2.init({
  		apiBase: "localhost:4000",
  		signInRedirect: "home",
  		userTypes: [{name: 'PLAYER', path: 'player'}, {name: 'GM', path: 'gm'}]
  	});

  	this._tokenService = this._tokenService2;
  }


}
