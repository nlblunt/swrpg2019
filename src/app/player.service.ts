import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Injectable()
export class PlayerService {
  public _tokenService: AngularTokenService;

  constructor(private _tokenService2: AngularTokenService)
  {

  }
}
