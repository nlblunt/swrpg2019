import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Angular2TokenService } from 'angular2-token'
import { Pc } from '../models/pc';

@Injectable()
export class PcSelectService 
{
    allPcs: Pc[];
    selectedPc: Pc;
    currentUser: any;
    authHeader: Headers;

    constructor(private http: Http, private _tokenService: Angular2TokenService) 
    {
    	
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.authHeader = new Headers();
        //this.authHeader.append('Authorization', " " + this.currentUser.token);
    }

    getAllPcs(): Promise<Pc[]>
    {
        //Clear out allPcs
        this.allPcs = [];
        console.log(this._tokenService.currentUserData);
        return this._tokenService.post('player/get-player-pcs.json', {id: this._tokenService.currentUserData.id})//, {headers: this.authHeader})//JSON.stringify({id: this.currentUser.id, auth_token: this.currentUser.token}), {headers: this.authHeader})
        .toPromise()
        .then(res => this.allPcs = res.json() as Pc[])
        .catch(this.handleError);
    }

        private handleError(error: any){
        //console.error('An error occurred', error); // for demo purposes only

        return error;

    }
}
