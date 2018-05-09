import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Armor } from "../models/armor";

import { GmService } from "../gm.service";

@Component({
  selector: "app-dlg-add-armor",
  templateUrl: "./dlg-add-armor.component.html",
  styleUrls: ["./dlg-add-armor.component.css"]
})
export class DlgAddArmorComponent implements OnInit {
  allArmor: Armor[]; //All Armors
  createdArmors: Armor[]; //Non template, created Armors
  templateArmors: Armor[]; //Template Armors
  shownArmors: Armor[]; //What are we showing?  Chosen by user

  constructor(
    private gmService: GmService,
    public dialogRef: MatDialogRef<DlgAddArmorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.allArmor = this.gmService.allArmor;
    this.templateArmors = [];
    this.createdArmors = [];

    //Sort armor by template armor or created / crafted armor
    this.allArmor.forEach(armor => {
      if (armor.template == true) {
        this.templateArmors.push(armor);
      } else {
        this.createdArmors.push(armor);
      }
    });

    //Show all armor by default
    this.shownArmors = this.allArmor;
  }

  changeArmorView(view) {
    switch (view) {
      case "all":
        this.shownArmors = this.allArmor;
        break;

      case "template":
        this.shownArmors = this.templateArmors;
        break;

      case "created":
        this.shownArmors = this.createdArmors;
        break;
      default:
        break;
    }
  }

  //Adds the armor to the character.  Clones a new armor if template, or moves the item from current owner.
  //Res = new armor info from server
  addArmor(armor) {
    this.gmService.addArmorToPc(armor, this.data.id).subscribe(
      res => {
        //Update the master list of weapon.  Don't need to wait.
        this.gmService.getAllArmor();

        //Add the returned weapon to the pc
        this.data.character.armor.push(res);

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
