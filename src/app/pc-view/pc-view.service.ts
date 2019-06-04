import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';



import { Pc } from '../models/pc';

import { AngularTokenService } from 'angular-token';

@Injectable()
export class PcViewService
{
    currentUser: any;
    authHeader: Headers;

    constructor(private _tokenService: AngularTokenService) 
    {

    }
}