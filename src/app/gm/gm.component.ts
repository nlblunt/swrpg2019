import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token'
import { Router } from '@angular/router';

import { GmService } from '../gm.service';

@Component({
  selector: 'app-gm',
  templateUrl: './gm.component.html',
  styleUrls: ['./gm.component.css']
})
export class GmComponent implements OnInit {
  loading: number = 0;

  constructor(public gmService: GmService, private _tokenService: Angular2TokenService, private router: Router) {

  }

  ngOnInit() {
    //Show loading bar until all calls are finshed
    this.loading = 0;

    //Check to see if this user has GM privs from server
    this._tokenService.get("gm/gm_status").subscribe(
      res => console.log("GM Privs"),
      error => {
        console.log("No GM Privs");
        this.router.navigateByUrl("/home")
      })

    //Get a list of all player pcs
    this.gmService.getAllPcs()
      .then(res => this.loading = this.loading + 25)
      .catch(res => console.log("Error"))

    //Get a list of all weapons
    this.gmService.getAllWeapons()
      .then(
        res => this.loading = this.loading + 25,
        error => console.log(error));

    this.gmService.getAllArmor()
      .then(
        res => this.loading = this.loading + 25,
        error => console.log(error)
      )

    this.gmService.getAllItems()
      .then(
        res => this.loading = this.loading + 25,
        error => console.log(error)
      )
  }

  setDisplay(newDisplay) {
    this.gmService.display = newDisplay;
  }
}
