import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Weapon } from "../models/weapon";

import { GmService } from "../gm.service";

@Component({
  selector: "app-dlg-add-weapon",
  templateUrl: "./dlg-add-weapon.component.html",
  styleUrls: ["./dlg-add-weapon.component.css"]
})
export class DlgAddWeaponComponent implements OnInit {
  allWeapons: Weapon[]; //All weapons
  createdWeapons: Weapon[]; //Non template, created weapons
  templateWeapons: Weapon[]; //Template weapons
  shownWeapons: Weapon[]; //What are we showing?  Chosen by user

  constructor(
    private gmService: GmService,
    public dialogRef: MatDialogRef<DlgAddWeaponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    //Save all weapons to local variable
    this.allWeapons = this.gmService.allWeapons;
    this.templateWeapons = [];
    this.createdWeapons = [];

    //Sort weapons by template weapons or created / crafted weapons
    this.allWeapons.forEach(weapon => {
      if (weapon.template == true) {
        this.templateWeapons.push(weapon);
      } else {
        this.createdWeapons.push(weapon);
      }
    });

    //Show all weapons by default
    this.shownWeapons = this.allWeapons;
  }

  changeWeaponView(view) {
    switch (view) {
      case "all":
        this.shownWeapons = this.allWeapons;
        break;

      case "template":
        this.shownWeapons = this.templateWeapons;
        break;

      case "created":
        this.shownWeapons = this.createdWeapons;
        break;
      default:
        break;
    }
  }

  //Adds the weapon to the character.  Clones a new weapon if template, or moves the item from current owner.
  //Res = new weapon info from server
  addWeapon(weapon) {
    console.log(weapon);
    console.log(this.data.id);
    this.gmService.addWeaponToPc(weapon, this.data.id).subscribe(
      res => {
        //Update the master list of weapon.  Don't need to wait.
        this.gmService.getAllWeapons();

        //Add the returned weapon to the pc
        this.data.character.weapons.push(res);

        //Close the dialog
        this.dialogRef.close();
      },
      error => console.log("Error")
    );
  }

  //Close the dialog
  onNoClick() {
    this.dialogRef.close();
  }
}
