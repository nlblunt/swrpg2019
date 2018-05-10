import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { GmService } from "../gm.service";

import { DlgAddWeaponComponent } from "../dlg-add-weapon/dlg-add-weapon.component";
import { DlgAddArmorComponent } from "../dlg-add-armor/dlg-add-armor.component";
import { DlgAddItemComponent } from "../dlg-add-item/dlg-add-item.component";
import { Pc } from "../models/pc";

@Component({
  selector: "app-gm-view-edit-pcs",
  templateUrl: "./gm-view-edit-pcs.component.html",
  styleUrls: ["./gm-view-edit-pcs.component.css"]
})
export class GmViewEditPcsComponent implements OnInit {
  loading: boolean = false;
  allPcs: Pc[];
  character: Pc;
  skills: any = {};
  changed_skills: number = 0;

  constructor(private gmService: GmService, public dialog: MatDialog) {}

  //Initialize this component and get a list of all PCS from the server
  //using the GmService
  ngOnInit() {
    //this.allPcs = this.gmService.allPcs;

    //this.allPcs = null;
    this.allPcs = this.gmService.allPcs;
    this.character = this.allPcs[0];
  }

  setPc(pc) {
    this.character = pc;
  }

  delete_pc(id) {
    //Delete this PC and get a new list
    this.loading = true;
    this.gmService.deletePc(id).subscribe(
      res => {
        this.getAllPcs();
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  close_edit_pc_state() {
    //Close the edit pc state.  Set character to null.
    this.character = null;
    this.changed_skills = 0;
    this.gmService.display = "";
  }

  gm_modify_pc() {
    this.loading = true;

    this.gmService.updatePc(this.character, this.skills).subscribe(
      res => {
        this.getAllPcs();
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  add_session() {
    if (this.character.selected == true) {
      this.gmService.pcsInSession.push(this.character);
    } else {
      var index = this.gmService.pcsInSession.indexOf(this.character);
      if (index > -1) {
        this.gmService.pcsInSession.splice(index, 1);
      }
    }
  }

  openAddWeaponPcDialog() {
    let dialogRef = this.dialog.open(DlgAddWeaponComponent, {
      width: "400px",
      height: "600px",
      data: this.character
    });

    dialogRef.afterClosed().subscribe(result => {
      //Update this character
    });
  }

  removeWeaponFromPc(index, weapon) {
    if (this.loading == true) return;
    this.loading = true;
    this.gmService.removeWeaponFromPc(weapon).subscribe(
      res => {
        this.character.weapons.splice(index, 1);
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  openAddArmorPcDialog() {
    let dialogRef = this.dialog.open(DlgAddArmorComponent, {
      width: "400px",
      height: "600px",
      data: this.character
    });

    dialogRef.afterClosed().subscribe(result => {
      //Update this character
    });
  }

  removeArmorFromPc(index, armor) {
    if (this.loading == true) return;
    this.loading = true;
    this.gmService.removeArmorFromPc(armor).subscribe(
      res => {
        this.character.armors.splice(index, 1);
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  openAddItemPcDialog() {
    let dialogRef = this.dialog.open(DlgAddItemComponent, {
      width: "400px",
      height: "600px",
      data: this.character
    });

    dialogRef.afterClosed().subscribe(result => {
      //Update this character
    });
  }

  removeItemFromPc(index, item) {
    if (this.loading == true) return;
    this.loading = true;

    this.gmService.removeItemFromPc(item).subscribe(
      res => {
        this.character.items.splice(index, 1);
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  skill_rank_changed(skill, rank) {
    skill.rank = parseInt(rank, 10);
    this.skills[skill.name] = skill;
    this.changed_skills = this.changed_skills + 1;
  }

  //Utility functions
  getAllPcs() {
    console.log("Getting All PCs");
    this.gmService
      .getAllPcs()
      .then(() => {
        this.allPcs = null;
        this.allPcs = this.gmService.allPcs;
        this.character = this.allPcs[0];
      })
      .catch(res => console.log(res));
  }
}
