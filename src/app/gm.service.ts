/*This Service will be responsible for all API calls to the server
  for the GM.  All GM components will have access to use this service.
*/
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token'
import { Router } from '@angular/router';

import { Pc } from './models/pc';

@Injectable()
export class GmService {
  //All PCS and SelectedPc
  allPcs: Pc[];     //Holds all the Pcs from the server
  selectedPc: Pc;   //What is the selected Pc?
  display: string;  //What display to show
  
  pcsInSession: Pc[];
  
  constructor(private _tokenService: Angular2TokenService, private router: Router)
  {
  	this.pcsInSession = [];
  }

  //This gets a list of all the PCS on the server and stores them in allPcs for later use
  getAllPcs(): Promise<Pc[]>
  	{
        //Clear out allPcs
        this.allPcs = [];
        return this._tokenService.get('gm/get_all_pcs.json')//, {headers: this.authHeader})//JSON.stringify({id: this.currentUser.id, auth_token: this.currentUser.token}), {headers: this.authHeader})
        .toPromise()
        .then(res => this.allPcs = res.json() as Pc[]);
    };

  //Delete this PC from the server
  deletePc(id)
  {
    return this._tokenService.post('player/delete_pc', {id: id});
  }

  //Update the PC.  Requires a PC and SKILLS list
  updatePc(pc, skills)
  {
    return this._tokenService.post('gm/modify_pc',{pc: pc, skills: skills});
  }
}
