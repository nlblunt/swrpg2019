import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class PlayerService {
  public _tokenService: Angular2TokenService;

  constructor(private _tokenService2: Angular2TokenService)
  {

  }
}
