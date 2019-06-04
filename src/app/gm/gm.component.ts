import { Component, OnInit } from "@angular/core";
import { AngularTokenService } from "angular-token";
import { Router } from "@angular/router";

import { GmService } from "../gm.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-gm",
  templateUrl: "./gm.component.html",
  styleUrls: ["./gm.component.css"]
})
export class GmComponent implements OnInit {
  gmPrivs: boolean = false; //Does the user have gmPrivs?
  loading: number = 0;

  constructor(
    public gmService: GmService,
    private _tokenService: AngularTokenService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    //Show loading bar until all calls are finshed
    this.loading = 0;

    //Check to see if this user has GM privs from server
    this.http.get("gm/gm_status").subscribe(
      res => {
        console.log("GM");
        this.gmPrivs = true;

        //Get a list of all player pcs
        this.gmService
          .getAllPcs()
          .then(res => (this.loading = this.loading + 25))
          .catch(res => console.log("Error"));

        //Get a list of all weapons
        var result;

        if(result = this.gmService.getAllWeapons())
          {
            this.loading = this.loading + 25;
          }
          else
            {
              console.log(result);
            }

            if(result = this.gmService.getAllArmor())
            {
              this.loading = this.loading + 25;
            }
            else
            {
              console.log(result);
            }

            if(result = this.gmService.getAllItems())
            {
              this.loading = this.loading + 25;
            }
            else
            {
              console.log(result);
            }
      },
      error => {
        console.log("No GM Privs");
        this.router.navigateByUrl("/home");
      }
    );
  }

  setDisplay(newDisplay) {
    this.gmService.display = newDisplay;
  }

  logOut() {
    this._tokenService.signOut();
    this.router.navigateByUrl("/home");
  }
}
