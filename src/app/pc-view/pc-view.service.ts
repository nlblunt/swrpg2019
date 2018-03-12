import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Pc } from '../models/pc';

import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class PcViewService
{
    currentUser: any;
    authHeader: Headers;

    constructor(private _tokenService: Angular2TokenService) 
    {

    }
}